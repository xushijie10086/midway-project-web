/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-12 12:32:04
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-26 15:14:48
 * @FilePath: \midway-project-web\src\router.ts
 * @Description: 描述一下
 *
 */
import { createBrowserRouter } from "react-router-dom";
import { routeConfig } from "./config/routes";

import Login from "@/pages/login";
import ResetPassword from "@/pages/login/reset-password";
import BasicLayout from "@/layouts";
import Result404 from "./404";
import { useGlobalStore } from "@/stores/global";

const router = createBrowserRouter([
  {
    path: "/user/login",
    Component: Login,
  },
  {
    path: "/user/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/",
    Component: BasicLayout,
    children: routeConfig,
  },
  {
    path: "*",
    Component: Result404,
  },
]);

router.subscribe((state) => {
  const { refreshToken } = useGlobalStore.getState();

  if (
    !refreshToken &&
    !(state.historyAction && state.location.pathname === "/user/login")
  ) {
    router.navigate("/user/login");
  }
});

export { router };
