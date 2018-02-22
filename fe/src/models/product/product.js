import dva from 'dva';
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import {list, create} from '../../services/product'
import {parse} from 'qs'
import {defaultPagination} from '../../utils/config'

export default {
    namespace: 'product',
    state: {
        list: [],
        currentItem: {},
        modalVisible: false,
        modalType: 'create',
        pagination: defaultPagination
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/product/list') {
                    dispatch({
                        type: 'query',
                        payload: location.query
                    })
                }
            })
        }
    },
    effects: {
        *query({payload}, {call, put}) {
            const data = yield call(list, parse(payload));
            if (data && data.data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data.productList,
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
            if (data && data.data && data.data.productId) {

                message.success('添加成功')
                yield put({type: 'hideModal'})

                yield put(routerRedux.push({
                    pathname: '/product/detail/baseInfo',
                    query: {
                        id: data.data.productId
                    }
                }))
            }
        },

        *delete ({payload}, {call, pull}) {
            let productId = payload.productId;
            console.log('delete')
  
            // const data = yield call(remove, parse(payload));
            // if (data && data.data) {
            //   yield put({
            //     type: 'deleteSuccess',
            //     payload: {
            //       id: id
            //     }
            //   });
            // }
        }
    },
    reducers: {
        querySuccess(state, action) {
            const {list, pagination} = action.payload;
            return { 
                ...state,
                list,
                pagination: {
                    ...state.pagination,
                    ...pagination
                }
            }
        },
        deleteSuccess (state, { payload: id }) {
          return state.list.filter(item => item.id !== id);
        },
        showModal (state, action) {
          return { ...state, ...action.payload, modalVisible: true }
        },
        hideModal (state) {
          return { ...state, modalVisible: false }
        },
        edit (state, action) {
          return {
            ...state,
            modalVisible: true,
            currentItem: action.payload.currentItem,
            modalType: 'edit'
          }
        }
    }
}
