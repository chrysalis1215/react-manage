import React from 'react';
import {Radio} from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Enable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: props.value
        }
    }

    componentWillReceiveProps(next) {
        if (next && 'value' in next) {
            this.setState({
                selectedValue: next.value
            });
        }
    }

    handleChange(e) {
        const val = e.target.value;
        e.target.parent.setState({
            selectedValue: val
        });
        e.target.parent.props.onChange(val);
    }
    
    render() {
        return (<RadioGroup value={this.state.selectedValue} onChange={this.handleChange}>
                <RadioButton value={1} parent={this}>是</RadioButton>
                <RadioButton value={0} parent={this}>否</RadioButton>
            </RadioGroup>
        );
    }
}

export default Enable;
