import React from 'react';
import {queryFirstCategory, querySecondaryCategory} from '../../../services/common';
import {Select, Cascader} from 'antd';

const Option = Select.Option;

class SecondaryCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            value: ''
        };
    }

    componentWillReceiveProps(next) {
        if (next && next.value && next.value !== this.state.value) {
            let that = this;
            this.fetchData(queryFirstCategory, {}, false, null, () => {
                const arr = next.value.split('_').filter((item) => {return item !== ''});
                if (arr.length < 1) {
                    return;
                }
                const v1 = arr.length > 1 ? arr[0] : '';
                const selected = this.state.options.filter((item) => {return item.value === v1})[0];

                that.fetchData(querySecondaryCategory, {firstLevelName: v1}, true, selected, () => {
                    that.setState({
                        value: next.value
                    });
                });
            });
        }
    }

    handleChange = (values, selectedOptions) => {
        const str = values.join('_')
        this.setState({
            value: str
        });
        this.props.onChange(str);
    }

    fetchData(api, params, isLeaf, parent, callback) {
        (async (obj) => {
            const res = await api(params);
            if (res.err === 0) {
                const options = res.data.map((item) => {
                    return {
                        value: item,
                        label: item,
                        isLeaf: isLeaf
                    }
                });
                let update = options;
                if (parent) {
                    parent.children = options;
                    parent.loading = false;
                    update = [...obj.state.options];
                }
                obj.setState({
                    options: update
                });
                if (callback) {
                    callback()
                }
            }
        })(this);
    }

    loadData = (selectedOptions) => {
        const target = selectedOptions[selectedOptions.length - 1];
        target.loading = true;
        this.fetchData(querySecondaryCategory, {firstLevelName: target.value}, true, target);
    }

    render() {
        const selected = this.state.value.split('_');

        return (<Cascader
                placeholder='请选择'
                value={selected}
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.handleChange}
                >
            </Cascader>
        );
    }
}

export default SecondaryCategory;
