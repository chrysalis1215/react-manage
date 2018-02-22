
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
            title: '编号',
            key:  'id',
            dataIndex: 'id',
        }, 
        {
            title: '订单号',
            key: 'orderId',
            dataIndex: 'orderId',
        }, 
        {
            title: '销售价',
            key: 'price',
            dataIndex: 'price',
        }, 
        {
            title: '赠送值',
            key: 'actualCredit',
            dataIndex: 'actualCredit',
        }, 
        {
            title: '数量',
            key: 'number',
            dataIndex: 'number',
        }, 
        {
            title: '购买时间',
            key: 'buyTime',
            dataIndex: 'buyTime',
        },
        {
            title: '微信支付',
            key: 'paymentMode',
            dataIndex: 'paymentMode',
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