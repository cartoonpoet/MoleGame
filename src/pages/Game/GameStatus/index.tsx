import * as styles from "./style.css";
import Remain from "./Remain";
import Score from "./Score";

const GameStatus = () => {
  return (
    <header className={styles.header}>
      <Remain />
      <Score />
    </header>
  );
};

export default GameStatus;
