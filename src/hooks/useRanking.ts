import { useNavigate } from "react-router";
import { useRankingStore } from "../store/useRankingStore";
import { useShallow } from "zustand/shallow";
import { URL } from "../constants";

export const useRanking = () => {
  const navigate = useNavigate();
  const { ranking, resetRanking } = useRankingStore(
    useShallow((state) => ({
      ranking: state.ranking,
      resetRanking: state.resetRanking,
    }))
  );

  const handleResetRanking = () => resetRanking();
  const handlePrev = () => navigate(URL.GAME_RESULT);

  return { ranking, handleResetRanking, handlePrev };
};
