import React, { PropTypes } from 'react';
import {Form, Input, Button, Row, Col, InputNumber, Card, Tag} from 'antd';
import Enable from '../../common/form/radio/enable';
import Img from './img';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 }
};

const disableCompent = {disabled: false}

class BasicInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    handleImageChange= (images) => {
        this.setState({
            images: images
        });
    }

    handleSave= () => {
        let data = this.props.form.getFieldsValue();
        data.images = this.state.images;
        this.props.dispatch({
            type: 'rechargeCardDetail/modify',
            payload: {
               type: 'baseInfo',
               data:  data
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const start = this.props.parentState.baseInfo || {};
        return (
            <Form vertical onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="充值卡名称">
                    {
                        getFieldDecorator('name', {initialValue: start.name})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="启用状态">
                    {
                        getFieldDecorator('enable', {initialValue: start.enable })(
                            <Enable />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="当前销量">
                    {
                       start.actualSales
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="销售价">
                    {
                        getFieldDecorator('price', {initialValue: start.price})(
                            <InputNumber {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="赠送值">
                    {
                        getFieldDecorator('actualCredit', {initialValue: start.actualCredit})(
                            <InputNumber {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="总销量限制">
                    {
                        getFieldDecorator('salesLimit', {initialValue: start.salesLimit})(
                            <InputNumber {...disableCompent} />
                        )
                    }
                </FormItem>
                <Row>
                    <Col span={3}>图片</Col>
                    <Col span={18}>
                        <Img images={start.images}  handleImageChange={this.handleImageChange} />
                    </Col>
                </Row>

                <Button
                    type="primary"
                    onClick={this.handleSave}>
                    保存
                </Button>
            </Form>
        );
    }
}

const basicInfo  = Form.create()(BasicInfo);

export default basicInfo;
