/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 16:19:03
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-07 14:30:18
 * @FilePath: \midway-project-web\src\config\routes.tsx
 * @Description: 描述一下
 * 
 */
import { DashboardOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { t } from "@/utils/i18n";
export interface MenuItem {
   path: string;
   title?: string;
   icon?: any;
   element?: any;
   children?: MenuItem[];
   layout?: boolean;
   Component?: any;
}

export const routeConfig: MenuItem[] = [
   {
      path: '/dashboard',
      title: 'Dashboard',
      icon: <DashboardOutlined />,
      Component: lazy(() => import('@/pages/dashboard')),
   },
   {
      path: 'system',
      title: t("TxjhbkRA" /* 系统管理 */),
      icon: <DashboardOutlined />,
      children: [
         {
            path: '/system/user',
            Component: lazy(() => import('@/pages/user')),
            title: t("OSoFHlup" /* 用户管理 */),
            icon: <UserOutlined />,
         }
      ]
   },
   {
      path: '/table',
      Component: lazy(() => import('@/pages/table')),
      title: t("bDMJnjEq" /* 表格 */),
      icon: <TableOutlined />,
   },
   {
      path: '/',
      element: <Navigate to='/dashboard' />,
   }
]
