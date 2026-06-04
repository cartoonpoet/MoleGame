import { useGameTimer } from "../../../hooks/useGame";
import * as styles from "./style.css";

const Remain = () => {
  const { sec } = useGameTimer();
  return (
    <div className={sec <= 10 ? styles.blinkRed : undefined}>
      남은시간 {sec}초
    </div>
  );
};

export default Remain;
