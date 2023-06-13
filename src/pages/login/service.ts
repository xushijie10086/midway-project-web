/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-06 11:49:47
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-12 12:36:20
 * @FilePath: \midway-project-web\src\pages\login\service.ts
 * @Description: 描述一下
 *
 */
import axios from "axios";
import request from "@/request";
export interface LoginDTO {
  accountNumber: string;
  password: string;
  captchaId: string;
  captcha: string;
  publicKey: string;
}

export interface TokenDTO {
  expire: number;
  token: string;
  refreshExpire: number;
  refreshToken: string;
}

export interface CaptchaDTO {
  id: string;
  imageBase64: string;
}

const loginService = {
  // 登录
  login: (loginDTO: LoginDTO) => {
    return axios.post<TokenDTO>("/api/auth/login", loginDTO);
  },
  // 获取验证码
  getCaptcha: () => {
    return axios.get<CaptchaDTO>("/api/auth/captcha");
  },
  // 获取加密公钥
  getPublicKey: () => {
    return axios.get<string>("/api/auth/publicKey");
  },

  // 刷新token
  refreshToken: (refreshToken: string) => {
    return request.post<TokenDTO>("/api/auth/refresh/token", { refreshToken });
  },

  // 退出登录
  logout() {
    return request.post<TokenDTO>("/api/auth/logout");
  },
};

export default loginService;
