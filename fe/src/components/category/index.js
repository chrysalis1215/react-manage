import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Anchor } from 'antd';
const  {Link} = Anchor 

// 推荐这种写法，但是函数方法需要手动绑定this
class BoothList extends React.Component {
    constructor(props) {
        super(props)
    }


    async pageChange(pagination) {
        await this.props.onPageChange(pagination)
    }

    render() {
        // 引用传入的props属性
        const {dataSource, pagination} = this.props;

        // 定义表头 
        const columns = [
        {
            title: '编号',
            key: 'id',
            dataIndex: 'id',
        }, {
            title: '分类名称',
            key: 'name',
            dataIndex: 'name',
        }, {
            title: '关联类型',
            key: 'businessScope',
            dataIndex: 'businessScope',
        }, {
            title: '禁用',
            key: 'enable',
            dataIndex: 'enable',
            render: (text, record) => {
                return (
                    <span>{text ? '是' : '否'}</span>
                )
            }
        }, {
            title: '产品数量',
            key: 'productNumber',
            dataIndex: 'productNumber',
        }, {
            title: '分类数量',
            key: 'categoryNumber',
            dataIndex: 'categoryNumber',
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => {
                let href = `#/booth/boothDetail?bootId=${record.id}`;
                return (
                    <span>
                        <a href={href} key={record.id}> "查看详情" /</a>
                    </span>);
            },
        }];

        return (
            <div> 
                 <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    onChange={::this.pageChange}
                    rowKey={record => record.id} />
            </div>
        );
    }
}


export default BoothList