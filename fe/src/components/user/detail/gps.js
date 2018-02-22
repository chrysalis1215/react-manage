import React, { PropTypes } from 'react';
import {Form, Input, Button, Cascader, Card, Tag, Row, Col} from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 }
};

const cityLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}



const disableCompent = {disabled: false}

class Gps extends React.Component{
    constructor(props) { 
        super(props)
    }

    handleSave = (e) => {
        // TODO 获取默认值修改
        let data = this.props.form.getFieldsValue();
        let body = Object.assign({}, data);
        body.id = this.props.parentState.addressInfo.id;
        this.props.dispatch({
            type: 'userDetail/modify',
            payload: {
                data: body,
                type: 'addressInfo'
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {
            longitude, 
            latitude, 
        } = this.props.parentState.addressInfo;

        return (
            <Form vertical onSubmit={this.handleSubmit}>
                {/*<FormItem {...formItemLayout} label="归属城市">
                    {
                        getFieldDecorator('city', {initialValue: [province, city, district]})(
                            <Cascader 
                                {...disableCompent} 
                                options={options} 
                                onChange={this.handleChange} 
                            />
                    )}
                </FormItem>*/}

                <FormItem {...formItemLayout} label="地图锚点">
                    {
                        getFieldDecorator('longitude', {initialValue: longitude})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="地图锚点">
                    {
                        getFieldDecorator('latitude', {initialValue: latitude})(
                            <Input />
                        )
                    }
                </FormItem>


                <Button
                    type="primary"
                    onClick={this.handleSave}>
                    保存
                </Button>
            </Form>
        );
    }
}

const gps  = Form.create()(Gps);

export default gps;
