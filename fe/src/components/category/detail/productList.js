
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
            key:  'productId',
            dataIndex: 'productId',
        }, {
            title: '商品名称',
            key: 'productName',
            dataIndex: 'productName',
            render: (text, record) => {
                let href = `#/product/detail?id=${record.productId}`;
                return (
                    <span>
                        <a href={href} key={record.productId}>{record.productName}</a>
                    </span>);
            },
        }, {
            title: '库存报警',
            key: 'stockAlarm',
            dataIndex: 'stockAlarm',
            render: (text, record) => {
                return (
                    <span>{text ? '是' : '否'}</span>
                )
            }
        }];

        return (
            <div> 
                 <Table
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    onChange={::this.pageChange}
                    rowKey={record => record.productId} />
            </div>
        );
    }
}


export default ProductList