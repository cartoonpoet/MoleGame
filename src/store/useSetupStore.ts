import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// 게임 시작 전 사용자가 설정하는 옵션값 (행/열/두더지 마릿수)
// SetupState를 별도 interface로 분리해서 RankingStore에서 extends로 재사용 가능하게 함
export interface SetupState {
  row: number;
  col: number;
  mole: number;
}

// SetupName을 타입으로 분리한 이유: useSetup hook에서 name prop으로 받아
// store의 어떤 키를 조작할지 동적으로 결정할 때 타입 안전성을 보장하기 위함
export type SetupName = "row" | "col" | "mole";

interface SetupActions {
  setValue: (name: SetupName, value: number) => void;
}

// immer 미들웨어를 사용하는 이유: 중첩 객체 상태를 불변성(immutability)을 신경 쓰지 않고
// 직접 수정하는 방식(prev[name] = value)으로 작성할 수 있어 코드가 단순해짐
export const useSetupStore = create<SetupState & SetupActions>()(
  immer((set) => ({
    // 초기값을 2x2, 두더지 1마리로 설정 → 가장 단순한 게임 설정이 기본값
    row: 2,
    col: 2,
    mole: 1,
    // name을 키로 받아 하나의 setter로 row/col/mole 모두 처리 → setter를 3개 만들지 않아도 됨
    setValue: (name, value) =>
      set((prev) => {
        prev[name] = value;
        return prev;
      }),
  }))
);
