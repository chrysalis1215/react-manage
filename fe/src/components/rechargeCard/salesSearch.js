import React, { PropTypes } from 'react';
import {DatePicker, Form, Input, Button, Row, Col, Select, InputNumber, Radio} from 'antd';
import {dateFormat} from '../../utils/config';
import styles from './salesSearch.less';

const FormItem = Form.Item;

class Search extends React.Component{
    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        let data = this.props.form.getFieldsValue();
        if (data.buyTimeMin) {
            data.buyTimeMin = data.buyTimeMin.format(dateFormat);
        }
        if (data.buyTimeMax) {
            data.buyTimeMax = data.buyTimeMax.format(dateFormat);
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
                    validateStatus={numError ? 'error': ''} label='编号'>
                    {
                        getFieldDecorator('id')
                        (
                            <InputNumber className={styles.num} />
                        )
                    }
                </FormItem>
                <FormItem
                    validateStatus={numError ? 'error': ''} label="订单号">
                    {
                        getFieldDecorator('orderId')
                        (
                            <Input className={styles.num} />
                        )
                    }
                </FormItem>
                <FormItem
                    validateStatus={numError ? 'error': ''} label="买家手机号">
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
                        getFieldDecorator('buyTimeMin')
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
                        getFieldDecorator('buyTimeMax')(
                            <DatePicker
                                showTime
                                allowClear={true}
                                format={dateFormat} />
                        )
                    }
                  </FormItem>

            </Row>
              <Row>
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
