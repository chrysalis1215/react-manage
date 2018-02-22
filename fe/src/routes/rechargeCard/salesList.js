/**
 * Created by xunzhi on 2017/6/15.
 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import List from '../../components/rechargeCard/salesList';
import Search from '../../components/rechargeCard/salesSearch';

const RechargeCardSalesList = ({location, dispatch, rechargeCardSalesList, loading}) => {
    const {
        list,
        pagination
    } = rechargeCardSalesList;

    const searchProps = {
        onSearch(params) {
            const state = params ? {
                pathname: '/order/rechargeCard/salesList',
                query: params
            } : {
                pathname: '/order/rechargeCard/salesList'
            };

            dispatch(routerRedux.push(state));
        },
    };

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
            <Search {...searchProps}/>
            <List {...listProps} />
        </div>
    );
}

RechargeCardSalesList.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func
}

function mapStateToProps({rechargeCardSalesList, loading}) {
    return {
        rechargeCardSalesList,
        loading: loading.models.rechargeCardSalesList
    };
}

// export default Products;
export default connect(mapStateToProps)(RechargeCardSalesList);

