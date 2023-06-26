import { t } from "@/utils/i18n";
import { Form, FormInstance, Input, Radio } from "antd";
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useMemo } from "react";
import userService, { User } from "./service";
import { useRequest } from "@/hooks/use-request";
import { antdUtils } from "@/utils/antd";
import Avatar from './avatar';
import EmailInput from "./email-input";
interface PropsType {
    open: boolean;
    editData?: any;
    onSave: () => void;
    setSaveLoading: (loading: boolean) => void;
}

const NewAndEditForm: ForwardRefRenderFunction<FormInstance, PropsType> = ({
    editData,
    onSave,
    setSaveLoading,
}, ref) => {
    const [form] = Form.useForm();
    const { runAsync: updateUser } = useRequest(userService.updateUser, { manual: true });
    const { runAsync: addUser } = useRequest(userService.addUser, { manual: true });

    useImperativeHandle(ref, () => form, [form])

    const finishHandle = async (values: User) => {
        setSaveLoading(true);

        if (values?.avatar?.[0]?.response?.id) {
            values.avatar = values?.avatar?.[0]?.response?.id;
        } else {
            values.avatar = null;
        }

        if (editData) {
            const [error] = await updateUser({ ...editData, ...values });
            if (error) return setSaveLoading(false)
            antdUtils.message?.success(t("cEriMGHB" /* 更新成功！ */));
        } else {
            const [error] = await addUser(values);
            if (error) return setSaveLoading(false)
            antdUtils.message?.success(t("HmOqbLKP" /* 创建成功！ */));
        }
        onSave();
        setSaveLoading(false);
    }

    const initialValues = useMemo(() => {
        if (editData) {
            return {
                ...editData,
                avatar: editData.avatarEntity ? [{
                    uid: '-1',
                    name: editData.avatarEntity.fileName,
                    states: 'done',
                    url: editData.avatarEntity.filePath,
                    response: {
                        id: editData.avatarEntity.id,
                    },
                }] : []
            }
        }
    }, [editData]);

    return (
        <Form
            labelCol={{ sm: { span: 24 }, md: { span: 5 } }}
            wrapperCol={{ sm: { span: 24 }, md: { span: 16 } }}
            form={form}
            onFinish={finishHandle}
            initialValues={initialValues || { sex: 1 }}
        >
            <Form.Item label='头像' name="avatar">
                <Avatar />
            </Form.Item>

            <Form.Item
                label={t("gGGfiMXg" /* 用户名 */)}
                name="userName"
                rules={[{
                    required: true,
                    message: t("mHAMIhPB" /* 不能为空 */),
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={t("rNVhMjzL" /* 昵称 */)}
                name="nickName"
                rules={[{
                    required: true,
                    message: t("gOWhRHPa" /* 不能为空 */),
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={t("Ywamboto" /* 手机号 */)}
                name="phone"
                rules={[{
                    required: true,
                    message: t("eQxPVurG" /* 不能为空 */),
                }, {
                    pattern: /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[89])\d{8}$/,
                    message: t("KlmqOgfr" /* 手机号格式不正确 */),
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={t("YsgvxeAf" /* 邮箱 */)}
                name="email"
                rules={[{
                    required: true,
                    message: t("cRMNYqkz" /* 不能为空 */),
                }, {
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: t("vahfSEha" /* 邮箱格式不正确 */),
                }]}
            >
                <EmailInput disabled={!!editData} />
            </Form.Item>

            {!editData && (
                <Form.Item
                    name="emailCaptcha"
                    label="邮箱验证码"
                >
                    <Input />
                </Form.Item>
            )}
            <Form.Item
                label={t("GaiAJsLv" /* 性别 */)}
                name="sex"
            // initialValue={1}
            >
                <Radio.Group>
                    <Radio value={1}>{t("zoUCEptE" /* 男 */)}</Radio>
                    <Radio value={0}>{t("ZtDGfcTQ" /* 女 */)}</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}

export default forwardRef(NewAndEditForm)