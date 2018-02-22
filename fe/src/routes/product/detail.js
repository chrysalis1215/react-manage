import DetailWithMenu from '../../components/layout/detailWithMenu';
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class ProductDetail extends DetailWithMenu {

    componentWillReceiveProps(nextProps) {
        if (nextProps.productDetail && nextProps.productDetail.baseInfo &&  nextProps.productDetail.baseInfo.name) {
            document.title = '零售库存管理系统/商品管理/'  + nextProps.productDetail.baseInfo.name;
        }
    }

    getChildComponents() {
        return React.Children.map(this.props.children, (child) => 
            React.cloneElement(child, {
                parentState: this.props.productDetail,
                dispatch: this.props.dispatch
            })
        );   
    }

    getChildMenus() {
        return [
            {pathname: '/product/detail/baseInfo', title: '基本信息'},
            {pathname: '/product/detail/retailInfo', title: '商品零拣'},
            {pathname: '/product/detail/wholesaleInfo', title: '商品整件'},
            {pathname: '/product/detail/boothCategoryInfo', title: '商家分类'},
            {pathname: '/product/detail/commonCategoryInfo', title: '一般分类'},
            {pathname: '/product/detail/picInfo', title: '图片信息'},
            {pathname: '/product/detail/qualityReportPicInfo', title: '质检报告'},
            {pathname: '/product/detail/h5Info', title: '商品H5页面'},
            // {pathname: '/product/detail/tongji', title: '库存统计'}
        ];
    }

    getLocation() {
        return this.props.location;
    }

    getQueryKeys() {
        return ['id'];
    }

    onKeysMissing() {
        this.props.dispatch(routerRedux.push('/product'));
    }
}

function mapStateToProps({productDetail, loading}) {
    return {
        productDetail,
        loading: loading.effects['productDetail/queryDetailInfo'] === true || loading.effects['productDetail/modify'] === true
    };
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch: (action) => dispatch(action)}
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
