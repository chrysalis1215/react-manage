import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'
import SearchByBoothName from '../common/form/select/searchByBoothName'
import SearchByCategoryName from '../common/form/select/searchByCategoryName'
const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
}

const modal = ({visible, type, currentItem = {}, onOk, onCancel, form: {getFieldDecorator, validateFields, getFieldsValue, getFieldValue}}) => {
    const item = type === 'create' ? {} : currentItem;
    function handleOk() {
        validateFields((errors) => {
            if (errors) {
                return
            }
            const data = {
                ...getFieldsValue()
            }
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
                <FormItem label='充值卡名称' hasFeedback {...formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [
                        {
                            required: true,
                            message: '充值卡名称未填写'
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
