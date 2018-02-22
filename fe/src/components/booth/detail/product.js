import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import ProductSearch from './productSearch'
import ProductList from './productList';

class Product extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
    }

    render() {
        const that = this;
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
            }
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
