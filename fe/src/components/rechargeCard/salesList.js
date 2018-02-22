/**
 * Created by xunzhi on 2017/6/15.
 */
import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Anchor } from 'antd';

class RechargeCardSalesList extends React.Component {
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
                title: '编号',
                key: 'id',
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
                title: '销售总价',
                key: 'totalMoney',
                dataIndex: 'totalMoney',
            },
            {
                title: '数量',
                key: 'number',
                dataIndex: 'number'
            },
            {
                title: '购买时间',
                key: 'buyTime',
                dataIndex: 'buyTime'
            },
            {
                title: '买家手机号',
                key: 'userPhone',
                dataIndex: 'userPhone'
            },
            {
                title: '买家名称',
                key: 'buyName',
                dataIndex: 'buyName'
            },
            {
                title: '支付方式',
                key: 'paymentMode',
                dataIndex: 'paymentMode'
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
                    rowKey={record => record.id} />
            </div>
        );
    }
}

export default RechargeCardSalesList

