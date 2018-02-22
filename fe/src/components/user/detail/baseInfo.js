import React, { PropTypes } from 'react';
import {Form, Input, Button, Radio, Select, InputNumber, DatePicker, Row, Col} from 'antd';
import Enable from '../../common/form/radio/enable';
import BusinessArea from '../../common/form/select/businessArea';
import DistributionCenter from '../../common/form/select/distributionCenter';
import BusinessScope from '../../common/form/select/businessScope';
import BusinessType from '../../common/form/select/businessType';
import Flavor from '../../common/form/select/flavor';
import DeliveryLine from '../../common/form/select/deliveryLine'

const cityLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 }
};

const disableCompent = {disabled: false}

class BasicInfo extends React.Component{
    constructor(props) {
        super(props)
    }

    handleModify = (e) => {
        let data = this.props.form.getFieldsValue();
        let body = Object.assign({}, data);

        // let businessArea = [];
        // data.businessArea && businessArea.push(+data.businessArea);
        // body.businessArea = businessArea;
        body.id = this.props.parentState.baseInfo.id;
        body.memberGroupList = this.props.parentState.baseInfo.memberGroupList;

        this.props.dispatch({
            type: 'userDetail/modify',
            payload: {
                data: body,
                type: 'baseInfo'
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {
            responsiblePhone,
            receivingTime,
            recommendName,
            contactName,
            contactPhone,
            flavor,
            loginTime,
            city,
            district,
            responsibleName,
            consumptionLevel,
            weChat,
            recommendPercentage,
            businessArea,
            contactAddress,
            createTime,
            responsiblePercentage,
            recommendPhone,
            memberGroupList,
            name,
            deliveryLine,
            area,
            phone,
            billsDue,
            businessType,
            province,
            balance,
            totalActualCredit,
            totalRechargeAmount
        } = this.props.parentState.baseInfo;

        return (
            <Form vertical onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="手机号">
                    {
                        getFieldDecorator('phone',  {initialValue: phone})(
                            <Input  disabled={true} type="phone" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="注册时间">
                    {
                        getFieldDecorator('createTime',  {initialValue: createTime})(
                            <Input  disabled={true} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="登录时间">
                    {
                        getFieldDecorator('loginTime',  {initialValue: loginTime})(
                            <Input  disabled={true} />
                        )
                    }
                </FormItem>

                <FormItem {...formItemLayout} label="未结算用户">
                    {
                        getFieldDecorator('billsDue',  {initialValue: billsDue})(
                            <Enable />
                        )
                    }
                </FormItem>

                <FormItem {...formItemLayout} label="用户名">
                    {
                        getFieldDecorator('name',  {initialValue: name})(
                            <Input  {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="饭店类型">
                    {
                        getFieldDecorator('businessType', {initialValue: (businessType)})(
                            <BusinessType key="businessType" />
                        )
                    }
                </FormItem>

                <FormItem {...formItemLayout} label="主营风味">
                    {
                        getFieldDecorator('flavor', {initialValue: (flavor)})(
                            <Flavor key="flavor" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="经营面积">
                    {
                        getFieldDecorator('area', {initialValue: area})(
                           <Input />
                        )
                    }
                </FormItem>
                <Row>
                <Col span={9}>
                    <FormItem  label="归属城市"  {...cityLayout}>
                        {
                            getFieldDecorator('province', {initialValue: province})(

                                <Input />
                        )}
                    </FormItem>
                </Col>
                <Col span={6}>
                <FormItem>
                    {
                        getFieldDecorator('city', {initialValue: city})(

                            <Input />
                    )}
                </FormItem>
                </Col>
                <Col span={6}>
                <FormItem>
                    {
                        getFieldDecorator('district', {initialValue: district})(

                            <Input />
                    )}
                </FormItem>
                </Col>
                </Row>
                <FormItem {...formItemLayout} label="归属片区">
                    {
                        getFieldDecorator('businessArea',  {initialValue: businessArea})(
                            <BusinessArea />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="收货人姓名">
                    {
                        getFieldDecorator('contactName',  {initialValue: contactName})(
                            <Input  {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="收货人电话">
                    {
                        getFieldDecorator('contactPhone', {initialValue: contactPhone})(
                            <Input  {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="收货人地址">
                    {
                        getFieldDecorator('contactAddress', {initialValue: (contactAddress)})(
                            <Input  {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="收货时间">
                    {
                        getFieldDecorator('receivingTime', {initialValue: receivingTime})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="配送路线">
                    {
                        getFieldDecorator('deliveryLine', {initialValue: deliveryLine})(
                            <DeliveryLine key="deliveryLine" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="推荐人姓名">
                    {
                        getFieldDecorator('recommendName',  {initialValue: recommendName})(
                            <Input  disabled={true} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="推荐人电话">
                    {
                        getFieldDecorator('responsiblePhone', {initialValue: responsiblePhone})(
                            <Input  disabled={true} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="推荐人提成比例" >
                    {
                        getFieldDecorator('recommendPercentage',  {initialValue: recommendPercentage})(
                            <Input type="number" addonAfter="%" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="负责人姓名">
                    {
                        getFieldDecorator('responsibleName',  {initialValue: responsibleName})(
                            <Input  disabled={true} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="负责人电话">
                    {
                        getFieldDecorator('responsiblePhone', {initialValue: responsiblePhone})(
                            <Input  disabled={true} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="负责人提成比例" >
                    {
                        getFieldDecorator('responsiblePercentage',  {initialValue: responsiblePercentage})(
                            <Input type="number" addonAfter="%"/>
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="客户微信号" >
                    {
                        getFieldDecorator('weChat',  {initialValue: weChat})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="用户等级" >
                    {
                        getFieldDecorator('consumptionLevel',  {initialValue: consumptionLevel})(
                            <Select placeholder='全部' style={{ width: 60 }}>
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="充值卡总赠送值">
                    {
                        getFieldDecorator('totalActualCredit',  {initialValue: totalActualCredit})(
                            <Input  disabled={true}  />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="充值卡总充值">
                    {
                        getFieldDecorator('totalRechargeAmount',  {initialValue: totalRechargeAmount})(
                            <Input  disabled={true} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="钱包余额">
                    {
                        getFieldDecorator('balance',  {initialValue: balance})(
                            <Input  disabled={true} />
                        )
                    }
                </FormItem>

                <Button
                    type="primary"
                    onClick={this.handleModify}>
                    保存
                </Button>
            </Form>
        );
    }
}

const basicInfo  = Form.create({})(BasicInfo);

export default basicInfo;
