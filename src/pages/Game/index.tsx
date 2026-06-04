import * as styles from "./style.css";
import GameStatus from "./GameStatus";
import GameControls from "./GameControls";
import GameBoard from "./GameBoard";

const Game = () => {
  return (
    <div className={styles.layout}>
      <GameStatus />
      <GameBoard />
      <GameControls />
    </div>
  );
};

export default Game;
