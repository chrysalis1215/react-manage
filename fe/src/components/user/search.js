import React, { PropTypes } from 'react';
import {Form, TimePicker, DatePicker, Input, Button, Row, Col, Select, InputNumber, Radio} from 'antd';
const Option = Select.Option;
import Enable from '../common/form/select/enable'
import BusinessArea from '../common/form/select/businessArea'
import BusinessType from '../common/form/select/businessType'
import DeliverLine from '../common/form/select/deliveryLine'
import styles from './search.less'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[fieldsError]);
}


const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 }
};

class UserSearch extends React.Component{
    componentDidMount() {
      this.props.form.validateFields();
    }
  
    handleSubmit = (e) => {
      // e.preventDefault();
      let data = this.props.form.getFieldsValue();
      // 这个破框架不支持路由参数用多级对象，所以所有参数必须平级
      if (data.createTimeStart) {
          data.createTimeStart = data.createTimeStart.format('YYYY-MM-DD HH:mm');
      }
      if (data.createTimeEnd) {
          data.createTimeEnd = data.createTimeEnd.format('YYYY-MM-DD HH:mm');
      }
      if (data.receivingTimeStart) {
          data.receivingTimeStart = data.receivingTimeStart.format('HH:mm');
      }
      if (data.receivingTimeEnd) {
          data.receivingTimeEnd = data.receivingTimeEnd.format('HH:mm');
      }
      // console.log(data);
      this.props.onSearch(data);
    } 
    
    handleReset = () => {
      this.props.form.resetFields();
      this.props.onSearch({});
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
                    validateStatus={numError ? 'error': ''} label="手机">
                    {
                        getFieldDecorator('phone', {
                            rules: [{message: '请输入手机号'}]
                        })
                        (
                            <Input className={styles.num}/>
                        )
                    }
                </FormItem>
                <FormItem
                    validateStatus={numError ? 'error': ''} label="用户名">
                    {
                        getFieldDecorator('name', {
                            rules: [{message: '请输入用户名'}]
                        })
                        (
                            <Input className={styles.num}/>
                        )
                    }
                </FormItem>
                <FormItem label="饭店类型">
                    {
                        getFieldDecorator('businessType')
                        (
                            <BusinessType style={{width: 80}} />
                        )
                    }
                </FormItem>
                <FormItem label="消费等级">
                    {
                        getFieldDecorator('consumptionLevel')
                        (
                            <Select placeholder='全部' style={{ width: 60 }}>
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem  label="注册日期">
                  {getFieldDecorator('createTimeStart')(
                          <DatePicker/>
                   )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('createTimeEnd')(
                          <DatePicker/>
                   )}
                </FormItem>
                <FormItem label="配送区域">
                  {getFieldDecorator('businessArea')(
                        <BusinessArea style={{width: 100}}/>
                    )}
                </FormItem>
                <FormItem label="配送路线">
                  {getFieldDecorator('deliveryLine')(
                        <DeliverLine style={{width: 250}} />
                    )}
                </FormItem>
                <FormItem label="收货时间">
                   {getFieldDecorator('receivingTimeStart')(
                       <TimePicker format="HH:mm"/>
                    )}
                    <span> 至</span>
                </FormItem>
                <FormItem>
                   {getFieldDecorator('receivingTimeEnd')(
                       <TimePicker format="HH:mm"/>
                    )}
                </FormItem>
                <FormItem label="投诉建议">
                    {getFieldDecorator('ComplaintUntreated')(
                      <Input placeholder="未处理" style={{width: 60}} disabled/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('ComplaintTotal')(
                      <Input placeholder="总数" style={{width: 60}}  disabled/>
                    )}
                </FormItem>
                <FormItem label="客服经理">
                  {getFieldDecorator('recommendName')(
                    <Input/>
                  )}
                </FormItem>
                <FormItem label="消费总额">
                  {getFieldDecorator('totalExpenseMin')(
                    <InputNumber className={styles.numLimit}  min={0}  />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('totalExpenseMax')(
                    <InputNumber className={styles.numLimit}  min={0}  />
                  )}
                </FormItem>
  
            </Row>

            <Row style={{margin: 20}}>
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
      
                <Button
                 style={{marginLeft: 8}}
                 onClick={this.handleAdd}>
                  添加
                </Button>
            </Row>
            <Row style={{margin: 20}}>

            <Col offset={18} style={{textAlgin: 'right'}}>
              
              </Col>
            </Row>
          </Form>
      );
    }
}

const userSearch  = Form.create({})(UserSearch);

export default userSearch;
