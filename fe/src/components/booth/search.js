import React, { PropTypes } from 'react';
import {Form, Input, Button, Row, Col, Select, InputNumber, Radio} from 'antd';
import Enable from '../common/form/radio/enable'
import BusinessScope from '../common/form/select/businessScope'
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

class BoothSearch extends React.Component{
    componentDidMount() {
        this.props.form.validateFields();
    }
  
    handleSubmit = (e) => {
        let data = this.props.form.getFieldsValue();
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
                    validateStatus={numError ? 'error': ''} label="关键字">
                    {
                        getFieldDecorator('searchKey')
                        (
                            <Input className={styles.num} />
                        )
                    }
                </FormItem>
                <FormItem
                    validateStatus={numError ? 'error': ''} label="编号">
                    {
                        getFieldDecorator('id')
                        (
                            <Input className={styles.num} type="number"/>
                        )
                    }
                </FormItem>
                <FormItem label="商家名称">
                    {
                        getFieldDecorator('name')
                        (
                            <Input className={styles.name}  />
                        )
                    }
                </FormItem>
                <FormItem label="商家类型">
                    {
                        getFieldDecorator('businessScope')
                        (
                            <BusinessScope style={{width: 100}}/>
                        ) 
                    }
                </FormItem>
                <FormItem  label="启用">
                    {
                        getFieldDecorator('enable')(
                            <Enable style={{width: 50}}/>
                        )
                    }
                  </FormItem>
                <FormItem label="分类数量">
                    {
                        getFieldDecorator('categoryNumMin')(
                            <InputNumber className={styles.numLimit}  min={0}/>  
                        )
                    } 至
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('categoryNumMax')(
                            <InputNumber className={styles.numLimit}  min={0} />
                        )
                    }   
                </FormItem>
                <FormItem label="产品数量">
                    {
                        getFieldDecorator('productNumMin')(
                            <InputNumber className={styles.numLimit}  min={0}  />
                        )
                    } 至
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('productNumMax')(
                            <InputNumber className={styles.numLimit} min={0}/> 
                        ) 
                    }
                </FormItem>
                <FormItem label="优先级">
                    {
                        getFieldDecorator('priorityMin')(
                            <InputNumber className={styles.numLimit}  min={0}  />
                        )
                    } 至
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('priorityMax')(
                            <InputNumber className={styles.numLimit} min={0}/> 
                        ) 
                    }
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
      
                <Button
                    style={{marginLeft: 8}}
                    onClick={this.handleAdd}>
                    添加
                </Button>
            </Row>
            <Row style={{margin: 20}}>
                <Col offset={18} style={{textAlgin: 'right'}} />
            </Row>
          </Form>
      );
    }
}

const boothSearch  = Form.create({})(BoothSearch);

export default boothSearch;
