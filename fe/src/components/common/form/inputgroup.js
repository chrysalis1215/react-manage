import React from 'react';
import {Input} from 'antd';

const Option = Select.Option;

class Enable extends React.Component {
    render() {
        return (<Select defaultValue={this.props.value} style={this.props.style}>
            <Option value={null} key={1}>全部</Option>
            <Option value={'1'} key={2}>是</Option>
            <Option value={'0'} key={3}>否</Option>
        </Select>);
    }
}

export default Enable;
