/**
 * Created by xunzhi on 2017/6/15.
 */
import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Anchor } from 'antd';

class RechargeCardList extends React.Component {
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
                title: '充值卡名称',
                key: 'name',
                dataIndex: 'name'
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
                title: '总销售限制',
                key: 'salesLimit',
                dataIndex: 'salesLimit'
            },
            {
                title: '当前销售量',
                key: 'actualSales',
                dataIndex: 'actualSales',
            },
            {
                title: '启用',
                key: 'enable',
                dataIndex: 'enable',
                render: (text, record) => {
                    return (
                        <span>{text == 1 ? '是' : '否'}</span>
                    )
                },
            },
            {
                title: '查看',
                key: 'action',
                render: (text, record) => {
                    let href = `#/order/rechargeCard/detail?id=${record.id}`;
                    return (
                        <span>
                            <a href={href} key={record.id}>查看详情</a>
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
                    rowKey={record => record.id} />
            </div>
        );
    }
}

export default RechargeCardList

