import React from 'react';
import {Select} from 'antd';
const Option = Select.Option;
const valueList = ['袋', '瓶', '桶', '盒', '包', '件', '箱', '捆', '斤', '支', '板', '条', '个', '棵', '听', '罐'];
class StockUnit extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(next) {
        if (next && 'value' in next) {
            this.setState({
                selectedValue: next.value
            });
        }
    }

    render() {
        // TODO 父亲组件获取即使
         const stockUnitOptions = valueList.map(item => <Option value={item} key={item}>{item}</Option>);
        return (
            <Select {...this.props}>
                {stockUnitOptions}
            </Select>
        );
    }
}

export default StockUnit;
