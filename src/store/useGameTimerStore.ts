import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GameTimerState {
  sec: number; // 게임 남은시간
  isRunning: boolean; // 게임이 진행중인지
  isPaused: boolean; // 시간이 일시정지 상태인지
  score: number; // 점수
}

interface GameTimerActions {
  start: () => void; // 시작
  pause: () => void; // 중지
  resume: () => void; // 재개
  tick: () => void; // 시간 감소
  reset: () => void; // 초기화
  addScore: () => void; // 점수 추가
}

export const useGameTimerStore = create<GameTimerState & GameTimerActions>()(
  immer((set) => ({
    sec: 60,
    isRunning: false,
    isPaused: false,
    score: 0,
    start: () => set({ isRunning: true, isPaused: false }),
    pause: () => set({ isPaused: true }),
    resume: () => set({ isPaused: false }),
    tick: () =>
      set((prev) => {
        if (!prev.isRunning || prev.isPaused) return prev;
        if (prev.sec <= 0) {
          prev.isRunning = false;
          return prev;
        }
        prev.sec -= 1;
        return prev;
      }),
    reset: () => set({ sec: 60, isRunning: false, isPaused: false, score: 0 }),
    addScore: () => set((prev) => ({ score: prev.score + 1 })),
  }))
);
