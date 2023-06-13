/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 17:52:30
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-13 08:36:06
 * @FilePath: \midway-project-web\src\pages\user\service.ts
 * @Description: 描述一下
 * 
 */
import request from "@/request";

export interface User {
  id: number;
  userName: string;
  nickName: string;
  phone: string;
  email: string;
  createDate: string;
  updateDate: string;
}

export interface PageData {
  data: User[],
  total: number;
}

const userService = {
  // 分页获取用户列表
  getUserListByPage: (
    { current, pageSize }: { current: number; pageSize: number },
    formData: any
  ) => {
    return request
      .get<PageData>("/api/user/page", {
        params: {
          page: current - 1,
          size: pageSize,
          ...formData,
        },
      })
      .then(([, data]) => {
        return {
          list: data.data,
          total: data.total,
        };
      });
  },
  // 添加用户
  addUser: (data: User) => {
    return request.post("/api/user", data);
  },
  // 更新用户
  updateUser: (data: User) => {
    return request.put("/api/user", data);
  },
  // 删除用户
  deleteUser: (id: number) => {
    return request.delete(`/api/user/${id}`);
  },
};

export default userService;
