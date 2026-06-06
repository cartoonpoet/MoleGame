import { useGameBoard } from "../../../hooks/useGame";
import Mole from "./Mole";

const Moles = () => {
  const { row, col, isMoleVisible, handleMoleClick } = useGameBoard();
  // Array.from으로 row*col 길이의 배열을 만들고 인덱스로 각 구멍의 위치를 계산
  return Array.from({ length: row * col }).map((_, idx) => {
    // x: 행 번호, y: 열 번호 → key를 단순 인덱스가 아닌 "x-y" 좌표로 만들어
    // 게임판 크기가 바뀌어도 React가 구멍을 정확히 식별할 수 있도록 함
    const x = Math.floor(idx / col);
    const y = idx % col;

    return (
      <Mole
        key={`${x}-${y}`}
        isMoleVisible={isMoleVisible[idx]}
        // 클릭 핸들러에 idx를 클로저로 캡처해서 어떤 구멍인지 특정
        handleMoleClick={() => handleMoleClick(idx)}
      />
    );
  });
};

export default Moles;
