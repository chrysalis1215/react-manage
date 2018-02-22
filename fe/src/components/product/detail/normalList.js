import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button } from 'antd';

// 推荐这种写法，但是函数方法需要手动绑定this
class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }


    async pageChange(pagination) {
        await this.props.onPageChange(pagination)
    }

    render() {
        // 引用传入的props属性
        const {dataSource, pagination, rowSelection} = this.props;

        // 定义表头 
        const columns = [
        {
            title: '编号',
            key: 'categoryId',
            dataIndex: 'categoryId',
        },{
            title: '分类名称',
            key: 'categoryName',
            dataIndex: 'categoryName',
        }];

        return (
            <div> 
                 <Table
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    onChange={::this.pageChange}
                    rowKey={record => record.categoryId} />
            </div>
        );
    }
}


export default ProductList