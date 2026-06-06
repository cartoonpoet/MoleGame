// URL 경로를 상수로 관리하는 이유:
// 경로 문자열이 routes, hooks, navigate() 등 여러 곳에서 사용되는데
// 상수로 모아두면 경로가 바뀔 때 이 파일 하나만 수정하면 됨 (매직 스트링 방지)
export const URL = {
  SETUP: "/",
  GAME: "/game",
  GAME_RESULT: "/game-result",
  RANKING: "/ranking",
};
