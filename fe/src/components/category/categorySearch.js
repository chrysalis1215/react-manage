import React, { PropTypes } from 'react';
import {Form, Input, Button, Row, Col, Select, InputNumber} from 'antd';
import styles from './boothSearch.less'

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
        let a = this.props.form.getFieldsValue();
        // console.log(a);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('recevie values of form: ', values);
            }
        })
    } 
    
    handleReset = () => {
        this.props.form.resetFields();
    }

    handleAdd = this.props.onAdd

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        let numError = '';
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <Row className={styles.row}>
                    <FormItem
                    validateStatus={numError ? 'error': ''} label="编号">
                        {
                            getFieldDecorator('num', {
                            rules: [{message: 'please input your num'}]
                        })(
                            <Input className={styles.num} type="number" />
                        )
                    }
                </FormItem>
                <FormItem    label="分类名称">
                    {getFieldDecorator('name')(
                        <Input className={styles.name} />
                    )}
                </FormItem>
                </Row>
                <Row style={{margin: 20}}>
                <Col offset={18} style={{textAlgin: 'right'}}>
                    <Button
                    type="primary"
                    htmlType="submit">
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
