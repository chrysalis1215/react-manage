import React from 'react'
import { Table, Popconfirm } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import styles from './list.less'

class list extends React.Component {
    constructor(props) {
        super(props)
    }

    async pageChange(pagination) {
        await this.props.onPageChange(pagination)
    }

    render() {
        // 引用传入的props属性
        const {dataSource, pagination, loading, handleDelete} = this.props;

        // 定义表头
        const columns = [
        {
            title: '手机',
            key: 'phone',
            dataIndex: 'phone',
        }, {
            title: '用户名',
            key: 'name',
            dataIndex: 'name',
        }, {
            title: '饭店类型',
            key: 'businessType',
            dataIndex: 'businessType',
        }, {
            title: '消费等级',
            key: 'consumptionLevel',
            dataIndex: 'consumptionLevel'
        }, {
            title: '注册日期',
            key: 'createTime',
            dataIndex: 'createTime',
        }, {
            title: '配送区域',
            key: 'businessArea',
            dataIndex: 'businessArea',
        },{
            title: '配送路线',
            key: 'deliveryLine',
            dataIndex: 'deliveryLine',
        },{
            title: '收货时间',
            key: 'receivingTime',
            render: record => {
                let time = record.receivingTime;
                return time[0] + '至'+ time[1];
            }
        },
        {
            title: '投诉建议',
            key: 'delete',
            render: record => {
                return '无'
            }
        },
        {
            title: '客服经理',
            key: 'recommandName',
            render: record => {
                return record.recommandName || '-';
            }

        },
        {
            title: '操作',
            key: 'detail',
            render: (text, record) => {
                let href = `#/user/detail?phone=${record.phone}`;
                return (
                    <span>
                        <a href={href} key={record.phone}>查看详情</a>
                    </span>);
            }

        }];

        return (
            <div> 
                 <Table
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    onChange={::this.pageChange}
                    rowKey={record => record.phone}
                    />
            </div>
        );
    }
}

export default list
