import React, { PropTypes } from 'react';
import {Form, Input, Button, Radio, Select, InputNumber, Row, Col, Tag} from 'antd';
import Enable from '../../common/form/radio/enable';
import BusinessArea from '../../common/form/select/businessArea';
import DistributionCenter from '../../common/form/select/distributionCenter';
import BusinessScope from '../../common/form/select/multipleBusinessScope';

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

        let businessArea = [];
        data.businessArea && businessArea.push(+data.businessArea);
        body.businessArea = businessArea;
        body.businessScope = data.businessScope || [];

        this.props.dispatch({
            type: 'boothDetail/modify',
            payload: {
                data: body,
                type: 'baseInfo'
            }
        });
    }
  
    render() {
        const {getFieldDecorator} = this.props.form;
        const {
            id,
            name,
            authPhone, 
            enable, 
            priority, 
            businessScope, 
            businessArea, 
            distributionCenter, 
            type, 
            simpleDescription, 
            detailDescription, 
            searchKey, 
            layout,
            rnBoothId,
        } = this.props.parentState.baseInfo;
        
        const searchKeyArray = (searchKey && searchKey.split(';')) || null;
        return (
            <Form vertical onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="商家编号">
                    {id}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{rnBoothId}
                </FormItem>
                <FormItem {...formItemLayout} label="商家名称">
                    {
                        getFieldDecorator('name', {initialValue: name})(
                            <Input  {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="店主手机号">
                    {
                        getFieldDecorator('authPhone',  {initialValue: authPhone})(
                            <Input  type="phone" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="启用">
                    {
                        getFieldDecorator('enable', {initialValue: enable})(
                            <Enable />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="优先级">
                    {
                        getFieldDecorator('priority',  {initialValue: priority})(
                            <Input  {...disableCompent} />
                        ) 
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="销售区域">
                    {
                        getFieldDecorator('businessArea', {initialValue: businessArea})(
                            <BusinessArea key="businessArea" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="配送中心">
                    {
                        getFieldDecorator('distributionCenter', {initialValue: (distributionCenter)})(
                            <DistributionCenter key="distributionCenter" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="商家类型">
                    {
                        getFieldDecorator('businessScope', {initialValue: businessScope})(
                            <BusinessScope multiple key="businessScope" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="简单描述">
                    {
                        getFieldDecorator('simpleDescription', {initialValue: simpleDescription})(
                            <Input type="textarea" autosize={true} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="详细描述" >
                    {
                        getFieldDecorator('detailDescription',  {initialValue: detailDescription})(
                            <Input type="textarea" autosize={true} />
                        )
                    }   
                </FormItem>
                <FormItem  {...formItemLayout}label="搜索关键字">
                    {
                        getFieldDecorator('searchKey',  {initialValue: searchKey})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout}label="展示界面关键字">
                    {
                        getFieldDecorator('layout',  {initialValue: layout})(
                            <Select disabled={true}>
                                <Select.Option value="全部"></Select.Option>
                            </Select>
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
