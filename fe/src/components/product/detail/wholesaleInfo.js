import React, { PropTypes } from 'react';
import {hostname} from '../../../utils/hostname'
import MemberGroupPrice from '../../common/form/input/MemberGroupPrice'
import Img from './img' 

import moment from 'moment';
import {dateFormat} from '../../../utils/config'

import Enable from '../../common/form/radio/enable';
import StockUnit from '../../common/form/select/StockUnit';
import {DatePicker,Form, Input, Button, Radio, Select, InputNumber, Card, Tag, Row, Col} from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 }
};

const disableCompent = {disabled: false}

class WholeSaleInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    handleImageChange= (images) => {
        this.setState({
            images: images
        })
    }

    handleSave = () => {
        let body = {};
        let data = this.props.form.getFieldsValue();
        body = data;
        body.promotionalPriceEndUtc =  data.promotionalPriceEndUtc.format(dateFormat);
        body.promotionalPriceStartUtc = data.promotionalPriceStartUtc.format(dateFormat);
        body.images = this.state.images;
        this.props.dispatch({
            type: 'productDetail/modify',
            payload: {
               type: 'wholesaleInfo',
               data:  body
            }
        });
    }

    appendName = ({key, label}) => {
        this.props.form.setFieldsValue({
            name: this.props.form.getFieldValue('name') + label
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const start = this.props.parentState.wholesaleInfo || {};

        const selectAfterName = (
            <Select onSelect={this.appendName} 
                placeholder="选择预置单位" 
                allowClear 
                labelInValue 
                style={{width: 100}}>

                <Option value="1">整箱</Option>
                <Option value="2">整包</Option>
                <Option value="3">整桶</Option>
                <Option value="4">整捆</Option>
                <Option value="5">整框</Option>
            </Select>);
    
        return (
            <Form vertical onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="整件名称">
                    {
                        getFieldDecorator('name', {initialValue: start.name})(
                            <Input {...disableCompent} addonAfter={selectAfterName} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="启用状态">
                    {
                        getFieldDecorator('enable', {initialValue: start.enable})(
                            <Enable />
                        )
                    }
                </FormItem>

                <FormItem {...formItemLayout} label="实际销量">
                    {
                        getFieldDecorator('actualSales', {initialValue: start.actualSales})(
                            <Input disabled={true} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="虚拟销量">
                    {
                        getFieldDecorator('virtualSales', {initialValue: start.virtualSales})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="默认销售价格">
                    {
                        getFieldDecorator('price', {initialValue: start.price})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="市场均价">
                    {
                        getFieldDecorator('marketPrice', {initialValue: start.marketPrice})(
                            <Input />
                        )
                    }
                </FormItem>
                    {
                        getFieldDecorator('memberGroupPrice', {initialValue: start.memberGroupPrice })(
                            <MemberGroupPrice />
                        )
                    }
                <FormItem {...formItemLayout} label="特价">
                    {
                        getFieldDecorator('promotionalPrice', {initialValue: start.promotionalPrice})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="特价开始日期">
                    {
                        getFieldDecorator('promotionalPriceStartUtc', {initialValue: moment(start.promotionalPriceStartUtc, dateFormat) })(
                            <DatePicker
                                size="large"
                                showTime
                                allowClear={false}
                                format={dateFormat}
                                placeholder="开始时间" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="特价结束日期">
                    {
                        getFieldDecorator('promotionalPriceEndUtc', {initialValue: moment(start.promotionalPriceEndUtc, dateFormat)})(
                            <DatePicker
                                showTime
                                allowClear={false}
                                format={dateFormat}
                                placeholder="开始时间" />

                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="单次最低购买量">
                    {
                        getFieldDecorator('minBuyNum', {initialValue: start.minBuyNum})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="单日最大购买量">
                    {
                        getFieldDecorator('maxBuyNumPerDay', {initialValue: start.maxBuyNumPerDay})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="最小单元销售">
                    {
                        getFieldDecorator('minUnitSelling', {initialValue: start.minUnitSelling})(
                            <Enable />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="最小单元数量">
                    {
                        getFieldDecorator('minUnitNum', {initialValue: start.minUnitNum})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="单元体积">
                    {
                        getFieldDecorator('unitVolume', {initialValue: start.unitVolume})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="单元倍加比例">
                    {
                        getFieldDecorator('unitVolumeMultiple', {initialValue: +start.unitVolumeMultiple})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="整件产品规格">
                    {
                        getFieldDecorator('stockMultiple',  {initialValue: start.stockMultiple})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="整件包装单位">
                    {
                        getFieldDecorator('stockUnit',  {initialValue: start.stockUnit})(
                            <StockUnit />
                        )
                    }
                </FormItem>
              <Row>
                <Col span={3}>图片</Col>
                <Col span={18}>
                    <Img images={this.props.parentState.wholesaleInfo.images}  handleImageChange={this.handleImageChange} />
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

export default Form.create()(WholeSaleInfo);
