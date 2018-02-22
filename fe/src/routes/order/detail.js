import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import OrderDetail from '../../components/order/detail';

const Detail = ({location, dispatch, orderDetail, loading}) => {
    const detailProps = {
        data: orderDetail,
        loading: loading
    };

    return (
        <div>
            <OrderDetail {...detailProps} />
        </div>
    );
};

function mapStateToProps({orderDetail, loading}) {
    return {
        orderDetail,
        loading: loading.effects['orderDetail/query'] === true
    };
}

// export default Products;
export default connect(mapStateToProps)(Detail);
