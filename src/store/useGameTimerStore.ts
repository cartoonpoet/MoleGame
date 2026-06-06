import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GameTimerState {
  sec: number;
  isRunning: boolean;
  isPaused: boolean;
  score: number;
}

interface GameTimerActions {
  start: () => void;
  pause: () => void;
  resume: () => void;
  tick: () => void;
  reset: () => void;
  addScore: () => void;
}

// 타이머와 점수를 하나의 store에 묶은 이유:
// 게임 진행 상태(타이머)와 점수는 항상 함께 시작/종료/초기화되는 생명주기를 공유하기 때문.
// reset() 하나로 타이머와 점수를 동시에 초기화할 수 있어 일관성을 유지함
export const useGameTimerStore = create<GameTimerState & GameTimerActions>()(
  immer((set) => ({
    sec: 60,
    isRunning: false,
    isPaused: false,
    score: 0,
    start: () => set({ isRunning: true, isPaused: false }),
    pause: () => set({ isPaused: true }),
    resume: () => set({ isPaused: false }),
    // tick은 store 내부에서 유효성 검증까지 처리 → 호출 측에서 조건을 체크할 필요 없음
    tick: () =>
      set((prev) => {
        // 게임이 실행 중이 아니거나 일시정지 상태면 tick을 무시
        if (!prev.isRunning || prev.isPaused) return prev;
        // 시간이 다 됐을 때 isRunning을 false로 전환 → 워커/RAF 루프가 자연스럽게 종료됨
        if (prev.sec <= 0) {
          prev.isRunning = false;
          return prev;
        }
        prev.sec -= 1;
        return prev;
      }),
    // reset은 다시하기/그만하기 시 호출 → sec도 60으로 돌아가야 하므로 score와 함께 초기화
    reset: () => set({ sec: 60, isRunning: false, isPaused: false, score: 0 }),
    addScore: () => set((prev) => ({ score: prev.score + 1 })),
  }))
);
