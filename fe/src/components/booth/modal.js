import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'
const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
}

const modal = ({visible, type, currentItem = {}, onOk, onCancel, form: {getFieldDecorator, validateFields, getFieldsValue}}) => {
    const item = type === 'create' ? {} : currentItem;
    function handleOk() {
        validateFields((errors) => {
            if (errors) {
                return
            }
            const data = getFieldsValue()
            onOk(data)
        })
    }

    const modalOpts = {
        title: `${type === 'create' ? '新建' : '修改'}`,
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal'
    }

    return (
        <Modal {...modalOpts}>
        <Form horizontal>
        <FormItem label='商家名称：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
                {
                    required: true,
                    message: '商家名称未填写'
                }
            ]
        })(<Input />)}
        </FormItem>
        <FormItem label='手机号：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('authPhone', {
            initialValue: item.authPhone,
            rules: [
                {
                    required: true,
                    message: '商家名称未填写'
                }
            ]
        })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
    )
}

modal.propTypes = {
    visible: PropTypes.any,
    form: PropTypes.object,
    item: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
}

export default Form.create()(modal)
