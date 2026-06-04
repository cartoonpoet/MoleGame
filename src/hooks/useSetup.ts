import { useCallback } from "react";
import { useSetupStore, type SetupName } from "../store/useSetupStore";
import { useNavigate } from "react-router";
import { URL } from "../constants";
import { useShallow } from "zustand/shallow";
import { useGameTimerStore } from "../store/useGameTimerStore";

interface SetupProps {
  name: SetupName;
}

export const useOption = ({ name }: SetupProps) => {
  const value = useSetupStore((state) => state[name]);
  const setValue = useSetupStore((state) => state.setValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 소수점 이하 입력 방지: 소수점(.) 이후는 잘라버림
      const value = e.target.value.split(".")[0];
      setValue(name, Number(value));
    },
    [name, setValue]
  );

  return { value, handleChange };
};

export const useSetup = () => {
  const { row, col, mole } = useSetupStore(
    useShallow((state) => ({
      row: state.row,
      col: state.col,
      mole: state.mole,
    }))
  );
  const reset = useGameTimerStore((state) => state.reset);

  const navigate = useNavigate();
  const handleStart = () => {
    if (row < 2 || row > 6) {
      alert("행은 2~6 사이의 숫자로 설정해주세요.");
      return;
    }
    if (col < 2 || col > 6) {
      alert("열은 2~6 사이의 숫자로 설정해주세요.");
      return;
    }

    if (col !== row) {
      alert("행과 열은 같은 숫자로 설정해주세요.");
      return;
    }

    const maxMole = (row * col) / 2;
    if (!(mole >= 1 && mole < maxMole)) {
      alert(
        `두더지는 최대 ${
          maxMole % 2 == 0 ? maxMole - 1 : Math.floor(maxMole)
        } 마리까지 설정할 수 있습니다.`
      );
      return;
    }
    reset();
    navigate(URL.GAME);
  };

  return { handleStart };
};
