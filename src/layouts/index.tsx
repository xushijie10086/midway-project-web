/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 16:19:03
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-13 14:30:14
 * @FilePath: \midway-project-web\src\layouts\index.tsx
 * @Description: 描述一下
 * 
 */
import { Outlet, useNavigate } from "react-router-dom"

import Slide from './slide';
import Header from './header';
import Content from './content';
import { useGlobalStore } from "@/stores/global";
import { useEffect } from "react";
import { useRequest } from "@/hooks/use-request";
import userService from "@/service";
import GloablLoading from "@/components/global-loading";
import { useUserStore } from "@/stores/global/user";
import { antdUtils } from "@/utils/antd";
import { App } from "antd";

const BasicLayout: React.FC = () => {

  const { refreshToken, lang } = useGlobalStore()
  const { setCurrentUser } = useUserStore()
  const navigate = useNavigate()

  const {
    loading,
    data: currentUserDetail,
    run: getCurrentUserDetail,
  } = useRequest(
    userService.getCurrentUserDetail,
    { manual: true }
  );

  /**
   *  监听refreshToken变化，如果为空则表示退出登录，
      不为空则表示其他页签重新登录了，我们需要重新获取一下用户信息。
   */
  useEffect(() => {
    if (!refreshToken) {
      navigate('/user/login');
      return;
    }
    getCurrentUserDetail();
  }, [refreshToken, getCurrentUserDetail, navigate]);

  useEffect(() => {
    setCurrentUser(currentUserDetail || null);
  }, [currentUserDetail, setCurrentUser]);

  // 监听localStorage变化，如果有对应key的值变化就重新同步localStorage中值到store中
  useEffect(() => {
    function storageChange(e: StorageEvent) {
      if (e.key === useGlobalStore.persist.getOptions().name) {
        useGlobalStore.persist.rehydrate();
      }
    }

    window.addEventListener<'storage'>('storage', storageChange);

    return () => {
      window.removeEventListener<'storage'>('storage', storageChange);
    }
  }, []);

  const { notification, message, modal } = App.useApp();

  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  if (loading) {
    return (
      <GloablLoading />
    )
  }

  return (
    <div key={lang} className='bg-primary overflow-hidden'>
      <Header />
      <Slide />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default BasicLayout;