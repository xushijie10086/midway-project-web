/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-05 16:27:47
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-05 17:14:47
 * @FilePath: \midway-project-web\src\pages\user\index.tsx
 * @Description: 描述一下
 * 
 */
import { t } from "@/utils/i18n";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, FormInstance, Input, Modal, Popconfirm, Row, Space, Table, message } from "antd"
import { useRef, useState } from "react";
import { useAntdTable, useRequest } from 'ahooks'
import userService, { User } from './service';
import dayjs from 'dayjs'
import { ColumnsType } from "antd/es/table";
import NewAndEditForm from "./newAndEditForm";

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
            title: '用户名',
            dataIndex: 'userName',
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            render: (value: number) => value === 1 ? '男' : '女',
        },
        {
            title: '创建时间',
            dataIndex: 'createDate',
            render: (value: number) => value && dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => record.userName !== 'admin' && (
                <Space size="middle">
                    <a
                        onClick={() => {
                            setEditData(record);
                            setFormOpen(true);
                        }}
                    >编辑</a>
                    <Popconfirm
                        title='警告'
                        description='确认删除这条数据？'
                        onConfirm={async () => {
                            await deleteUser(record.id);
                            message.success('删除成功！');
                            submit();
                        }}
                    >
                        <a>删除</a>
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
                        <Form.Item name="userName" label='用户名'>
                            <Input onPressEnter={submit} />
                        </Form.Item>
                    </Col>
                    <Col className='w-[100%]' lg={24} xl={6} >
                        <Form.Item name="nickName" label='昵称'>
                            <Input onPressEnter={submit} />
                        </Form.Item>
                    </Col>
                    <Col className='w-[100%]' lg={24} xl={6}>
                        <Form.Item name="phone" label='手机号'>
                            <Input onPressEnter={submit} />
                        </Form.Item>
                    </Col>
                    <Col className='w-[100%]' lg={24} xl={6}>
                        <Space>
                            <Button onClick={submit} type='primary'>搜索</Button>
                            <Button onClick={reset}>清除</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>

            <div className="mt-[16px] dark:bg-[rgb(33,41,70)] bg-white rounded-lg px-[12px]">
                <div className='py-[16px] '>
                    <Button onClick={openForm} type='primary' size='large' icon={<PlusOutlined />}>新增</Button>
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
                title={editData ? '编辑' : '新建'}
                open={formOpen}
                onOk={() => {
                    formRef.current?.submit();
                }}
                destroyOnClose
                width={640}
                zIndex={1001}
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