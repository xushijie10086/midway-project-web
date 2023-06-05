/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 16:18:45
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-05 16:58:46
 * @FilePath: \midway-project-web\vite.config.ts
 * @Description: 描述一下
 * 
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), WindiCSS()],
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true,
      }
    }
  }
});
