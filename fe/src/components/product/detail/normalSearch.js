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
// 是否禁用
const selectOptions = [];
for (let i = 0; i < 10; i++) {
  let value = "ww" + i;
  selectOptions.push(
  <Option value={value} key={i}>opt-{i}</Option>
  );
}

class ProductSearch extends React.Component{
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    let a = this.props.form.getFieldsValue();
    this.props.onSearch(a);
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
              })(
                <Input className={styles.num} type="number" />
              )
            }
          </FormItem>
          <FormItem label="分类名称">
            {getFieldDecorator('categoryName')(
                <Input className={styles.name} />
              ) }
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

const productSearch  = Form.create({})(ProductSearch);

export default productSearch;
