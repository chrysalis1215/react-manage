import React, { PropTypes } from 'react';
import {Form, Input, Button, Row, Col, Select, InputNumber} from 'antd';
import styles from '../search.less'
import Enable from '../../common/form/radio/enable';

const FormItem = Form.Item;
const Option = Select.Option;

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
        let values = this.props.form.getFieldsValue();
        this.props.onSearch(values)
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
                    <FormItem label="编号">
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
                <FormItem label="分类名称">
                    {
                        getFieldDecorator('categoryName')(
                            <Input className={styles.name} />
                        )
                    }
                </FormItem>
                <FormItem label="库存警报">
                    {
                        getFieldDecorator('stockAlarm', {initialValue: null})(
                            <Enable style={{width: 50}}/>
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
