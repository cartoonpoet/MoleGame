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
  const { sec, tick, isRunning, isPaused } = useGameTimerStore(
    useShallow((state) => ({
      sec: state.sec,
      tick: state.tick,
      isRunning: state.isRunning,
      isPaused: state.isPaused,
    }))
  );
  const rafId = useRef<number>(0);
  const lastTickTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!isRunning || isPaused) return;
    lastTickTime.current = Date.now();

    const tickRaf = () => {
      const now = Date.now();
      // 1초 이상 경과 시 tick 호출
      if (now - lastTickTime.current >= 1000) {
        tick();
        lastTickTime.current += 1000;
      }
      if (sec > 0) {
        rafId.current = requestAnimationFrame(tickRaf);
      }
    };
    rafId.current = requestAnimationFrame(tickRaf);

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

  const handleStart = useCallback(() => start(), [start]);
  const handlePause = useCallback(() => pause(), [pause]);
  const handleResume = useCallback(() => resume(), [resume]);
  const handleExit = useCallback(() => {
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
      mole: state.mole, // 최대 마릿수
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
  const [isMoleVisible, setIsMoleVisible] = useState(
    Array(holeCount).fill(false)
  );
  const workers = useRef<Worker[]>([]);

  // 워커 메시지 핸들러
  const handleWorkerMessage = (idx: number, e: MessageEvent) => {
    setIsMoleVisible((prev) => {
      const activeCount = prev.filter(Boolean).length;
      if (e.data.type === "show") {
        // 최대 마릿수 제한 or 지금 등장 상태
        if (activeCount >= maxMoleCount || prev[idx]) return prev;
        const next = [...prev];
        next[idx] = true;
        return next;
      } else if (e.data.type === "hide") {
        // 지금 등장 상태가 아니면 무시
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
    // 게임이 실행 중일 때만 워커 생성
    if (isRunning && !isPaused) {
      workers.current = Array(holeCount).fill(null);
      for (let i = 0; i < holeCount; i++) {
        const worker = new MoleWorker();
        worker.onmessage = (e) => handleWorkerMessage(i, e);
        worker.postMessage("start");
        workers.current[i] = worker;
      }
    } else {
      workers.current.forEach((w) => w && w.terminate());
      workers.current = [];
    }

    return () => {
      workers.current.forEach((w) => w && w.terminate());
      workers.current = [];
      // setIsMoleVisible(Array(holeCount).fill(false));
    };
  }, [isRunning, isPaused, holeCount, maxMoleCount]);

  useEffect(() => {
    // 게임 타이머(sec)가 바뀔 때마다 모든 워커에 sec 값을 전달
    workers.current.forEach((w) => {
      if (w) w.postMessage({ sec });
    });
    // 게임 종료 시 랭킹 저장 및 결과 페이지 이동
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
    if (isRunning && isPaused) return;
    if (isMoleVisible[idx]) {
      setIsMoleVisible((prev) => {
        const next = [...prev];
        next[idx] = false;
        return next;
      });
      startTransition(() => {
        addScore();
      });
    }
  };

  return { row, col, isMoleVisible, handleMoleClick };
};
