/**
 * Created by xunzhi on 2017/6/15.
 */
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { create, query } from '../../services/rechargecard'
import {defaultPagination} from '../../utils/config'

import { parse } from 'qs'

export default {

    namespace: 'rechargeCardList',

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
                if (location.pathname === '/order/rechargeCard/list') {
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
            const data = yield call(query, parse(payload))
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data.rechargeCardList,
                        pagination: {
                            current: data.data.curPage,
                            total: data.data.totalPageNum * data.data.numPerPage
                        }
                    }
                })
            }
        },
        *create ({payload}, {call, put}) {
            const data = yield call(create, parse(payload));
            if (data && data.data && data.data.rechargeCardId) {

                message.success('添加成功')
                yield put({type: 'hideModal'})

                yield put(routerRedux.push({
                    pathname: '/order/rechargeCard/detail/baseInfo',
                    query: {
                        id: data.data.rechargeCardId
                    }
                }))
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
        showModal (state, action) {
            return { ...state, ...action.payload, modalVisible: true }
        },
        hideModal (state) {
            return { ...state, modalVisible: false }
        }
    }

}

