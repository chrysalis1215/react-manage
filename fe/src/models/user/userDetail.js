/**
 * @fileOverview  商家管理-商家列表-商家详情
 */

import dva from 'dva';
import { queryDetailInfo, save, modify } from '../../services/user'
import { queryBusinessScope, queryBusinessArea, queryDistributionCenter, queryDeliveryLine, queryProductClassification } from '../../services/common'
import {parse} from 'qs'
import {defaultPagination} from '../../utils/config'

export default {
  namespace: 'userDetail',
  state: {
    phone: '',
    baseInfo: {},
    addressInfo: {},
    picInfo: [],
    h5Info: {},
    rechargeCardInfo: {
        list: [],
        pagination: defaultPagination
    },
    rechargeCardUsed: {
        list: [],
        pagination: defaultPagination
    },
  },
  reducers: {
    baseInfo(state, action) {
        let {data} = action.payload;
        // let { businessScope, businessArea, ...newData} = data;
        // newData.businessScope = businessScope && businessScope[0];
        // newData.businessArea =  businessArea && businessArea[0];
      return {
        ...state,
        baseInfo: data
      }
    },
    addressInfo(state, action) {
        let {data} = action.payload;
      return {
        ...state,
        addressInfo: data
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
    phone(state, action) {
        return {
            ...state,
            phone: action.payload.phone
        }
    },
    rechargeCardInfo(state, action) {
        const {
                salesList, 
                curPage, 
                numPerPage,
                totalPageNum
            } = action.payload.data

            return {
                ...state,
                rechargeCardInfo: {
                    list: salesList,
                    pagination: {
                        ...state.rechargeCardInfo.pagination,
                        current: curPage,
                        total: totalPageNum * numPerPage
                    }
                }
            }
    },    
    rechargeCardUsed(state, action) {
        const {
            usedList, 
            curPage, 
            numPerPage,
            totalPageNum
        } = action.payload.data

        return {
            ...state,
            rechargeCardUsed: {
                list: usedList,
                pagination: {
                    ...state.rechargeCardUsed.pagination,
                    current: curPage,
                    total: totalPageNum * numPerPage
                }
            }
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
                    data: result.data
                }
            })
        }
    },
    *modify ( {payload}, {call, put, select}, location) {
        let {data, type} = payload;
        let body = data;
        let phone = yield select(state => state.boothDetail.phone);
        body.type = type;
        body.phone = phone;
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
        if (location.pathname.indexOf('/user/detail') !== -1) {
            let type = 'baseInfo';
            switch (location.pathname) {
                case '/user/detail':
                case '/user/detail/baseInfo':
                    break;
                case '/user/detail/gps':
                    type = 'addressInfo'
                    break;
                case '/user/detail/img':
                    type = 'picInfo'
                    break;
                case '/user/detail/rechargeCardInfo':
                    type = 'rechargeCardInfo'
                    break;
                case '/user/detail/rechargeCardUsed':
                    type = 'rechargeCardUsed'
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
                type: 'phone',
                payload: {
                    phone: location.query.phone
                }
            });
        }
      })
    }
  },
};
