import DetailWithMenu from '../../../components/layout/detailWithMenu';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { Menu } from 'antd'
import { routerRedux } from 'dva/router';

class CategoryNormalDetail extends DetailWithMenu {

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryNormalDetail && nextProps.categoryNormalDetail.baseInfo &&  nextProps.categoryNormalDetail.baseInfo.name) {
            document.title = '零售库存管理系统/一般分类/'  + nextProps.categoryNormalDetail.baseInfo.name;
        }
    }

    getChildComponents() {
        return React.Children.map(this.props.children, (child) => 
            React.cloneElement(child, {
                parentState: this.props.categoryNormalDetail,
                dispatch: this.props.dispatch
            })
        );   
    }

    getChildMenus() {
        return [
            {pathname: '/category/normal/detail/baseInfo', title: '基本信息'},
            {pathname: '/category/normal/detail/product', title: '关联商品'},
            {pathname: '/category/normal/detail/img', title: '分类图片'}
        ];
    }

    getLocation() {
        return this.props.location;
    }

    getQueryKeys() {
        return ['id'];
    }

    onKeysMissing() {
        this.props.dispatch(routerRedux.push('/category/normal'));
    }
}

function mapStateToProps({categoryNormalDetail, loading}) {
  return {
      categoryNormalDetail,
      loading: loading.effects['categoryNormalDetail/queryDetailInfo'] === true || loading.effects['categoryNormalDetail/modify'] === true
  };
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch: (action) => dispatch(action)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNormalDetail);
