import { useGameBoard } from "../../../hooks/useGame";
import Mole from "./Mole";

const Moles = () => {
  const { row, col, isMoleVisible, handleMoleClick } = useGameBoard();
  return Array.from({ length: row * col }).map((_, idx) => {
    const x = Math.floor(idx / col);
    const y = idx % col;

    return (
      <Mole
        key={`${x}-${y}`}
        isMoleVisible={isMoleVisible[idx]}
        handleMoleClick={() => handleMoleClick(idx)}
      />
    );
  });
};

export default Moles;
