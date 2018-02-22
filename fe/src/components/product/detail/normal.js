import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import ProductSearch from './normalSearch'
import ProductList from './normalList';

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: null
        }
    }

    render() {
        const that = this;
        const {
            list,
            pagination
        } = this.props.parentState.commonCategoryInfo

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
                        ...that.props.location.query,
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
                    categoryId = -1
                }

                that.props.dispatch(
                {
                    type: 'productDetail/modify',
                    payload: {
                        type: 'commonCategoryInfo',
                        data: {
                            categoryId: categoryId
                        }
                    } 
                }
                );
                
                that.setState({
                    selectedRowKeys: categoryId === -1 ? [] : [categoryId]
                })
              }
            },

        }

        return (
            <div>
                <ProductSearch {...searchProps} />
                <ProductList {...listProps} />
            </div>
        )
    }
}

export default Product
