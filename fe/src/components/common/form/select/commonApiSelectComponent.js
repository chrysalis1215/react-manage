import React from 'react';
import WithInitData from '../../withInitData';
import {Select} from 'antd';

const Option = Select.Option;

class CommonApiSelectComponent extends WithInitData {
    constructor(props, 
            api, 
            optionValue, 
            optionText, 
            optionKey, 
            inputFormat, 
            outputFormat
            ) {

        super(props);
        this.state = {
            value: undefined
        };
        this.api = api;
        this.optionValue = optionValue;
        this.optionKey = optionKey || optionValue;
        this.optionText = optionText;
        this.inputFormat = inputFormat || ((input) => {
            return input ? input.toString() : undefined;
        });
        this.outputFormat = outputFormat || ((output) => {
            return output ? parseInt(output) : undefined;
        });
    }

    componentWillMount() {
        this.initDataSync(this.api);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && 'value' in nextProps) {
            this.setState({
                value: this.inputFormat(nextProps.value)
            });
        }
    }

    handleChange(value) {
        this.parent.setState({
            value: value
        });
        if (this.parent.props.onChange){
            this.parent.props.onChange(this.parent.outputFormat(value));
        }
    }

    render() {
        let childOptions = [];
        if (this.hasData()) {
            const p = this;
            const data = this.getData().data || [];
            childOptions = data.map((item) => {
                const value = p.optionValue(item);
                const key = p.optionKey(item);
                const text = p.optionText(item);
                return (<Option value={value} key={value}>{text}</Option>);
            });
        }

        return (<Select placeholder="全部" allowClear={true} parent={this} {...this.props} onChange={this.handleChange} value={this.state.value}>
                {childOptions}
            </Select>
        );
    }
}

export default CommonApiSelectComponent;
