import React, { PropTypes } from 'react';
import { message, Table, Popconfirm, Button, Anchor } from 'antd';
const  {Link} = Anchor 

class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }

    async pageChange(pagination) {
        await this.props.onPageChange(pagination)
    }
    handleDelete = () => {
        
    }

    render() {
        const {dataSource, pagination, loading} = this.props;

        const columns = [{
            title: '编号',
            key: 'id',
            dataIndex: 'id',
        }, {
            title: '商品名称',
            key: 'name',
            dataIndex: 'name',
        }, {
            title: '关联商家',
            key: 'boothName',
            dataIndex: 'boothName',
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
            title: '优先级',
            key: 'priority',
            dataIndex: 'priority',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                let href = `#/product/detail?id=${record.id}`;
                return (
                    <span>
                        <a href={href} key={record.id}>查看详情</a>
                    </span>);
            },
        },{
            title: '删除',
            key: 'delete',
            render: (text, record) => {
                let href = `#/product/detail?id=${record.id}`;
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

export default ProductList
