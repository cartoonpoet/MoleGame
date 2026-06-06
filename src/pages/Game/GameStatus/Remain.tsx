import { useGameTimer } from "../../../hooks/useGame";
import * as styles from "./style.css";

const Remain = () => {
  const { sec } = useGameTimer();
  return (
    // 남은 시간이 10초 이하일 때 깜빡이는 빨간 스타일을 적용해 긴박감을 시각적으로 전달
    // 조건이 true일 때만 클래스를 붙이고, 아닐 때는 undefined로 두어 불필요한 className 속성 생성을 피함
    <div className={sec <= 10 ? styles.blinkRed : undefined}>
      남은시간 {sec}초
    </div>
  );
};

export default Remain;
