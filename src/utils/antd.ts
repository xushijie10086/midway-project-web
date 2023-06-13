/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-12 12:05:49
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-12 12:23:10
 * @FilePath: \midway-project-web\src\request\index.ts
 * @Description: 描述一下
 * 
 */
import { MessageInstance } from 'antd/es/message/interface';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { NotificationInstance } from 'antd/es/notification/interface';

type ModalInstance = Omit<ModalStaticFunctions, 'warn'>;

class AntdUtils {
  message: MessageInstance | null = null;
  notification: NotificationInstance | null = null;
  modal: ModalInstance | null = null;

  setMessageInstance(message: MessageInstance) {
    this.message = message;
    this.message.success
  }

  setNotificationInstance(notification: NotificationInstance) {
    this.notification = notification;
  }

  setModalInstance(modal: ModalInstance) {
    this.modal = modal;
  }
}

export const antdUtils = new AntdUtils();