import { useGameTimerStore } from "../../../store/useGameTimerStore";

const Score = () => {
  const score = useGameTimerStore((state) => state.score);
  return <div>점수 {score}점</div>;
};

export default Score;
