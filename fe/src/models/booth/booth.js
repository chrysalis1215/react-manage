import dva from 'dva';
import { routerRedux } from 'dva/router'
import { create, remove, update, query } from '../../services/booth'
import {parse} from 'qs'
import {defaultPagination} from '../../utils/config'

export default {
  namespace: 'booth',
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
        if (location.pathname === '/booth/list') {
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
                    list: data.data.boothList,
                    pagination: {
                      current: data.data.curPage,
                      total: data.data.totalPageNum * data.data.numPerPage
                    }
                }
            })
        }
    },
    *create ( {payload}, {call, put} ) {
        const data = yield call(create, parse(payload));
        if (data && data.data && data.data.boothId) {

            yield put({type: 'hideModal'})

            yield put(routerRedux.push({
                pathname: '/booth/detail/baseInfo',
                query: {
                    boothId: data.data.boothId
                }
            }))
        }

    },
    *delete ({payload}, {call, pull}) {
      let id = payload.id;

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
  }
};
