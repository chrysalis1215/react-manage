import DetailWithMenu from '../../components/layout/detailWithMenu';
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class BoothDetail extends DetailWithMenu {


    componentWillReceiveProps(nextProps) {
        if (nextProps.boothDetail && nextProps.boothDetail.baseInfo &&  nextProps.boothDetail.baseInfo.name) {
            document.title = '零售库存管理系统/商家管理/'  + nextProps.boothDetail.baseInfo.name;
        }
    }

    getChildComponents() {
        return React.Children.map(this.props.children, (child) => 
            React.cloneElement(child, {
                parentState: this.props.boothDetail,
                dispatch: this.props.dispatch,
                loading: this.props.loading
            })
        );   
    }

    getChildMenus() {
        return [
            {pathname: '/booth/detail/baseInfo', title: '基本信息'},
            {pathname: '/booth/detail/gps', title: '地理信息'},
            {pathname: '/booth/detail/category', title: '商家分类'},
            {pathname: '/booth/detail/product', title: '商品列表'},
            {pathname: '/booth/detail/img', title: '商家图片'},
            {pathname: '/booth/detail/h5', title: '商家H5'},
        ];
    }

    getLocation() {
        return this.props.location;
    }

    getQueryKeys() {
        return ['boothId'];
    }

    onKeysMissing() {
        this.props.dispatch(routerRedux.push('/booth'));
    }
}

function mapStateToProps({boothDetail, loading}) {
    return {
        boothDetail,
        loading: loading.effects['boothDetail/query'] === true || loading.effects['boothDetail/modify'] === true
    };
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch: (action) => dispatch(action)};
}

export default connect(mapStateToProps, mapDispatchToProps)(BoothDetail);
