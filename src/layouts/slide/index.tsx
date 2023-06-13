/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 16:19:03
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-13 15:03:20
 * @FilePath: \midway-project-web\src\layouts\slide\index.tsx
 * @Description: 描述一下
 * 
 */
import { memo } from 'react';
import { Drawer } from 'antd';
import { useUpdateEffect } from 'react-use';

import { IconBuguang } from '@/assets/icons/buguang';
import { useGlobalStore } from '@/stores/global';
import { usePCScreen } from '@/hooks/use-pc-screen';
import { defaultSetting } from '@/default-setting';

import SlideMenu from './menus';

const SlideIndex = () => {

  const isPC = usePCScreen();

  const {
    collapsed,
    setCollapsed,
  } = useGlobalStore();


  useUpdateEffect(() => {
    if (!isPC) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isPC]);


  function renderMenu() {
    return (
      <SlideMenu />
    )
  }

  if (!isPC) {
    return (
      <Drawer
        open={!collapsed}
        footer={null}
        placement="left"
        width={defaultSetting.slideWidth}
        className="bg-primary"
        zIndex={10001}
        closable={false}
        title={(
          <div
            className='flex items-center gap-[4px] text-[20px] justify-center'
            style={{ width: defaultSetting.slideWidth }}
          >
            <IconBuguang className="text-blue-500" />
            <h1 className='text-primary font-bold text-[22px]'>员工档案管理</h1>
          </div>
        )}
        headerStyle={{ padding: '24px 0', border: 'none' }}
        bodyStyle={{ padding: '0 16px' }}
        onClose={() => {
          setCollapsed(true);
        }}
      >
        {renderMenu()}
      </Drawer>
    )
  }

  return (
    <div
      style={{ width: collapsed ? 112 : defaultSetting.slideWidth }}
      className="color-transition top-[80px] fixed box-border left-0 bottom-0 overflow-y-auto px-[16px] bg-primary <lg:hidden"
    >
      {renderMenu()}
    </div>
  )
}

export default memo(SlideIndex);