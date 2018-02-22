import DetailWithMenu from '../../../components/layout/detailWithMenu';
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class CategoryBoothDetail extends DetailWithMenu {

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryBoothDetail && nextProps.categoryBoothDetail.baseInfo &&  nextProps.categoryBoothDetail.baseInfo.name) {
            document.title = '零售库存管理系统/商家分类/'  + nextProps.categoryBoothDetail.baseInfo.name;
        }
    }

    getChildComponents() {
        return React.Children.map(this.props.children, (child) => 
            React.cloneElement(child, {
                parentState: this.props.categoryBoothDetail,
                dispatch: this.props.dispatch
            })
        );   
    }

    getChildMenus() {
        return [
            {pathname: '/category/booth/detail/baseInfo', title: '基本信息'},
            {pathname: '/category/booth/detail/product', title: '关联商品', search: 'condition=%7B%22productBelong%22%3A1%7D'},
            {pathname: '/category/booth/detail/img', title: '分类图片'},
            {pathname: '/category/booth/detail/booth', title: '关联商家'}
        ];
    }

    getLocation() {
        return this.props.location;
    }

    getQueryKeys() {
        return ['id'];
    }

    onKeysMissing() {
        this.props.dispatch(routerRedux.push('/category/booth'));
    }
}

function mapStateToProps({categoryBoothDetail, loading}) {
  return {
        categoryBoothDetail,
        loading: loading.effects['categoryBoothDetail/queryDetailInfo'] === true || loading.effects['categoryBoothDetail/modify'] === true
  };

}

const mapDispatchToProps = (dispatch) => {
    return {dispatch: (action) => dispatch(action)};
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryBoothDetail);
