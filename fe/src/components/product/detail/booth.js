// 商品列表详情，等待被修改

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import Search from './boothSearch'
import List from './boothList';

class Booth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: null
        }
    }

    render() {
        const that = this
        const {
            list, 
            pagination
        } = this.props.parentState.boothCategoryInfo;

        const searchProps = {
            onSearch(params) {
                const {query, pathname} = that.props.location
                that.props.dispatch(routerRedux.push({
                    pathname: pathname,
                    query: {
                        ...query,
                        condition: JSON.stringify(params)
                    }
                }))
            }
        }

        const selectedRowKeys = this.state.selectedRowKeys || list.filter((item) => {
          return item.categoryBelong == 1
        }).map((item) => {
          return item.categoryId
        })

        const listProps = {
            dataSource: list || [],
            pagination: pagination,
            onPageChange(page) {
                const {query, pathname} = that.props.location
                that.props.dispatch(routerRedux.push({
                    pathname: pathname,
                    query: {
                        ...query,
                        page: page.current,
                        pageSize: page.pageSize
                    }
                }))
            },
            rowSelection: {
              type: "radio",
              selectedRowKeys: selectedRowKeys,
              onChange: (curSelectedRowKeys, selectedRows) => {
                let categoryId = curSelectedRowKeys[0]
                if (curSelectedRowKeys[0] == selectedRowKeys[0]) {
                    return
                }

                that.props.dispatch(
                    {
                        type: 'productDetail/modify',
                        payload:  {
                            type: 'boothCategoryInfo',
                            data: {
                                categoryId: categoryId
                            } 
                        }
                    }
                );

                that.setState({
                    selectedRowKeys: [categoryId]
                })
              }
            },
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
