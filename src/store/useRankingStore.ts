import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { SetupState } from "./useSetupStore";

export interface RankingType extends SetupState {
  score: number;
  date: Date;
}

interface RankingState {
  ranking: RankingType[];
}

// const dummyRanking: RankingType[] = [
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
// ];

interface RankingActions {
  addRanking: (score: RankingType) => void;
  resetRanking: () => void;
}

export const useRankingStore = create<RankingState & RankingActions>()(
  immer((set) => ({
    ranking: [],
    addRanking: (ranking) =>
      set((state) => {
        state.ranking.push(ranking);
        state.ranking.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          const aLevel = a.col * a.row * a.mole;
          const bLevel = b.col * b.row * b.mole;
          if (bLevel !== aLevel) return bLevel - aLevel;
          return a.date.getTime() - b.date.getTime();
        });
        state.ranking.splice(10);
        return state;
      }),
    resetRanking: () =>
      set((state) => {
        state.ranking = [];
        return state;
      }),
  }))
);
