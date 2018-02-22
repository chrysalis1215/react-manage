import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import List from '../../components/order/list';
import Search from '../../components/order/search';

const Order = ({location, dispatch, order, loading}) => {
    const {
        list,
        pagination
    } = order;

    const searchProps = {
        onSearch(params) {
            params ? dispatch(routerRedux.push({
                pathname: '/order/list',
                query: params
                
            })) : dispatch(routerRedux.push({
                pathname: '/order/list'
            }));
        }
    }

    const listProps = {
        loading: loading,
        dataSource: list,
        pagination: pagination,
        onPageChange(page) {
            const {query, pathname} = location
            dispatch(routerRedux.push({
                pathname: pathname,
                query: {
                    ...query,
                    page: page.current,
                    pageSize: page.pageSize
                }
            }))
        }
    }

    return (
        <div className='content-inner'>
            <Search {...searchProps} />
            <List {...listProps} />
        </div>
    );
}

Order.propTypes = {
    order: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func
}

function mapStateToProps({order, loading}) {
    return {
        order,
        loading: loading.models.order
    };
}

// export default Products;
export default connect(mapStateToProps)(Order);
