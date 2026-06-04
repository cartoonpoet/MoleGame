import { Button, Card } from "../../components";
import * as styles from "./style.css";
import { useRanking } from "../../hooks/useRanking";
import { formatDate } from "../../utills";

const Ranking = () => {
  const { ranking, handlePrev, handleResetRanking } = useRanking();

  return (
    <section className={styles.layout}>
      <header className={styles.header}>
        <h1>RANKING</h1>
      </header>
      <ul className={styles.rankingList}>
        {ranking.map((ranking, idx) => (
          <Card
            key={`${ranking.score}-${ranking.date}`}
            num={idx + 1}
            content={`${ranking.score}점`}
            date={formatDate(ranking.date)}
          />
        ))}
      </ul>
      <footer className={styles.footer}>
        <Button
          buttonType="soft"
          size="large"
          status="default"
          onClick={handlePrev}
        >
          돌아가기
        </Button>
        <Button
          buttonType="outline"
          size="large"
          status="default"
          onClick={handleResetRanking}
        >
          초기화
        </Button>
      </footer>
    </section>
  );
};

export default Ranking;
