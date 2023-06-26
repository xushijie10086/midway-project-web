/*
 * @Author: xushijie xushijie@yunlizhihui.com
 * @Date: 2023-06-26 10:54:21
 * @LastEditors: xushijie xushijie@yunlizhihui.com
 * @LastEditTime: 2023-06-26 11:06:20
 * @FilePath: \midway-project-web\src\pages\user\email-input.tsx
 * @Description: 描述一下
 * 
 */

import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Button, Input, Form } from 'antd'
import { useRequest } from "@/hooks/use-request";
import userService from "./service";
interface PropsType {
    value?: string;
    onChange?: ChangeEventHandler,
    disabled?: boolean
}

const EmailInput: React.FC<PropsType> = ({
    value,
    onChange,
    disabled
}) => {

    const [timer, setTimer] = useState<number>(0)
    const form = Form.useFormInstance();
    const intervalTimerRef = useRef<number>();

    const { runAsync } = useRequest(userService.sendEmailCaptcha, { manual: true });

    const sendEmailCaptcha = async () => {
        const value = await form.validateFields(['email'])
        setTimer(180)
        await runAsync(value.email)

        intervalTimerRef.current = window.setInterval(() => {
            setTimer(prev => {
                if (prev - 1 === 0) {
                    window.clearInterval(intervalTimerRef.current);
                }
                return prev - 1;
            });
        }, 1000)
    }

    useEffect(() => {
        return () => {
            if (intervalTimerRef.current) {
                window.clearInterval(intervalTimerRef.current);
            }
        }
    }, [])

    return (
        <div className="flex items-center gap-[12px]">

            <Input disabled={disabled} onChange={onChange} value={value} className="flex-1" />
            {
                !disabled && (
                    <Button disabled={timer > 0} onClick={sendEmailCaptcha}>
                        {timer > 0 ? `重新发送(${timer}秒)` : '发送邮箱验证码'}
                    </Button>
                )
            }
        </div>
    )
}

export default EmailInput