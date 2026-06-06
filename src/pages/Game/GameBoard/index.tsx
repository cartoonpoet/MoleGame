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
  // CSS Custom Properties로 row/col을 전달하는 이유:
  // CSS Grid의 repeat(var(--col), 1fr) 패턴으로 JS 없이 동적 격자를 구성할 수 있음
  // 런타임에 row/col이 결정되므로 정적 CSS만으로는 처리할 수 없어 인라인 변수로 주입
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
