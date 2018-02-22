import React, { PropTypes } from 'react';
import {Form, Input, Button, Cascader, Card, Tag, Row, Col} from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 11 }
};

const cityLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12}
}

const disableCompent = {disabled: false}

class Gps extends React.Component{
    constructor(props) { 
        super(props)
    }

    handleSave = (e) => {
        // TODO 获取默认值修改
        let data = this.props.form.getFieldsValue();
        let body = Object.assign({}, data);
        this.props.dispatch({
            type: 'boothDetail/modify',
            payload: {
                data: body,
                type: 'addressInfo'
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {
            city, 
            province, 
            contactPhone, 
            district, 
            longitude, 
            mapAddress, 
            contactTel, 
            contactName, 
            latitude, 
            displayAddress
        } = this.props.parentState.addressInfo;

        return (
            <Form vertical onSubmit={this.handleSubmit}>
                {/*<FormItem {...formItemLayout} label="归属城市">
                    {
                        getFieldDecorator('city', {initialValue: [province, city, district]})(
                            <Cascader 
                                {...disableCompent} 
                                options={options} 
                                onChange={this.handleChange} 
                            />
                    )}
                </FormItem>*/}
                <Row>
                <Col span={6}>
                    <FormItem  label="归属城市"  {...cityLayout}>
                        {
                            getFieldDecorator('province', {initialValue: province})(
                                 
                                <Input />
                        )}
                    </FormItem>
                </Col>
                <Col span={4}>
                <FormItem>
                    {
                        getFieldDecorator('city', {initialValue: city})(
                             
                            <Input />
                    )}
                </FormItem>
                </Col>
                <Col span={4}>
                <FormItem>
                    {
                        getFieldDecorator('district', {initialValue: district})(
                             
                            <Input />
                    )}
                </FormItem>
                </Col>
                </Row>
                <FormItem {...formItemLayout} label="书面地址">
                    {
                        getFieldDecorator('mapAddress',  {initialValue: mapAddress})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="显示地址">
                    {
                        getFieldDecorator('displayAddress',  {initialValue: displayAddress})(
                            <Input  {...disableCompent} />
                        ) 
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="联系人姓名">
                    {
                        getFieldDecorator('contactName',  {initialValue: contactName})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="联系人手机号">
                    {
                        getFieldDecorator('contactPhone',  {initialValue: contactPhone})(
                            <Input  type="phone" />
                        )
                  }
                </FormItem>
                <FormItem {...formItemLayout} label="联系人座机号">
                    {
                        getFieldDecorator('contactTel',  {initialValue: contactTel})(
                            <Input  type="phone" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="地图锚点">
                    {
                        getFieldDecorator('longitude', {initialValue: longitude})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="地图锚点">
                    {
                        getFieldDecorator('latitude', {initialValue: latitude})(
                            <Input />
                        )
                    }
                </FormItem>


                <Button
                    type="primary"
                    onClick={this.handleSave}>
                    保存
                </Button>
            </Form>
        );
    }
}

const gps  = Form.create()(Gps);

export default gps;
