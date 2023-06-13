/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 16:19:03
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-13 16:40:28
 * @FilePath: \midway-project-web\src\main.tsx
 * @Description: 描述一下
 * 
 */
import ReactDOM from 'react-dom/client'
import NProgress from 'nprogress';

import App from './app'

import 'virtual:windi.css'
import 'nprogress/nprogress.css';


import './overwrite.css'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  parent: '#root'
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
