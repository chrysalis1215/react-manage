import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Anchor } from 'antd';
const {Link} = Anchor

// 推荐这种写法，但是函数方法需要手动绑定this
class CategoryList extends React.Component {
    constructor(props) {
        super(props)
    }


    async pageChange(pagination) {
        await this.props.onPageChange(pagination)
    }

    render() {
        // 引用传入的props属性
        const {dataSource, pagination, loading} = this.props;

        // 定义表头 
        const columns = [
            {
                title: '编号',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '分类名称',
                key: 'businessScope',
                dataIndex: 'businessScope',
            }];

        return (
            <div> 
                <Table
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    onChange={::this.pageChange}
                    rowKey={record => record.id} />
            </div>
        );
    }
}


export default CategoryList
