/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 16:19:03
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-12 12:57:50
 * @FilePath: \midway-project-web\src\app.tsx
 * @Description: 描述一下
 * 
 */
import { useEffect, useMemo } from 'react';
import { ConfigProvider, ThemeConfig, theme, App as AntdApp } from 'antd'
import { RouterProvider } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { useGlobalStore } from './stores/global'

import { i18n } from './utils/i18n';

import './overwrite.css'
import { router } from './router';

function App() {

  const { darkMode, lang } = useGlobalStore();


  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  const curTheme: ThemeConfig = useMemo(() => {
    if (darkMode) {
      return {
        token: {
          colorPrimary: 'rgb(103, 58, 183)',
          colorBgBase: 'rgb(17, 25, 54)',
          colorBgContainer: 'rgb(26, 34, 63)',
          colorBorder: 'rgba(189, 200, 240, 0.157)',
          colorBgTextHover: 'rgba(124, 77, 255, 0.082)',
          colorTextHover: 'rgba(124, 77, 255, 0.082)',
          controlItemBgActive: 'rgba(33, 150, 243, 0.16)',
        },
        algorithm: theme.darkAlgorithm,
      }
    } else {
      return {
        token: {
          colorPrimary: 'rgb(103, 58, 183)',
        },
      }
    }
  }, [darkMode])

  return (
    <ConfigProvider
      theme={curTheme}
      locale={lang === 'zh' ? zhCN : enUS}
      componentSize='large'
    >
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
