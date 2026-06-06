import { useEffect, useRef, useState, useTransition, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { useNavigate } from "react-router";
import { URL } from "../constants";
import { useSetupStore } from "../store/useSetupStore";
import { useRankingStore } from "../store/useRankingStore";
import { useGameTimerStore } from "../store/useGameTimerStore";
import MoleWorker from "../workers/moleWorker.js?worker";

// 게임 타이머
export const useGameTimer = () => {
  // useShallow: 여러 state를 한 번에 구독할 때 얕은 비교로 불필요한 리렌더링을 막음
  // 구독하는 값 중 하나라도 실제로 바뀔 때만 리렌더 발생
  const { sec, tick, isRunning, isPaused } = useGameTimerStore(
    useShallow((state) => ({
      sec: state.sec,
      tick: state.tick,
      isRunning: state.isRunning,
      isPaused: state.isPaused,
    }))
  );
  const rafId = useRef<number>(0);
  // lastTickTime을 ref로 관리하는 이유: 렌더링과 무관한 타이밍 기준점이므로
  // state로 두면 업데이트할 때마다 불필요한 리렌더가 발생함
  const lastTickTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!isRunning || isPaused) return;
    lastTickTime.current = Date.now();

    const tickRaf = () => {
      const now = Date.now();
      // setInterval 대신 requestAnimationFrame을 쓴 이유:
      // rAF는 탭이 비활성화되면 throttle되어 배터리를 아끼고,
      // 1초 경과 여부를 직접 확인(now - lastTickTime >= 1000)하므로
      // setInterval보다 타이밍 오차(drift)가 훨씬 적음
      if (now - lastTickTime.current >= 1000) {
        tick();
        // lastTickTime을 now가 아닌 += 1000으로 보정하는 이유:
        // rAF 콜백이 정확히 1000ms마다 오지 않아 누적 오차가 생기는 것을 방지
        lastTickTime.current += 1000;
      }
      if (sec > 0) {
        rafId.current = requestAnimationFrame(tickRaf);
      }
    };
    rafId.current = requestAnimationFrame(tickRaf);

    // 정리 함수: 게임 중지/일시정지/언마운트 시 rAF 루프를 반드시 취소해 메모리 누수 방지
    return () => {
      if (rafId.current !== undefined) cancelAnimationFrame(rafId.current);
    };
  }, [tick, sec, isRunning, isPaused]);

  return { sec };
};

// 게임 컨트롤(시작, 중지, 종료, 재시작)
export const useGameControls = () => {
  const navigate = useNavigate();
  const { start, pause, resume, isRunning, isPaused, reset, addScore } =
    useGameTimerStore(
      useShallow((state) => ({
        start: state.start,
        pause: state.pause,
        resume: state.resume,
        isRunning: state.isRunning,
        isPaused: state.isPaused,
        reset: state.reset,
        addScore: state.addScore,
      }))
    );

  // useCallback으로 감싼 이유: 이 hook을 쓰는 컴포넌트가 리렌더될 때
  // 자식 컴포넌트(Button)에 넘기는 핸들러 참조가 바뀌지 않도록 메모이제이션
  const handleStart = useCallback(() => start(), [start]);
  const handlePause = useCallback(() => pause(), [pause]);
  const handleResume = useCallback(() => resume(), [resume]);
  const handleExit = useCallback(() => {
    // 그만하기: 셋업 화면으로 돌아가면서 타이머/점수 초기화
    navigate(URL.SETUP);
    reset();
  }, [navigate, reset]);

  return {
    handleStart,
    handlePause,
    handleResume,
    handleExit,
    isRunning,
    isPaused,
    addScore,
  };
};

// 게임 보드(두더지 조작, 두더지 출현 관리)
export const useGameBoard = () => {
  const navigate = useNavigate();
  const {
    row,
    col,
    mole: maxMoleCount,
  } = useSetupStore(
    useShallow((state) => ({
      row: state.row,
      col: state.col,
      mole: state.mole,
    }))
  );
  const addRanking = useRankingStore((state) => state.addRanking);

  const { isRunning, isPaused, addScore, sec, score } = useGameTimerStore(
    useShallow((state) => ({
      isRunning: state.isRunning,
      isPaused: state.isPaused,
      addScore: state.addScore,
      sec: state.sec,
      score: state.score,
    }))
  );
  const [, startTransition] = useTransition();

  const holeCount = row * col;
  // 두더지 노출 여부를 boolean 배열로 관리 → 인덱스가 구멍 위치와 1:1 매핑됨
  const [isMoleVisible, setIsMoleVisible] = useState(
    Array(holeCount).fill(false)
  );
  // workers를 ref로 관리하는 이유: Worker 인스턴스는 렌더링과 무관한 사이드이펙트 자원이므로
  // state로 두면 변경 시 불필요한 리렌더가 발생함
  const workers = useRef<Worker[]>([]);

  // 워커 메시지 핸들러
  const handleWorkerMessage = (idx: number, e: MessageEvent) => {
    setIsMoleVisible((prev) => {
      const activeCount = prev.filter(Boolean).length;
      if (e.data.type === "show") {
        // 이미 최대 마릿수에 도달했거나 해당 구멍에 이미 두더지가 있으면 무시
        if (activeCount >= maxMoleCount || prev[idx]) return prev;
        const next = [...prev];
        next[idx] = true;
        return next;
      } else if (e.data.type === "hide") {
        // 이미 숨겨진 상태라면 배열 재생성을 피하기 위해 이전 참조 그대로 반환
        if (!prev[idx]) return prev;
        const next = [...prev];
        next[idx] = false;
        return next;
      }
      return prev;
    });
  };

  // 게임 시작/정지/화면 이탈 시 워커 관리
  useEffect(() => {
    if (isRunning && !isPaused) {
      // 구멍 하나당 독립적인 Worker를 생성하는 이유:
      // 각 두더지의 등장/소멸 타이밍이 서로 독립적이어야 하고,
      // Worker는 메인 스레드를 차단하지 않아 게임 UI가 부드럽게 유지됨
      workers.current = Array(holeCount).fill(null);
      for (let i = 0; i < holeCount; i++) {
        const worker = new MoleWorker();
        worker.onmessage = (e) => handleWorkerMessage(i, e);
        worker.postMessage("start");
        workers.current[i] = worker;
      }
    } else {
      // 일시정지 또는 게임 종료 시 워커를 즉시 terminate → 메모리 및 타이머 누수 방지
      workers.current.forEach((w) => w && w.terminate());
      workers.current = [];
    }

    return () => {
      workers.current.forEach((w) => w && w.terminate());
      workers.current = [];
    };
  }, [isRunning, isPaused, holeCount, maxMoleCount]);

  useEffect(() => {
    // sec이 바뀔 때마다 워커에도 현재 초를 전달 → 워커가 남은 시간에 따라 난이도를 조절할 수 있음
    workers.current.forEach((w) => {
      if (w) w.postMessage({ sec });
    });
    // sec이 0이 되는 순간 랭킹을 저장하고 결과 페이지로 이동
    // addRanking을 여기서 호출하는 이유: score와 설정값(row, col, mole)을 한 시점에 모아서 기록해야 하기 때문
    if (sec <= 0) {
      navigate(URL.GAME_RESULT);
      addRanking({
        score: score,
        date: new Date(),
        row: row,
        col: col,
        mole: maxMoleCount,
      });
    }
  }, [sec]);

  // 두더지 클릭 핸들러
  const handleMoleClick = (idx: number) => {
    // 일시정지 중에는 클릭해도 점수가 올라가지 않도록 막음
    if (isRunning && isPaused) return;
    if (isMoleVisible[idx]) {
      // 클릭 즉시 두더지를 숨기고 (긴급 UI 반영)
      setIsMoleVisible((prev) => {
        const next = [...prev];
        next[idx] = false;
        return next;
      });
      // addScore는 startTransition으로 감싸서 점수 UI 업데이트를 낮은 우선순위로 처리
      // → 두더지가 사라지는 상호작용(긴급)이 점수 표시(비긴급)보다 먼저 반영됨
      startTransition(() => {
        addScore();
      });
    }
  };

  return { row, col, isMoleVisible, handleMoleClick };
};
