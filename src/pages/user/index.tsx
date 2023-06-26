/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 16:27:47
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-26 08:48:10
 * @FilePath: \midway-project-web\src\pages\user\index.tsx
 * @Description: 描述一下
 * 
 */
import { t } from "@/utils/i18n";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, FormInstance, Input, Modal, Popconfirm, Row, Space, Table } from "antd"
import { useRef, useState } from "react";
import { useAntdTable, useRequest } from 'ahooks'
import userService, { User } from './service';
import dayjs from 'dayjs'
import { ColumnsType } from "antd/es/table";
import NewAndEditForm from "./newAndEditForm";
import { antdUtils } from "@/utils/antd";
import { IconBuguang } from "@/assets/icons/buguang";

const UserPage = () => {

    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);
    const { tableProps, search: { submit, reset } } = useAntdTable(userService.getUserListByPage, { form });
    const { runAsync: deleteUser } = useRequest(userService.deleteUser, { manual: true });
    const [editData, setEditData] = useState<User | null>(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const columns: ColumnsType<any> = [
        {
            title: '头像',
            dataIndex: 'avatarPath',
            render: (value: string, record) => {
                console.log(record);
                return <div className='flex justify-center'>
                    {value ? (
                        <img src={value} className='w-[40px] h-[40px] flex items-center rounded-[50%]' />
                    ) : (
                        <Avatar className='bg-[gold] align-middle flex items-center justify-center w-[40px] h-[40px]' icon={<IconBuguang />} />
                    )}
                </div>
            },
            align: 'center',
            width: 100,
        },
        {
            title: t("gGGfiMXg" /* 用户名 */),
            dataIndex: 'userName',
        },
        {
            title: t("rNVhMjzL" /* 昵称 */),
            dataIndex: 'nickName',
        },
        {
            title: t("Ywamboto" /* 手机号 */),
            dataIndex: 'phone',
        },
        {
            title: t("YsgvxeAf" /* 邮箱 */),
            dataIndex: 'email',
        },
        {
            title: t("GaiAJsLv" /* 性别 */),
            dataIndex: 'sex',
            render: (value: number) => value === 1 ? t("zoUCEptE" /* 男 */) : t("ZtDGfcTQ" /* 女 */),
        },
        {
            title: t("PAEYEnxi" /* 创建时间 */),
            dataIndex: 'createDate',
            render: (value: number) => value && dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: t("QkOmYwne" /* 操作 */),
            key: 'action',
            render: (_, record) => record.userName !== 'admin' && (
                <Space size="middle">
                    <a
                        onClick={() => {
                            setEditData(record);
                            setFormOpen(true);
                        }}
                    >{t("jdbqhJVm" /* 编辑 */)}</a>
                    <Popconfirm
                        title={t("ABwSCulf" /* 警告 */)}
                        description={t("wxpXHvDa" /* 确认删除这条数据？ */)}
                        onConfirm={async () => {
                            await deleteUser(record.id);
                            antdUtils.message?.success(t("AEQHAHrP" /* 删除成功！ */));
                            submit();
                        }}
                    >
                        <a>{t("JAhXkFut" /* 删除 */)}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const openForm = () => {
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setEditData(null);
    };

    const saveHandle = () => {
        submit();
        setFormOpen(false);
        setEditData(null);
    }

    return (
        <div>
            <Form onFinish={submit} form={form} size="large" className='dark:bg-[rgb(33,41,70)] bg-white p-[24px] rounded-lg'>
                <Row gutter={24}>
                    <Col className='w-[100%]' lg={24} xl={6} >
                        <Form.Item name="userName" label={t("gGGfiMXg" /* 用户名 */)}>
                            <Input onPressEnter={submit} />
                        </Form.Item>
                    </Col>
                    <Col className='w-[100%]' lg={24} xl={6} >
                        <Form.Item name="nickName" label={t("rNVhMjzL" /* 昵称 */)}>
                            <Input onPressEnter={submit} />
                        </Form.Item>
                    </Col>
                    <Col className='w-[100%]' lg={24} xl={6}>
                        <Form.Item name="phone" label={t("Ywamboto" /* 手机号 */)}>
                            <Input onPressEnter={submit} />
                        </Form.Item>
                    </Col>
                    <Col className='w-[100%]' lg={24} xl={6}>
                        <Space>
                            <Button onClick={submit} type='primary'>{t("YHapJMTT" /* 搜索 */)}</Button>
                            <Button onClick={reset}>{t("uCkoPyVp" /* 清除 */)}</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>

            <div className="mt-[16px] dark:bg-[rgb(33,41,70)] bg-white rounded-lg px-[12px]">
                <div className='py-[16px] '>
                    <Button onClick={openForm} type='primary' size='large' icon={<PlusOutlined />}>{t("pOMYeSBE" /* 新增 */)}</Button>
                </div>
                <Table
                    rowKey="id"
                    scroll={{ x: true }}
                    columns={columns}
                    className='bg-transparent'
                    {...tableProps}
                />
            </div>

            <Modal
                title={editData ? t("mdDFVLKG" /* 编辑 */) : t("PaFMOZLs" /* 新建 */)}
                open={formOpen}
                onOk={() => {
                    formRef.current?.submit();
                }}
                destroyOnClose
                width={640}
                zIndex={999}
                onCancel={closeForm}
                confirmLoading={saveLoading}
            >
                <NewAndEditForm
                    ref={formRef}
                    editData={editData}
                    onSave={saveHandle}
                    open={formOpen}
                    setSaveLoading={setSaveLoading}
                />
            </Modal>
        </div>
    )

}

export default UserPage;