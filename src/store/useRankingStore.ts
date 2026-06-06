import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { SetupState } from "./useSetupStore";

// SetupState(row, col, mole)를 extends해서 재사용 → 게임 설정값이 랭킹의 맥락(난이도)이 됨
// 같은 점수라도 어떤 설정에서 얻었는지 기록하기 위해 포함
export interface RankingType extends SetupState {
  score: number;
  date: Date;
}

interface RankingState {
  ranking: RankingType[];
}

// 개발 중 UI 확인용으로 썼던 더미 데이터. 검수 후 제거함
// const dummyRanking: RankingType[] = [
//   {
//     col: 3,
//     row: 3,
//     mole: 10,
//     score: 100,
//     date: new Date(),
//   },
//   ...
// ];

interface RankingActions {
  addRanking: (score: RankingType) => void;
  resetRanking: () => void;
}

export const useRankingStore = create<RankingState & RankingActions>()(
  immer((set) => ({
    // 외부 DB 없이 메모리에만 유지. 새로고침 시 초기화되는 것을 의도한 설계
    ranking: [],
    addRanking: (ranking) =>
      set((state) => {
        state.ranking.push(ranking);
        // 정렬 기준 1: 점수 높은 순 (주 기준)
        // 정렬 기준 2: 점수가 같으면 난이도 높은 순 (col * row * mole = 격자 수 × 두더지 수)
        // 정렬 기준 3: 난이도도 같으면 먼저 달성한 순 (date 오름차순)
        state.ranking.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          const aLevel = a.col * a.row * a.mole;
          const bLevel = b.col * b.row * b.mole;
          if (bLevel !== aLevel) return bLevel - aLevel;
          return a.date.getTime() - b.date.getTime();
        });
        // 상위 10개만 유지 → splice(10)은 인덱스 10부터 끝까지 제거
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
