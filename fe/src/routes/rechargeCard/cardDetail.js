import DetailWithMenu from '../../components/layout/detailWithMenu';
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class CardDetail extends DetailWithMenu {

    componentWillReceiveProps(nextProps) {
        if (nextProps.rechargeCardDetail && nextProps.rechargeCardDetail.baseInfo &&  nextProps.rechargeCardDetail.baseInfo.name) {
            document.title = '零售库存管理系统/订单管理/充值卡管理/'  + nextProps.rechargeCardDetail.baseInfo.name;
        }
    }

    getChildComponents() {
        return React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
                parentState: this.props.rechargeCardDetail,
                dispatch: this.props.dispatch
            })
        );
    }

    getChildMenus() {
        return [
            {pathname: '/order/rechargeCard/detail/baseInfo', title: '基本信息'},
        ];
    }

    getLocation() {
        return this.props.location;
    }

    getQueryKeys() {
        return ['id'];
    }

    onKeysMissing() {
        this.props.dispatch(routerRedux.push('/order/rechargeCard'));
    }
}

function mapStateToProps({rechargeCardDetail, loading}) {
    return {
        rechargeCardDetail,
        loading: loading.effects['rechargeCardDetail/queryDetailInfo'] === true || loading.effects['rechargeCardDetail/modify'] === true
    };
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch: (action) => dispatch(action)}
}


export default connect(mapStateToProps, mapDispatchToProps)(CardDetail);
