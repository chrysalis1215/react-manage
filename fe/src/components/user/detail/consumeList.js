
import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button } from 'antd';

// 推荐这种写法，但是函数方法需要手动绑定this
class RechargeList extends React.Component {
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
            title: '订单号',
            key: 'orderId',
            dataIndex: 'orderId',
            render: (text, record) => {
                let href = `#/order/detail?orderNumber=${record.orderId}`;
                return (
                    <span>
                        <a href={href} key={record.id}>{record.orderId}</a>
                    </span>
                );
            }
        }, 
        {
            title: '消费金额',
            key: 'totalMoney',
            dataIndex: 'totalMoney',
        }, 
        {
            title: '消费时间',
            key: 'paymentTime',
            dataIndex: 'paymentTime',
        }];

        return (
            <div> 
                 <Table
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    onChange={::this.pageChange}
                    rowKey={record => record.id} />
            </div>
        );
    }
}


export default RechargeList