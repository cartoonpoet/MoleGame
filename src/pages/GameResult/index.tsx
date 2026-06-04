import { Button } from "../../components";
import * as styles from "./style.css";
import { useGameResult } from "../../hooks/useGameResult";

const GameResult = () => {
  const { score, handleRestart, handleReset, handleRanking } = useGameResult();
  return (
    <section className={styles.layout} aria-labelledby="game-result-title">
      <header className={styles.header}>
        <h1 id="game-result-title">최종 점수</h1>
      </header>
      <main className={styles.main}>{score} 점</main>
      <footer className={styles.footer}>
        <Button
          buttonType="fill"
          size="large"
          status="default"
          onClick={handleRestart}
        >
          다시하기
        </Button>
        <Button
          buttonType="soft"
          size="large"
          status="default"
          onClick={handleRanking}
        >
          랭킹
        </Button>
        <Button
          buttonType="outline"
          size="large"
          status="default"
          onClick={handleReset}
        >
          처음으로
        </Button>
      </footer>
    </section>
  );
};

export default GameResult;
