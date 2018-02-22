import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, InputNumber } from 'antd';
import Enable from '../../common/form/radio/enable';
import styles from '../detail/boothSearch.less'

const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[fieldsError]);
}

const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 15
    }
};

class BoothSearch extends React.Component {
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
                    validateStatus={numError ? 'error' : ''} 
                    label="关键字">
                    {
                        getFieldDecorator('searchKey', {
                            rules: [{
                                message: 'please input your num'
                            }]
                        })(
                            <Input className={styles.num} type="searchKey" />
                    )
                }
                </FormItem>

                <FormItem
                    validateStatus={numError ? 'error' : ''} 
                    label="编号">
                    {
                        getFieldDecorator('id', {
                            rules: [{
                                    message: 'please input your num'
                            }]
                        })(
                            <Input className={styles.num} type="number" />
                        )
                    }
                </FormItem>
                <FormItem label="分类名称">
                    {
                        getFieldDecorator('name')(
                            <Input className={styles.name} />
                        )
                    }
                </FormItem>
                <FormItem label="关联商家">
                    {
                        getFieldDecorator('boothName')(
                            <Input className={styles.name} />
                        )
                    }
                </FormItem>
                <FormItem label="启用">
                    {
                        getFieldDecorator('enable')(
                            <Enable />
                        )
                    }
                    </FormItem>
                <FormItem label="产品数量">
                    {
                        getFieldDecorator('productNumMin')(
                            <InputNumber className={styles.numLimit} min={0}/>
                        )
                    } 至
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('productNumMin')(
                            <InputNumber className={styles.numLimit} min={0} />
                        )
                    }     
                </FormItem>
                <FormItem label="优先级">
                    {
                        getFieldDecorator('priorityMin')(
                            <InputNumber className={styles.numLimit} min={0} />
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

const boothSearch = Form.create({})(BoothSearch);

export default boothSearch;
