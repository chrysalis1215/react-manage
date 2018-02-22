import {getCookie} from './utils/helper'

import React from 'react'
import {Router, Route, Redirect} from 'dva/router'
import App from './routes/app'
// common components
import Img from './components/common/Img'
// 商家相关接口
import BoothList from './routes/booth/booth'
import BoothDetail from './routes/booth/detail'
import BoothDetailBase from './components/booth/detail/basicInfo'
import BoothDetailGps from './components/booth/detail/gps'
import BoothDetailCategory from './components/booth/detail/category'
import BoothDetailProduct from './components/booth/detail/product'
import BoothDetailImg from './components/booth/detail/img'
import BoothDetailH5 from './components/booth/detail/h5'

// 分类相关
import CategoryBoothList from './routes/category/booth/list'
import CategoryBoothDetail from './routes/category/booth/detail'
import CategoryNormalList from './routes/category/normal/list'
import CategoryNormalDetail from './routes/category/normal/detail'
import CategoryDetailBase from './components/category/detail/basicInfo'
import CategoryDetailImg from './components/category/detail/img'
import CategoryDetailProduct from './components/category/detail/product'
import CategoryDetailBooth from './components/category/detail/booth'

// 商品列表
import ProductList from './routes/product/list'
// 商品详情
import ProductDetail from './routes/product/detail'
import ProductDetailBase from './components/product/detail/baseInfo'
import ProductDetailRetail from './components/product/detail/retailInfo'
import ProductDetailWholesale from './components/product/detail/wholesaleInfo'
import ProductDetailBooth from './components/product/detail/booth'
import ProductDetailNormal from './components/product/detail/normal'
import ProductDetailImg from './components/product/detail/img'
import ProductDetailQualityReportPic from './components/product/detail/qualityReportPicInfo'
import ProductDetailH5 from './components/product/detail/h5'

// 用户
import UserList from './routes/user/list'
import UserDetail from './routes/user/detail'
import UserDetailBase from './components/user/detail/baseInfo'
import UserDetailGps from './components/user/detail/gps'
import UserDetailImg from './components/user/detail/userImg'
import UserDetailUsed from './components/user/detail/consume'
import UserDetailRecharge from './components/user/detail/recharge'


// 订单
import OrderList from './routes/order/list'
import OrderDetail from './routes/order/detail'

// 充值卡
import RechargeCardList from './routes/rechargeCard/list';
import RechargeCardDetail from './routes/rechargeCard/cardDetail';
import RechargeCardDetailBase from './components/rechargeCard/cardDetail/baseInfo';
import RechargeCardSalesList from './routes/rechargeCard/salesList';

export default function ({history, app}) {

    const handleOnEnter = (nextState, replace, callback) => {
        const token = getCookie('token')
        if (!token || token == '') {
            if (nextState.location.pathname !== '/') {
                replace('/')
            }
        } else {
            if (nextState.location.pathname === '/') {
                replace('/redirect')
            }
        }
        callback()
    }

    return <Router history={history}>
        <Route path='/' component={App} onEnter={handleOnEnter}>
            <Redirect from='/redirect' to='/booth/list' />
            <Redirect from='/booth' to='/booth/list' />
            <Redirect from='/booth/detail' to='/booth/detail/baseInfo' />
            <Route path='/booth'>
                <Route path='/booth/list' component={BoothList} />
                <Route path='/booth/detail' component={BoothDetail}>
                    <Route path='/booth/detail/baseInfo' component={BoothDetailBase} />
                    <Route path='/booth/detail/gps' component={BoothDetailGps} />
                    <Route path='/booth/detail/category' component={BoothDetailCategory} />
                    <Route path='/booth/detail/product' component={BoothDetailProduct} />
                    <Route path='/booth/detail/img' component={Img} />
                    <Route path='/booth/detail/h5' component={BoothDetailH5} />
                </Route>
            </Route>

            <Redirect from='/category' to='/category/booth/list' />
            <Redirect from='/category/booth' to='/category/booth/list' />
            <Redirect from='/category/normal' to='/category/normal/list' />
            <Redirect from='/category/booth/detail' to='/category/booth/detail/baseInfo' />
            <Redirect from='/category/normal/detail' to='/category/normal/detail/baseInfo' />
            <Route path='/category'>
                <Route path='/category/booth/list' component={CategoryBoothList} />
                <Route path='/category/booth/detail' component={CategoryBoothDetail}>
                    <Route path='/category/booth/detail/baseInfo' component={CategoryDetailBase} />
                    <Route path='/category/booth/detail/img' component={Img} />
                    <Route path='/category/booth/detail/product' component={CategoryDetailProduct} />
                    <Route path='/category/booth/detail/booth' component={CategoryDetailBooth} />
                </Route>
                {/* 一般分类相关 */}
               <Route path='/category/normal/list' component={CategoryNormalList} />
               <Route path='/category/normal/detail' component={CategoryNormalDetail}>
                   <Route path='/category/normal/detail/baseInfo' component={CategoryDetailBase} />
                   <Route path='/category/normal/detail/img' component={Img} />
                   <Route path='/category/normal/detail/product' component={CategoryDetailProduct} />
               </Route>
            </Route>

            {/* 商品分类*/}
            <Redirect from='/product' to='/product/list' />
            <Redirect from='/product/detail' to='/product/detail/baseInfo' />
            <Route path='/product'>
                <Route path='/product/list' component={ProductList} />
                <Route path='/product/detail' component={ProductDetail}>
                    <Route path='/product/detail/baseInfo' component={ProductDetailBase} />
                    <Route path='/product/detail/retailInfo' component={ProductDetailRetail} />
                    <Route path='/product/detail/wholesaleInfo' component={ProductDetailWholesale} />
                    <Route path='/product/detail/boothCategoryInfo' component={ProductDetailBooth} />
                    <Route path='/product/detail/commonCategoryInfo' component={ProductDetailNormal} />
                    <Route path='/product/detail/picInfo' component={Img} />
                    <Route path='/product/detail/qualityReportPicInfo' component={ProductDetailQualityReportPic} />
                    <Route path='/product/detail/h5Info' component={ProductDetailH5} />
                </Route>
            </Route>
            {/* 用户 */}
            <Redirect from='/user' to='/user/list' />
            <Route path='/user'>
                <Redirect from='/user/detail' to='/user/detail/baseInfo' />
                <Route path='/user/list' component={UserList} />
                <Route path='/user/detail' component={UserDetail}>
                    <Route path='/user/detail/baseInfo' component={UserDetailBase} />
                    <Route path='/user/detail/img' component={UserDetailImg} />
                    <Route path='/user/detail/gps' component={UserDetailGps} />
                    <Route path='/user/detail/rechargeCardInfo' component={UserDetailRecharge} />
                    <Route path='/user/detail/rechargeCardUsed' component={UserDetailUsed} />
                </Route>
            </Route>

            <Redirect from='/order' to='/order/list' />
            <Route path='/order'>
                <Route path='/order/list' component={OrderList} />
                <Route path='/order/detail' component={OrderDetail} />

                <Redirect from='/order/rechargeCard/detail' to='/order/rechargeCard/detail/baseInfo' />
                <Redirect from='/order/rechargeCard' to='/order/rechargeCard/list' />
                <Route path='/order/rechargeCard/list' component={RechargeCardList}/>
                <Route path='/order/rechargeCard/detail' component={RechargeCardDetail}>
                    <Route path='/order/rechargeCard/detail/baseInfo' component={RechargeCardDetailBase}/>
                </Route>
                <Route path='/order/rechargeCard/salesList' component={RechargeCardSalesList}/>
            </Route>
        </Route>
    </Router>
}
