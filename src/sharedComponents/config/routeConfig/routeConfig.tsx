import { GamePage } from "@/pagesContent/GamePage";
// import { LoginPage } from "@/pagesContent/LoginPage";
import { MainPage } from "@/pagesContent/MainPage";
import { NotFoundPage } from "@/pagesContent/NotFoundPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  GAME = "game",
  // LOGIN = 'login',
  NOT_FOUND = 'not_found'
}

// export const getRoutelogin = () => '/login';
export const getRouteMain = () => '/TruthOrAction/';
export const getRouteGame = () => '/TruthOrAction/game';
export const getRouteNOT_FOUND = () => '*';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  // [AppRoutes.LOGIN]: {
  //   path: getRoutelogin(),
  //   element: <LoginPage />,
  // },
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },

  [AppRoutes.GAME]: {
    path: getRouteGame(),
    element: <GamePage />,
  },
  
  [AppRoutes.NOT_FOUND]: {
    path: getRouteNOT_FOUND(),
    element: <NotFoundPage />,
},
};
