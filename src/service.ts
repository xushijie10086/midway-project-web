/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-13 10:39:51
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-13 10:41:33
 * @FilePath: \midway-project-web\src\service.ts
 * @Description: 描述一下
 * 
 */
import { User } from "./pages/user/service";
import request from "./request";

const userService = {
  getCurrentUserDetail() {
    return request.get<User>("/api/auth/current/user", {
      params: { t: new Date().getTime() + Math.random() },
    });
  },
};

export default userService;
