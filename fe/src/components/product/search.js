import React, { PropTypes } from 'react';
import {Form, Input, Button, Row, Col, Select, InputNumber, Radio} from 'antd';
import Enable from '../common/form/radio/enable';
import styles from './search.less'
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[fieldsError]);
}

class ProductSearch extends React.Component{
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

    handleAdd = this.props.onAdd;

    render() {
        const {
            getFieldDecorator, 
            getFieldsError, 
            getFieldError, 
            isFieldTouched
        } = this.props.form;
        let numError = '';

        return (
            <Form inline>
                <Row className={styles.row}>
                    <FormItem
                        validateStatus={numError ? 'error': ''} 
                        label="关键字">
                        {
                            getFieldDecorator('keyword', {
                                rules: [{message: 'please input your num'}]
                            })(<Input className={styles.num} />)
                        }
                    </FormItem>

                    <FormItem
                        validateStatus={numError ? 'error': ''} 
                        label="编号">
                        {
                            getFieldDecorator('id', {
                                rules: [{message: 'please input your num'}]
                            })(<Input className={styles.num} />)
                        }
                    </FormItem>

                    <FormItem
                        validateStatus={numError ? 'error': ''} 
                        label="商品名称">
                        {
                            getFieldDecorator('name', {
                                rules: [{message: 'please input your num'}]
                            })(<Input className={styles.num} />)
                        }
                    </FormItem>

                    <FormItem
                        validateStatus={numError ? 'error': ''} 
                        label="关联商家">
                        {
                            getFieldDecorator('boothName', {
                                rules: [{message: 'please input your num'}]
                            })(<Input className={styles.num} />)
                        }
                    </FormItem>

                    <FormItem
                        validateStatus={numError ? 'error': ''} 
                        label="启用">
                        {
                            getFieldDecorator('enable')(
                                <Enable style={{width: 50}} />
                            )
                        }
                    </FormItem>

                    <FormItem
                        validateStatus={numError ? 'error': ''} 
                        label="优先级">
                        {
                            getFieldDecorator('priorityMin', {
                                rules: [{message: 'please input your num'}]
                            })(<Input className={styles.num} />)
                        }
                    </FormItem>

                    <FormItem>
                        {
                            getFieldDecorator('priorityMax', {
                                rules: [{message: 'please input your num'}]
                            })(<Input className={styles.num} />)
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
        
                    <Button
                     style={{marginLeft: 8}}
                     onClick={this.handleAdd}>
                      添加
                    </Button>
                  </Col>
                </Row>
            </Form>
        );
    }
}

const productSearch  = Form.create({})(ProductSearch);

export default productSearch;
