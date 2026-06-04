import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface SetupState {
  row: number;
  col: number;
  mole: number;
}

export type SetupName = "row" | "col" | "mole";

interface SetupActions {
  setValue: (name: SetupName, value: number) => void;
}

export const useSetupStore = create<SetupState & SetupActions>()(
  immer((set) => ({
    row: 2,
    col: 2,
    mole: 1,
    setValue: (name, value) =>
      set((prev) => {
        prev[name] = value;
        return prev;
      }),
  }))
);
