import React, { PropTypes } from 'react';
import {Form, Input, Button, Radio, Select, InputNumber, Card, Tag} from 'antd';
import Enable from '../../common/form/radio/enable';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 }
};

const selectOptions = [];

const disableCompent = {disabled: false}

class BasicInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            dispatchType: ''
        }
    }
    componentWillMount() {
        // 通过路由去判断组件的父亲级state
        let dispatchType = '';
        switch (this.props.location.pathname) {
          case '/category/normal/detail/baseInfo':
            dispatchType = 'categoryNormalDetail/modify';
            break;
          case '/category/booth/detail/baseInfo':
            dispatchType = 'categoryBoothDetail/modify';
            break;

        }
        this.setState({
          dispatchType: dispatchType
        })
    }
    handleSave= () => {
        this.props.dispatch({
            type: this.state.dispatchType,
            payload: {
                type: 'baseInfo',
                data: this.props.form.getFieldsValue()
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {
            detailDescription,
            enable,
            id,
            layout,
            name,
            priority,
            searchKey,
            simpleDescription
        } = this.props.parentState.baseInfo;

        return (
            <Form vertical onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="分类名称">
                    {
                        getFieldDecorator('name', {initialValue: name})(
                            <Input {...disableCompent} />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="启用">
                    {
                        getFieldDecorator('enable', {initialValue: enable})(
                            <Enable />
                        )
                    }
                </FormItem>
                 <FormItem {...formItemLayout} label="关键字">
                    {getFieldDecorator('searchKey', {initialValue: searchKey})(
                        <Input  />
                        ) }
                </FormItem>

                <FormItem {...formItemLayout} label="优先级">
                    {getFieldDecorator('priority', {initialValue: priority})(
                        <Input {...disableCompent} />
                        ) }
                </FormItem>
                <FormItem {...formItemLayout} label="分类简单描述">
                    {getFieldDecorator('simpleDescription',{initialValue: simpleDescription})(
                        <Input type="textarea" autosize={true} />
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label="分类详细描述" >
                     {getFieldDecorator('detailDescription', {initialValue: detailDescription})(
                         <Input type="textarea" autosize={true} />
                        )}
                </FormItem>
                <FormItem {...formItemLayout}label="展示界面类型">
                    {getFieldDecorator('layout', {initialValue: layout})(
                        <Select >
                        </Select>
                    )}
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

const basicInfo  = Form.create({})(BasicInfo);

export default basicInfo;
