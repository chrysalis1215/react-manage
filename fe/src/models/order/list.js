import dva from 'dva';
import { routerRedux } from 'dva/router'
import {query} from '../../services/order'
import {parse} from 'qs'
import {defaultPagination} from '../../utils/config'

export default {
    namespace: 'order',
    state: {
        list: [],
        pagination: defaultPagination
    },
    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/order/list') {
                    dispatch({
                        type: 'query',
                        payload: location.query
                    })
                }
            })
        }
    },
    effects: {
        *query ( {payload}, {call, put}) {
            const data = yield call(query, parse(payload));
            if (data && data.data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data.orderList,
                        pagination: {
                          current: data.data.curPage,
                          total: data.data.totalPageNum * data.data.numPerPage
                        }
                    }
                })
            }
        }
    },
    reducers: {
        querySuccess(state, action) {
            const {
                list, 
                pagination
            } = action.payload
            return { 
                ...state,
                list,
                pagination: {
                    ...state.pagination,
                    ...pagination
                }
            }
        }
    }
}
