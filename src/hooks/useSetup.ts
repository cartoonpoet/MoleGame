import { useCallback } from "react";
import { useSetupStore, type SetupName } from "../store/useSetupStore";
import { useNavigate } from "react-router";
import { URL } from "../constants";
import { useShallow } from "zustand/shallow";
import { useGameTimerStore } from "../store/useGameTimerStore";

// [설계 결정] React Hook Form / useActionState 대신 Zustand 직접 구독 방식을 선택한 이유
//
// ❶ row, col, mole은 "폼 제출 후 얻는 값"이 아니라 게임 전반의 전역 설정값임
//    - GameBoard는 격자 크기를 그리기 위해 row/col을 구독
//    - moleWorker도 maxMoleCount를 useSetupStore에서 가져옴
//    - RHF를 쓴다면 "폼 submit 시 Zustand에 sync"하는 추가 단계가 생겨
//      오히려 두 곳에 상태가 분산됨 (form 내부 상태 + Zustand)
//
// ❷ React 19의 useActionState / <form action={fn}> 은 서버 액션 패턴에 최적화된 API
//    - 서버로 데이터를 전송하거나, JS 비활성화 환경의 progressive enhancement가 목적
//    - 이 프로젝트는 순수 클라이언트 SPA이고 서버 통신이 없으므로 적합하지 않음
//
// ❸ 필드가 row/col/mole 세 개뿐이고, 유효성 검사도 시작 버튼 클릭 시 한 번만 수행
//    - RHF가 제공하는 "리렌더 최소화", "복잡한 필드 배열 관리" 같은 이점을 누릴 상황이 아님
//    - 오히려 Zustand controlled input이 더 적은 의존성으로 동일한 결과를 냄

interface SetupProps {
  name: SetupName;
}

// Option 컴포넌트마다 각자의 name을 전달받아 store의 특정 값을 읽고 씀
// 하나의 hook으로 row/col/mole 입력 모두 처리 → Option 컴포넌트를 완전히 재사용 가능하게 함
export const useOption = ({ name }: SetupProps) => {
  const value = useSetupStore((state) => state[name]);
  const setValue = useSetupStore((state) => state.setValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 소수점 이하 입력 방지: type="number"여도 사용자가 "2.5" 같은 값을 입력할 수 있음
      // "." 앞 부분만 잘라내어 정수 값만 저장
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
  // 게임 시작 전에 타이머/점수를 초기화하는 이유:
  // 이전 게임에서 남은 상태로 새 게임을 시작할 경우를 방지
  const reset = useGameTimerStore((state) => state.reset);

  const navigate = useNavigate();
  const handleStart = () => {
    // 행과 열 유효성: 2~6 사이로 제한 → 2 미만이면 게임판이 너무 작고, 6 초과면 너무 복잡해짐
    if (row < 2 || row > 6) {
      alert("행은 2~6 사이의 숫자로 설정해주세요.");
      return;
    }
    if (col < 2 || col > 6) {
      alert("열은 2~6 사이의 숫자로 설정해주세요.");
      return;
    }

    // 행과 열을 같게 강제하는 이유: 정사각형 격자를 유지해 시각적 균형을 맞추기 위함
    if (col !== row) {
      alert("행과 열은 같은 숫자로 설정해주세요.");
      return;
    }

    // 최대 두더지 수: 전체 구멍의 절반 미만으로 제한
    // 절반 이상이 동시에 나타나면 게임이 너무 쉬워지고 구멍이 모두 차 보이는 문제가 생김
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
