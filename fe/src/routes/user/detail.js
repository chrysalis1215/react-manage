import DetailWithMenu from '../../components/layout/detailWithMenu';
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class UserDetail extends DetailWithMenu {
    getChildComponents() {
        return React.Children.map(this.props.children, (child) => 
            React.cloneElement(child, {
                parentState: this.props.userDetail,
                dispatch: this.props.dispatch
            })
        );   
    }

    getChildMenus() {
        return [
            {pathname: '/user/detail/baseInfo', title: '基本信息'},
            {pathname: '/user/detail/gps', title: '地理信息'},
            {pathname: '/user/detail/img', title: '商家图片'},
            {pathname: '/user/detail/rechargeCardInfo', title: '充值记录'},
            {pathname: '/user/detail/rechargeCardUsed', title: '消费记录'}            
        ];
    }

    getLocation() {
        return this.props.location;
    }

    getQueryKeys() {
        return ['phone'];
    }

    onKeysMissing() {
        this.props.dispatch(routerRedux.push('/user'));
    }
}

function mapStateToProps({userDetail, loading}) {
    return {
        userDetail,
        loading: loading.effects['userDetail/query'] === true || loading.effects['userDetail/modify'] === true
    };
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch: (action) => dispatch(action)};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
