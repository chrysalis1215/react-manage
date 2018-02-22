import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Anchor } from 'antd';
const  {Link} = Anchor 

class OrderList extends React.Component {
    async pageChange(pagination) {
        await this.props.onPageChange(pagination)
    }
    
    render() {
        const {
            dataSource, 
            pagination,
            loading
        } = this.props;

        const columns = [
            {
                title: '订单号',
                key: 'orderNumber',
                dataIndex: 'orderNumber',
            },
            {
                title: '手机',
                key: 'userPhone',
                dataIndex: 'userPhone',
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '订单金额',
                key: 'totalMoney',
                dataIndex: 'totalMoney'
            },
            {
                title: '订单日期',
                key: 'createTime',
                dataIndex: 'createTime',
            },
            {
                title: '订单状态',
                key: 'orderStatus',
                dataIndex: 'orderStatus',
            },
            {
                title: '配送路线',
                key: 'deliveryLine',
                dataIndex: 'deliveryLine',
            },
            {
                title: '查看',
                key: 'action',
                render: (text, record) => {
                    let href = `#/order/detail?orderNumber=${record.orderNumber}`;
                    return (
                        <span>
                            <a href={href} key={record.orderNumber}>查看详情</a>
                        </span>
                    );
                }
            }
        ];

        return (
            <div> 
                 <Table
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    onChange={::this.pageChange}
                    rowKey={record => record.orderNumber} />
            </div>
        );
    }
}

export default OrderList
