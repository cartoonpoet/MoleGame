import { useShallow } from "zustand/shallow";
import { useSetupStore } from "../../../store/useSetupStore";
import Moles from "./Moles";
import * as styles from "./style.css";

const GameBoard = () => {
  const { row, col } = useSetupStore(
    useShallow((state) => ({
      row: state.row,
      col: state.col,
    }))
  );
  const styleVariable = {
    "--row": row,
    "--col": col,
  } as React.CSSProperties;

  return (
    <div className={styles.board} style={styleVariable}>
      <Moles />
    </div>
  );
};

export default GameBoard;
