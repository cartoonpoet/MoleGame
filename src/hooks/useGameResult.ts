import { useNavigate } from "react-router";
import { useGameTimerStore } from "../store/useGameTimerStore";
import { URL } from "../constants";

export const useGameResult = () => {
  const navigate = useNavigate();
  const score = useGameTimerStore((state) => state.score);
  const reset = useGameTimerStore((state) => state.reset);

  const handleRestart = () => {
    reset();
    navigate(URL.GAME);
  };
  const handleReset = () => navigate(URL.SETUP);
  const handleRanking = () => navigate(URL.RANKING);
  return { score, handleRestart, handleReset, handleRanking };
};
