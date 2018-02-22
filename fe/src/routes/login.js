import React, {PropTypes} from 'react'
import { Button, Row, Form, Input, Alert } from 'antd'
import { config } from '../utils'
import styles from './login.less'

const FormItem = Form.Item

const login = ({
    loginButtonLoading,
    validate,
    validated,
    validateMsg,
    onOk,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll
    }
}) => {
    function handleOk () {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            onOk(values)
        })
    }

    return (
        <div className={styles.form}>
            <div className={styles.logo}>
                <img src={config.logoSrc} />
                <span>零售库存管理系统 </span>
            </div>
            <form>
                <FormItem hasFeedback validateStatus={validated ? (validate ? 'success': 'error') : undefined}>
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                required: true,
                                message: '请填写手机号'
                            }
                        ]
                    })(<Input size='large' onPressEnter={handleOk} placeholder='手机号' />)}
                </FormItem>
                <FormItem hasFeedback validateStatus={validated ? (validate ? 'success': 'error') : undefined}>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请填写密码'
                            }
                        ]
                    })(<Input size='large' type="password" onPressEnter={handleOk} placeholder='密码' />)}
                </FormItem>
                {
                    validated ? (validate ? '' : <Row><Alert message={validateMsg} type="error" showIcon closable /></Row>) : ''
                }
                <Row>
                    <Button type='primary' size='large' onClick={handleOk} loading={loginButtonLoading}>
                        登录
                    </Button>
                </Row>
            </form>
        </div>
    )
}

login.propTypes = {
    form: PropTypes.object,
    loginButtonLoading: PropTypes.bool,
    onOk: PropTypes.func
}

export default Form.create()(login)
