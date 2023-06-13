/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-13 10:46:10
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-13 10:49:44
 * @FilePath: \midway-project-web\src\stores\global\user.ts
 * @Description: 描述一下
 * 
 */
import { User } from "@/pages/user/service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  currentUser: User | null;
}

interface Action {
  setCurrentUser: (currentUser: State["currentUser"]) => void;
}

export const useUserStore = create<State & Action>()(
  devtools(
    (set) => {
      return {
        currentUser: null,
        setCurrentUser: (currentUser: State["currentUser"]) =>
          set({ currentUser }),
      };
    },
    { name: "globalUserStore" }
  )
);
