import React, { PropTypes } from 'react';
import {Form, Input, Button, Row, Col, Select, InputNumber} from 'antd';
import Enable from '../../common/form/radio/enable';
import styles from './boothSearch.less'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[fieldsError]);
}

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 }
};

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
                        validateStatus={numError ? 'error': ''} label="编号">
                        {
                            getFieldDecorator('productId', {
                                rules: [{message: 'please input your num'}]
                            })(
                                <Input className={styles.num} type="number" />
                            )
                        }
                    </FormItem>
                    <FormItem label="商品名称">
                        {
                            getFieldDecorator('productName')(
                                <Input className={styles.name} />
                            )
                        }
                    </FormItem>
                    <FormItem label="库存警报">
                        {
                            getFieldDecorator('stockAlarm')(
                                <Enable/>
                            )
                        }
                    </FormItem>
                    <FormItem label="已关联商品">
                        {
                            getFieldDecorator('productBelong', {initialValue: 1})(
                                <Enable />
                            )
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

const productSearch  = Form.create({})(ProductSearch);

export default productSearch;
