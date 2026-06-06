import { createBrowserRouter, RouterProvider } from "react-router";
import { Suspense, lazy } from "react";
import { URL } from "../constants";
import LoadingImage from "../assets/image/loading.webp";

// lazy()로 페이지 컴포넌트를 동적 import → 첫 로딩 시 모든 페이지 JS를 한 번에 받지 않고
// 실제로 해당 경로에 진입할 때만 청크를 다운로드(코드 스플리팅)해서 초기 번들 크기를 줄임
const Setup = lazy(() => import("../pages/setup"));
const Game = lazy(() => import("../pages/Game"));
const GameResult = lazy(() => import("../pages/GameResult"));
const Ranking = lazy(() => import("../pages/Ranking"));

// Suspense fallback으로 청크 로딩 중에 로딩 이미지를 보여줘서 빈 화면(레이아웃 깜빡임)을 방지
const router = createBrowserRouter([
  {
    path: URL.SETUP,
    element: (
      <Suspense fallback={<img src={LoadingImage} alt="loading" />}>
        <Setup />
      </Suspense>
    ),
  },
  {
    path: URL.GAME,
    element: (
      <Suspense fallback={<img src={LoadingImage} alt="loading" />}>
        <Game />
      </Suspense>
    ),
  },
  {
    path: URL.GAME_RESULT,
    element: (
      <Suspense fallback={<img src={LoadingImage} alt="loading" />}>
        <GameResult />
      </Suspense>
    ),
  },
  {
    path: URL.RANKING,
    element: (
      <Suspense fallback={<img src={LoadingImage} alt="loading" />}>
        <Ranking />
      </Suspense>
    ),
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
