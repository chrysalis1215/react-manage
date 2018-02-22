
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import CategorySearch from './productSearch'
import CategoryList from './productList';

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dispatchType: '',
            selectedRowKeys: null
        }
    }
    
    componentWillMount() {
        // 通过路由去判断组件的父亲级state
        let dispatchType = '';
        switch (this.props.location.pathname) {
          case '/category/normal/detail/product':
            dispatchType = 'categoryNormalDetail/modify';
            break;
          case '/category/booth/detail/product':
            dispatchType = 'categoryBoothDetail/modify';
            break;
        }

        this.setState({
          dispatchType: dispatchType
        })
    }

    render() {
        const that = this
        const {
            list, 
            pagination
        } = this.props.parentState.productInfo
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
            list.filter((item) => {return item.productBelong == 1})
                .map((item) => {return item.productId})
            : this.state.selectedRowKeys;

        const listProps = {
            dataSource: list || [],
            pagination: pagination,
            rowSelection: {
              selectedRowKeys: selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                that.props.dispatch({
                    type: this.state.dispatchType,
                    payload:  {
                        type: 'productInfo',
                        data: {
                            productList: selectedRowKeys
                        }
                    }
                });
                that.setState({
                    selectedRowKeys: selectedRowKeys
                });
              },
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
                <CategorySearch {...searchProps} />
                <CategoryList {...listProps} />
            </div>
        )
    }
}

export default Category
