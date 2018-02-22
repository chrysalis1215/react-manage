import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';
import styles from '../search.less'
import {dateFormat} from '../../../utils/config'

const FormItem = Form.Item;
const {RangePicker} = DatePicker


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


class RechargeSearch extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        let formatData = {};
        if (data.usedTimeMin || data.usedTimeMax) {
            formatData.usedTime = {};
        }

        if (data.usedTimeMin) {
            formatData.usedTime.min = data.usedTimeMin.format(dateFormat);
        }
        if (data.usedTimeMax) {
            formatData.usedTime.max = data.usedTimeMax.format(dateFormat);
        }

        this.props.onSearch(formatData);
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
              <FormItem  label="消费开始时间">
                {getFieldDecorator('usedTimeMin')(
                    <DatePicker showTime={true} format={dateFormat} className={styles.name} />
                )}
              </FormItem>
              <FormItem  label="消费结束时间">
                {getFieldDecorator('usedTimeMax')(
                    <DatePicker showTime={true} format={dateFormat} className={styles.name} />
                )}
              </FormItem>

              </Row>
          <Row style={{
                margin: 20
            }}>
          <Col offset={18} style={{
                textAlgin: 'right'
            }}>
            <Button
            type="primary"
            onClick={this.handleSubmit}>
            搜索
          </Button>

          <Button
            style={{
                marginLeft: 8
            }}
            onClick={this.handleReset}>
            重置
          </Button>
            </Col>
          </Row>
        </Form>
        );
    }
}

const rechargeSearch = Form.create({})(RechargeSearch);

export default rechargeSearch;





