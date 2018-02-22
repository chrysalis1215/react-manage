/**
 * @fileOverview  商家管理-商家列表-商家详情
 */
import dva from 'dva';
import { queryCategoryInfo, queryProductInfo, queryDetailInfo, save, modify } from '../../services/booth'
import { queryBusinessScope, queryBusinessArea, queryDistributionCenter, queryDeliveryLine, queryProductClassification } from '../../services/common'
import {parse} from 'qs'
import {defaultPagination} from '../../utils/config'

export default {
  namespace: 'boothDetail',
  state: {
    boothId: '',
    baseInfo: {},
    addressInfo: {},
    categoryInfo: {
        list: [],
        pagination: defaultPagination
    },
    productInfo: {
        list: [],
        pagination: defaultPagination
    },
    picInfo: [],
    h5Info: {},
  },
  reducers: {
    baseInfo(state, action) {
        let {data} = action.payload;
        let { businessScope, businessArea, ...newData} = data;
        newData.businessScope = businessScope;
        newData.businessArea =  businessArea && businessArea[0];
      return {
        ...state,
        baseInfo: newData
      }
    },
    addressInfo(state, action) {
        let {data} = action.payload;
      return {
        ...state,
        addressInfo: data
      }
    },
    categoryInfo(state, action) {
        const {
            categoryList, 
            curPage, 
            numPerPage,
            totalPageNum
        } = action.payload.data

        return {
            ...state,
            categoryInfo: {
                list: categoryList,
                pagination: {
                    ...state.categoryInfo.pagination,
                    current: curPage,
                    total: totalPageNum * numPerPage
                }
            }
        }
    },
    productInfo(state, action) {
        const {
            productList, 
            curPage, 
            numPerPage,
            totalPageNum
        } = action.payload.data

        return {
            ...state,
            productInfo: {
                list: productList,
                pagination: {
                    ...state.productInfo.pagination,
                    current: curPage,
                    total: totalPageNum * numPerPage
                }
            }
        }
    },
    picInfo(state, action) {
        return {
            ...state,
            picInfo: action.payload.data
        }
    },
    h5Info(state, action) {
        return {
            ...state,
            h5Info: action.payload.data
        }
    },
    boothId(state, action) {
        return {
            ...state,
            boothId: action.payload.boothId
        }
    },
  },
  effects: {
    *query ( {payload}, {call, put}) {
        let {query, type} = payload;
        let result = yield call(queryDetailInfo, parse(query), type)
        if (result && result.data) {
            yield put ({
                type: `${type}`,
                payload: {
                    data: result.data[type]
                }
            })
        }
    },
    *modify ( {payload}, {call, put, select}, location) {
        let {data, type} = payload;
        let body = data;
        let boothId = yield select(state => state.boothDetail.boothId);
        body.type = type;
        body.id = boothId;
        let result = yield call(modify, body);
        if (result.err === 0) {
            yield put ({
                type: 'app/modifySuccess',
                payload: {
                    tip: '修改成功'
                }
            })
        } else {
            yield put({
                type: 'app/modifyFail',
                payload: {
                    tip: result.msg
                }
            })
        }
    }
  },
  subscriptions: {
    setup ({ dispatch, history, getState }) {
      history.listen(location => {
        if (location.pathname.indexOf('/booth/detail') === 0) {
            let type = 'baseInfo';
            switch (location.pathname) {
                case '/booth/detail':
                case '/booth/detail/baseInfo':
                    break;
                case '/booth/detail/gps':
                    type = 'addressInfo'
                    break;
                case '/booth/detail/category':
                    type = 'categoryInfo'
                    break;
                case  '/booth/detail/product':
                    type = 'productInfo'
                    break;
                case '/booth/detail/img':
                    type = 'picInfo'
                    break;
                case '/booth/detail/h5':
                    type = 'h5Info'
                    break;
            }
            dispatch({
                type: 'query',
                payload: {
                    query: location.query,
                    type: type,
                }
            });
            dispatch({
                type: 'boothId',
                payload: {
                    boothId: location.query.boothId
                }
            });
        }
      })
    }
  },
};
