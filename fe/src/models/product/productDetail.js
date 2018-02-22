/**
 * @fileOverview  分类管理-商家分类-分类详情
 */
import dva from 'dva';
import {queryDetailInfo, modify } from '../../services/product';
import {parse} from 'qs';
import {defaultPagination} from '../../utils/config';

export default {
    namespace: 'productDetail',
    state: {
        id: '',
        baseInfo: {},
        retailInfo: {},
        wholesaleInfo: {},
        boothCategoryInfo: {
            list: [],
            pagination: defaultPagination
        },
        commonCategoryInfo: {
            list: [],
            pagination: defaultPagination
        },
        picInfo: [],
        qualityReportPicInfo: {},
        h5Info: {}
    },
    reducers: {
        baseInfo(state, action) {
            let {data} = action.payload;
            return {
                ...state,
                baseInfo: data
            }
        },
        retailInfo(state, action) {
            let {data} = action.payload;
            return {
                ...state,
                retailInfo: data
            }
        },
        wholesaleInfo(state, action) {
            let {data} = action.payload;
            return {
                ...state,
                wholesaleInfo: data
            }
        },
        qualityReportPicInfo(state, action) {
            let {data} = action.payload;
            return {
                ...state,
                qualityReportPicInfo: data
            }
        },
        boothCategoryInfo(state, action) {
            const {
                boothCategoryList, 
                curPage, 
                numPerPage,
                totalPageNum
            } = action.payload.data

            return {
                ...state,
                boothCategoryInfo: {
                    list: boothCategoryList,
                    pagination: {
                        ...state.boothCategoryInfo.pagination,
                        current: curPage,
                        total: totalPageNum * numPerPage
                    }
                }
            }
        },
        commonCategoryInfo(state, action) {
            const {
                commonCategoryList, 
                curPage, 
                numPerPage,
                totalPageNum
            } = action.payload.data
            return {
                ...state,
                commonCategoryInfo: {
                    list: commonCategoryList,
                    pagination: {
                        ...state.commonCategoryInfo.pagination,
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
            body.id = yield select(state => state.productDetail.id);
            body.id  = +body.id;
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
            if (location.pathname.indexOf('/product/detail') !== -1) {
                let type = 'baseInfo';
                switch (location.pathname) {
                    case '/product/detail':
                    case '/product/detail/baseInfo':
                        break;
                    case '/product/detail/retailInfo':
                        type = 'retailInfo'
                        break;
                    case  '/product/detail/wholesaleInfo':
                        type = 'wholesaleInfo'
                        break;
                    case '/product/detail/boothCategoryInfo':
                        type = 'boothCategoryInfo'
                        break;
                    case '/product/detail/commonCategoryInfo':
                        type = 'commonCategoryInfo'
                        break;
                    case '/product/detail/picInfo':
                        type = 'picInfo'
                        break;
                    case '/product/detail/qualityReportPicInfo':
                        type = 'qualityReportPicInfo'
                        break;
                    case '/product/detail/h5Info':
                        type = 'h5Info'
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
