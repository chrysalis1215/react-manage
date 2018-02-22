import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Anchor } from 'antd';
const  {Link} = Anchor 

// 推荐这种写法，但是函数方法需要手动绑定this
class BootList extends React.Component {
    constructor(props) {
        super(props)
    }

    async pageChange(pagination) {
        await this.props.onPageChange(pagination)
    }

    render() {
        // 引用传入的props属性
        const {dataSource, pagination, loading, handleDelete, handleEdit} = this.props;

        // 定义表头 
        const columns = [
        {
            title: '编号',
            key: 'id',
            dataIndex: 'id',
        }, {
            title: '商家名称',
            key: 'name',
            dataIndex: 'name',
        }, {
            title: '商家类型',
            key: 'businessScope',
            dataIndex: 'businessScope',
        }, {
            title: '启用',
            key: 'enable',
            dataIndex: 'enable',
            render: (text, record) => {
                return (
                    <span>{text == 1 ? '是' : '否'}</span>
                )
            }
        }, {
            title: '分类数量',
            key: 'categoryNum',
            dataIndex: 'categoryNum',
        }, {
            title: '产品数量',
            key: 'productNum',
            dataIndex: 'productNum',
        },{
            title: '优先级',
            key: 'priority',
            dataIndex: 'priority',
        },{
            title: '查看',
            key: 'action',
            render: (text, record) => {
                let href = `#/booth/detail?boothId=${record.id}`;
                return (
                    <span>
                        <a href={href} key={record.id}>查看详情</a>
                    </span>
                );
            },
        },
        {
            title: '删除',
            key: 'delete',
            render: (text, record) => {
                let href = `#/booth/detail?boothId=${record.id}`;
                return (
                    <Popconfirm title={"是否确定删除编号为" + record.id + "？"} onConfirm={() => handleDelete(record.id)}>
                      <a>删除</a>
                    </Popconfirm>
                );
            },
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

export default BootList
