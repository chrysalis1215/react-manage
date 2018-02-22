import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'
import SearchByBoothName from '../../common/form/select/searchByBoothName'

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
            let data = getFieldsValue();
            data.type = 0;
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

        <FormItem label='分类名称' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
                {
                    required: true,
                    message: '分类名称未填写'
                }
            ]
        })(<Input />)}
        </FormItem>
        <FormItem label='关联商家' hasFeedback {...formItemLayout}>
          {getFieldDecorator('boothName', {
            initialValue: item.boothName,
            rules: [
                {
                    required: true,
                    message: '关联商家未填写'
                }
            ]
        })(<SearchByBoothName />)}
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
