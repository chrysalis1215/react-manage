import React, { PropTypes } from 'react';
import {Form, Input, Button, Radio, Select, InputNumber, Card, Tag} from 'antd';
import Enable from '../../common/form/radio/enable';
import BusinessArea from '../../common/form/select/businessArea';
import ProductCategory from '../../common/form/select/productCategory';
import SecondaryCategory from './secondaryCategory';
import StockUnit from '../../common/form/select/StockUnit';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 }
};

const disableCompent = {disabled: false}

class BasicInfo extends React.Component{
    constructor(props) {
        super(props)
    }

    handleSave= () => {
        this.props.dispatch({
            type: 'productDetail/modify',
            payload: {
               type: 'baseInfo',
               data:  this.props.form.getFieldsValue()
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const start = this.props.parentState.baseInfo || {};
        const searchKeyArray = start.searchKey ? start.searchKey.split(';') : [];
        return (
            <Form vertical onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="商品编号">
                    {start.id}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{start.rnProductId}
                </FormItem>
                <FormItem {...formItemLayout} label="商品名称">
                    {
                        getFieldDecorator('name', {initialValue: start.name})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="品牌">
                    {
                        getFieldDecorator('brand', {initialValue: start.brand})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="归属品类">
                    {
                        getFieldDecorator('productClassification', {initialValue: start.productClassification})(
                            <ProductCategory />
                        ) 
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="二级品类">
                    {
                        getFieldDecorator('secondaryClass', {initialValue: start.secondaryClass})(
                            <SecondaryCategory />
                        ) 
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="归属商家">
                    {
                        getFieldDecorator('boothName', {initialValue: start.boothName})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="销售区域">
                    {
                        getFieldDecorator('businessArea', {initialValue: start.businessArea})(
                            <BusinessArea />
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
                <FormItem {...formItemLayout} label="上下架">
                    {
                        getFieldDecorator('selling', {initialValue: start.selling})(
                            <Enable />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="SKU">
                    {
                        getFieldDecorator('sku', {initialValue: start.sku})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>

                <FormItem {...formItemLayout} label="是否称重">
                    {
                        getFieldDecorator('weighing', {initialValue: start.weighing})(
                            <Enable />
                        )
                    }
                </FormItem>

                <FormItem {...formItemLayout} label="优先级">
                    {
                        getFieldDecorator('priority', {initialValue: start.priority})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="关联商品ID">
                    {
                        getFieldDecorator('salesRelateProductId', {initialValue: start.salesRelateProductId})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="库存数量">
                    {
                        getFieldDecorator('stockNum', {initialValue: start.stockNum})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="库存单位">
                    {
                        getFieldDecorator('stockUnit', {initialValue: start.stockUnit})(
                            <StockUnit />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="低库存警告">
                    {
                        getFieldDecorator('minStockAlarmNum', {initialValue: start.minStockAlarmNum})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="简单描述">
                    {
                        getFieldDecorator('simpleDescription', {initialValue: start.simpleDescription})(
                            <Input type="textarea" autosize={true} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="详细描述" >
                    {
                        getFieldDecorator('detailDescription', {initialValue: start.detailDescription})(
                            <Input type="textarea" autosize={true} />
                        )
                    }     
                </FormItem>
                <FormItem {...formItemLayout}label="搜索关键字">
                    {
                        getFieldDecorator('searchKey', {initialValue: start.searchKey})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout}label="展示界面关键字">
                    {
                        getFieldDecorator('layout', {initialValue: start.layout+""})(
                        <Select >
                        </Select>
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

const basicInfo  = Form.create()(BasicInfo);

export default basicInfo;
