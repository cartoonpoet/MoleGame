import NumberIcon from "../NumberIcon";
import * as styles from "./style.css";

interface CardProps {
  num: number;
  content: string;
  date: string;
}

const Card = ({ num, content, date }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <NumberIcon num={num} />
        <p>{content}</p>
      </div>
      <div className={styles.cardAddInfo}>{date}</div>
    </div>
  );
};

export default Card;
