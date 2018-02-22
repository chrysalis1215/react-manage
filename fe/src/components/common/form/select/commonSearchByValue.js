import CommonApiSelectComponent from './commonApiSelectComponent'
import React from 'react'
import {Select} from 'antd';

const Option = Select.Option;

class CommonSearchByValue extends React.Component {
    constructor(props, options) {
        super(props);
        this.state = {
            data: [],
            value: ''
        }
        this.options = options;
        this.timeout = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && 'value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    handleSearch = (value) => {
        const func = () => {
            (async (obj) => {
                const parse = obj.options.parse;
                const res = await obj.options.api(parse ? parse(value) : value);
                if (res.err === 0) {
                    const data = res.data
                    obj.setState({
                        data
                    })
                }
            })(this);
        };

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.props.delay >= 0) {
            this.timeout = setTimeout(func, this.props.delay);
        } else {
            this.timeout = setTimeout(func, 300);
        }
    }

    handleChange = (value) => {
        if (value === '' || !value) {
            this.setState({value: '', data: []});
            this.props.onChange('');
        } else {
            this.setState({value});
            this.props.onChange(value);
        }
    }

    render() {
        const options = this.state.data.map((item) => {
            return <Option key={item} value={item}>{item}</Option>
        });

        return (
            <Select 
                {...this.props}
                combobox={true} 
                placeholder="输入关键字" 
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                value={this.state.value}>
                {options}
            </Select>
        );
    }
}

export default CommonSearchByValue
