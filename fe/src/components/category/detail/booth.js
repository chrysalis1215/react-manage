// 商品列表详情，等待被修改

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import Search from './boothSearch'
import List from './boothList';

class Booth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: null
        };
    }

    render() {
        const that = this;

        const {
            list, 
            pagination
        } = this.props.parentState.boothInfo;

        const searchProps = {
            onSearch(params) {
                const {query, pathname} = that.props.location
                that.props.dispatch(routerRedux.push({
                    pathname: pathname,
                    query: {
                        ...that.props.location.query,
                        condition: JSON.stringify(params)
                    }
                }))
            }
        }

        const selectedRowKeys = this.state.selectedRowKeys === null ?
            list.filter((item) => {return item.boothBelong == 1})
                .map((item) => {return item.boothId})
            : this.state.selectedRowKeys;

        let listProps = {
            dataSource: list || [],
            pagination: pagination,
            rowSelection: {
                type: "radio",
                selectedRowKeys: selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                    that.props.dispatch({
                        type: 'categoryBoothDetail/modify',
                        payload:  {
                            type: 'boothInfo',
                            data: {
                              boothId: selectedRowKeys[0]
                            }
                        }
                    });
                    that.setState({
                        selectedRowKeys: selectedRowKeys
                    });
                }
            },
            onPageChange(page) {
                const {query, pathname} = that.props.location
                that.props.dispatch(routerRedux.push({
                    pathname: pathname,
                    query: {
                        ...that.props.location.query,
                        page: page.current,
                        pageSize: page.pageSize
                    }
                }))
            }
        }

        return (
            <div>
                <Search {...searchProps} />
                <List {...listProps} />
            </div>
        )
    }
}

export default Booth
