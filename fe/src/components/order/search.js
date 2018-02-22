import React, { PropTypes } from 'react';
import {DatePicker, Form, Input, Button, Row, Col, Select, InputNumber, Radio} from 'antd';
import OrderStatus from './orderStatus';
import DeliverLine from '../common/form/select/deliveryLine';
import moment from 'moment';
import {dateFormat} from '../../utils/config';
import styles from './search.less';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[fieldsError]);
}

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 }
};

class Search extends React.Component{
    componentDidMount() {
        this.props.form.validateFields();
    }
  
    handleSubmit = (e) => {
        let data = this.props.form.getFieldsValue();
        if (data.createTimeMin) {
            data.createTimeMin = data.createTimeMin.format(dateFormat);
        }
        if (data.createTimeMax) {
            data.createTimeMax = data.createTimeMax.format(dateFormat);
        }
        this.props.onSearch(data);
    } 
    
    handleReset = () => {
        this.props.form.resetFields();
    }
  
    handleAdd = () => {
        this.props.onAdd();
    }
  
    render() {
      const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
      let numError = '';
      return (
          <Form inline>
            <Row className={styles.row}>
                <FormItem
                    validateStatus={numError ? 'error': ''} label='商品名称'>
                    {
                        getFieldDecorator('productName')
                        (
                            <Input className={styles.num} />
                        )
                    }
                </FormItem>
                <FormItem
                    validateStatus={numError ? 'error': ''} label="订单号">
                    {
                        getFieldDecorator('orderNumber')
                        (
                            <InputNumber className={styles.num} />
                        )
                    }
                </FormItem>
                <FormItem
                    validateStatus={numError ? 'error': ''} label="手机">
                    {
                        getFieldDecorator('userPhone')
                        (
                            <InputNumber className={styles.num} />
                        )
                    }
                </FormItem>
                <FormItem validateStatus={numError ? 'error': ''} label="用户名">
                    {
                        getFieldDecorator('userName')
                        (
                            <Input className={styles.name}  />
                        )
                    }
                </FormItem>
                <FormItem label="订单日期">
                    {
                        getFieldDecorator('createTimeMin')
                        (
                            <DatePicker
                                showTime
                                allowClear={true}
                                format={dateFormat} />
                        ) 
                    } 至
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('createTimeMax')(
                            <DatePicker
                                showTime
                                allowClear={true}
                                format={dateFormat} />
                        )
                    }
                  </FormItem>
                <FormItem label="订单状态">
                    <div className={styles.orderStatus}>
                    {
                        getFieldDecorator('orderStatus')(
                            <OrderStatus />
                        )
                    }
                    </div>
                </FormItem>
                <FormItem label="配送路线">
                    <div className={styles.deliverLine}>
                    {
                        getFieldDecorator('deliveryLine')(
                            <DeliverLine />
                        )
                    }   
                    </div>
                </FormItem>
                <Button
                    type="primary"
                    onClick={this.handleSubmit}>
                    搜索
                </Button>
      
                <Button
                    style={{marginLeft: 8}}
                    onClick={this.handleReset}>
                    重置
                </Button>
            </Row>
            <Row style={{margin: 20}}>
                <Col offset={18} style={{textAlgin: 'right'}} />
            </Row>
          </Form>
      );
    }
}

const search  = Form.create({})(Search);

export default search;
