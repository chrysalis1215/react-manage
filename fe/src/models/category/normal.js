/**
 * @fileOverview 分类管理－商家分类 model
 */
import dva from 'dva';
import { routerRedux } from 'dva/router'

import { query, create } from '../../services/category';
import {parse} from 'qs';
import {defaultPagination} from '../../utils/config';

export default {
    namespace: 'categoryNormalList',
    state: {
        list: [],
        currentItem: {},
        modalVisible: false,
        modalType: 'create',
        pagination: defaultPagination
    },
    reducers: {
        'deleteSuccess'(state, { payload: id }) {
            return state.list.filter(item => item.id !== id);
        },
        'querySuccess'(state, action) {
            const {list, pagination} = action.payload;
            return { ...state,
                list,
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
        },
        edit (state, action) {
          return {
            ...state,
            modalVisible: true,
            currentItem: action.payload.currentItem,
            modalType: 'edit'
          }
        }

    },
    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/category/normal/list') {
                    dispatch({
                        type: 'query',
                        payload: location.query
                    });
                }
            })
        }
    },
    effects: {
        *query({payload}, {call, put}) {
            let categoryType = 1;
            const data = yield call(query, parse(payload), categoryType);
            if (data && data.data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data.categoryList,
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
            if (data && data.data && data.data.categoryId) {
              
                yield put({type: 'hideModal'})

                yield put(routerRedux.push({
                    pathname: '/category/normal/detail/baseInfo',
                    query: {
                        id: data.data.categoryId
                    }
                }))
            }
        },
        *delete ({payload}, {call, pull}) {
          let id = payload.id;
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
        },
    }
};
