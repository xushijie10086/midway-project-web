/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 16:19:03
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-06 11:35:36
 * @FilePath: \fluxy-admin\midway-project-web\src\layouts\index.tsx
 * @Description: 描述一下
 * 
 */
import { Outlet, useNavigate } from "react-router-dom"

import Slide from './slide';
import Header from './header';
import Content from './content';
import { useGlobalStore } from "@/store/global";
import { useEffect } from "react";

const BasicLayout: React.FC = () => {

  const { token } = useGlobalStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate('/user/login')
  }, [navigate, token])

  return (
    <div className='bg-primary overflow-hidden'>
      <Header />
      <Slide />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default BasicLayout;