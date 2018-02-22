/**
 * @fileOverview  分类管理-商家分类-分类详情
 */
import dva from 'dva';
import { queryCategoryInfo, queryProductInfo, queryDetailInfo, modify } from '../../services/category';
import {parse} from 'qs';
import {defaultPagination} from '../../utils/config';

export default {
  namespace: 'categoryNormalDetail',
  state: {
    id: '',
    baseInfo: {},
    productInfo: {
        list: [],
        pagination: defaultPagination
    },
    picInfo: [],
  },
  reducers: {
    baseInfo(state, action) {
        let {data} = action.payload;
      return {
        ...state,
        baseInfo: data
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
    id(state, action) {
        return {
            ...state,
            id: action.payload.id
        }
    }
  },
  effects: {
    *queryDetailInfo ( {payload}, {call, put}) {
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
        body.type = type;
        body.id = yield select(state => state.categoryNormalDetail.id);
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
        if (location.pathname.indexOf('/category/normal/detail') !== -1) {
            let type = 'baseInfo';
            switch (location.pathname) {
                case '/category/normal/detail':
                case '/category/normal/detail/baseInfo':
                    break;
                case '/category/normal/detail/booth':
                    type = 'boothInfo'
                    break;
                case  '/category/normal/detail/product':
                    type = 'productInfo'
                    break;
                case '/category/normal/detail/img':
                    type = 'picInfo'
                    break;
            }
            dispatch({
                type: 'queryDetailInfo',
                payload: {
                    query: location.query,
                    type: type,
                }
            })
            dispatch({
                type: 'id',
                payload: {
                    id: location.query.id
                }
            })
        }
      })
    }
  },
};
