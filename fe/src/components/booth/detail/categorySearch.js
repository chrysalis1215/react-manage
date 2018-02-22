import React, { PropTypes } from 'react';
import {Form, Input, Button, Row, Col, Select, InputNumber} from 'antd';
import styles from '../search.less'
const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[fieldsError]);
}

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 }
};

class CategorySearch extends React.Component{
    componentDidMount() {
        this.props.form.validateFields();
    }
  
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('recevie values of form: ', values);
            } else {
                this.props.onSearch(values)
            }
        })
    } 
    
    handleReset = () => {
        this.props.form.resetFields();
    }

  
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        let numError = '';
        return (
              <Form inline>
                  <Row className={styles.row}>
                      <FormItem
                          validateStatus={numError ? 'error': ''} label="编号">
                          {
                              getFieldDecorator('categoryId', {
                                  rules: [{message: 'please input your num'}]
                              })(<Input className={styles.num} type="number" />)
                          }
                      </FormItem>
                  <FormItem  label="分类名称">
                      {
                          getFieldDecorator('categoryName')(<Input className={styles.name} />)
                      }
                  </FormItem>
                  </Row>
                  <Row style={{margin: 20}}>
                  <Col offset={18} style={{textAlgin: 'right'}}>
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
                    </Col>
                  </Row>
              </Form>
        );
    }
}

const categorySearch  = Form.create({})(CategorySearch);

export default categorySearch;
