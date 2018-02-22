/**
 * Created by xunzhi on 2017/6/15.
 */
import { querySales } from '../../services/rechargecard'
import {defaultPagination} from '../../utils/config'

import { parse } from 'qs'

export default {

    namespace: 'rechargeCardSalesList',

    state: {
        list: [],
        loading: false,
        currentItem: {},
        modalVisible: false,
        modalType: 'create',
        pagination: defaultPagination
    },

    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/order/rechargeCard/salesList') {
                    dispatch({
                        type: 'query',
                        payload: location.query
                    })
                }
            })
        }
    },

    effects: {
        *query ({ payload }, { call, put }) {
            yield put({ type: 'showLoading' })
            const data = yield call(querySales, parse(payload))
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data.salesList,
                        pagination: {
                            current: data.data.curPage,
                            total: data.data.totalPageNum * data.data.numPerPage
                        }
                    }
                })
            }
        },
    },

    reducers: {
        showLoading (state) {
            return { ...state, loading: true }
        },
        querySuccess (state, action) {
            const {list, pagination} = action.payload
            return { ...state,
                list,
                loading: false,
                pagination: {
                    ...state.pagination,
                    ...pagination
                }}
        },
    }

}

