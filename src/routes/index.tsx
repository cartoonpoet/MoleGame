import { createBrowserRouter, RouterProvider } from "react-router";
import { Suspense, lazy } from "react";
import { URL } from "../constants";
import LoadingImage from "../assets/image/loading.webp";

const Setup = lazy(() => import("../pages/Setup"));
const Game = lazy(() => import("../pages/Game"));
const GameResult = lazy(() => import("../pages/GameResult"));
const Ranking = lazy(() => import("../pages/Ranking"));

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
