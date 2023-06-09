/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 17:52:30
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-09 17:26:02
 * @FilePath: \midway-project-web\src\pages\login\index.tsx
 * @Description: 描述一下
 * 
 */
import { IconYanzhengma01 } from '@/assets/icons/yanzhengma01'
import { t } from '@/utils/i18n';
import { IconBuguang } from '@/assets/icons/buguang'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Carousel, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import loginService, { LoginDTO } from './service';
import { useGlobalStore } from '@/store/global';
import { JSEncrypt } from "jsencrypt"

const Login = () => {
  const { message } = App.useApp();
  const { setToken, setRefreshToken } = useGlobalStore();
  const { runAsync: login, loading } = useRequest(loginService.login, { manual: true })
  const { data: captcha, refresh: refreshCaptcha } = useRequest(loginService.getCaptcha);
  const { runAsync: getPublicKey } = useRequest(loginService.getPublicKey, { manual: true });
  const navigate = useNavigate();

  const onFinish = async (values: LoginDTO) => {
    if (!captcha?.data) return

    values.captchaId = captcha.data.id;
    try {

      // 获取公钥
      const { data: publicKey } = await getPublicKey();

      // 使用公钥对密码加密
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      const password = encrypt.encrypt(values.password);

      if (!password) return

      values.password = password;
      values.publicKey = publicKey;

      const { data } = await login(values);
      setToken(data.token);
      setRefreshToken(data.refreshToken);

      navigate('/');
    } catch (error: any) {
      refreshCaptcha();
      message.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-primary light:bg-[rgb(238,242,246)] bg-[rgb(238,242,246)] flex justify-center items-center h-[100vh]">
      <div className='flex-[2.5] flex justify-center'>
        <div className='dark:bg-[rgb(33,41,70)] w-[400px] px-[32px] py-[20px] mt-[-12%] bg-white rounded-md'>
          <div className='text-center'>
            <div className='flex justify-center gap-2'>
              <IconBuguang className='text-[20px] text-blue-500' />
              <h1 className='dark:(text-white) ' style={{ marginBottom: '0.2em' }}>员工档案管理系统</h1>
            </div>
            <h3
              className='dark:(text-white) text-[rgba(0,0,0,.45)] mb-[1em] text-[14px] font-normal'
            >
              {t("wbTMzvDM" /* 一个高颜值后台管理系统 */)}
            </h3>
          </div>
          <Form
            name="super-admin"
            className="login-form"
            initialValues={{ accountNumber: '123456@qq.com', password: '123456' }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="accountNumber"
              rules={[{ required: true, message: t("wVzXBuYs" /* 请输入账号 */) }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("RNISycbR" /* 账号 */)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: t("DjMcEMAe" /* 请输入密码 */) }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("HplkKxdY" /* 密码 */)}
              />
            </Form.Item>

            <Form.Item
              name="captcha"
              rules={[{ required: true, message: t("CKuTjGng" /* 请输入验证码 */) }]}
            >
              <Input
                prefix={<IconYanzhengma01 className='text-[20px]' />}
                placeholder={t("iOQnWBkH" /* 验证码 */)}
                suffix={(
                  <img
                    title={t("nwBLqTXw" /* 验证码 */)}
                    className='cursor-pointer'
                    src={captcha?.data?.imageBase64}
                    onClick={refreshCaptcha}
                  />
                )}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 18 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                {t("dDdqAAve" /* 登录 */)}
              </Button>
            </Form.Item>

          </Form>
        </div>
      </div>

      <div
        className='flex-[1.7] dark:bg-[rgb(33,41,70)] bg-white h-[100vh] relative <lg:hidden'
        style={{
          backgroundImage: 'url(./images/login-right-bg.svg)'
        }}
      >
        <div
          className='img1 w-[243px] h-[210px] bg-center absolute top-[23%] left-[37%]'
          style={{
            backgroundSize: 380,
            backgroundImage: 'url(./images/login-right-before.svg)'
          }}
        />
        <div
          className='img2 w-[313px] h-[280px] bg-center absolute top-[32%] left-[40%]'
          style={{
            backgroundSize: 380,
            backgroundImage: 'url(./images/login-right-after.svg)'
          }}
        />
        <div className='absolute left-[100px] right-[100px] bottom-[50px] h-[200px]'>
          <Carousel autoplay dots={{ className: 'custom' }}>
            <div>
              <div className='h-[160px] bg-transparent flex items-center justify-center'>
                <div>
                  <h3 className='dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]'>
                  员工档案管理系统
                  </h3>
                  <div className='dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px] '>
                    一个高颜值后台员工档案管理系统
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='h-[160px] bg-transparent flex items-center justify-center'>
                <div>
                  <h3 className='dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]'>
                  员工档案管理系统
                  </h3>
                  <div className='dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px]'>
                    一个高颜值后台管理系统
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='h-[160px] bg-transparent flex items-center justify-center'>
                <div>
                  <h3 className='dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]'>
                    fluxy-admin
                  </h3>
                  <div className='dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px] '>
                    一个高颜值后台管理系统
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Login;
