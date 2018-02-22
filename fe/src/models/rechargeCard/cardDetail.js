import { queryDetailInfo, modify } from '../../services/rechargecard'
import {parse} from 'qs'

export default {
  namespace: 'rechargeCardDetail',
  state: {
    id: '',
    baseInfo: {}
  },
  reducers: {
    baseInfo(state, action) {
        let {data} = action.payload;
      return {
        ...state,
        baseInfo: data
      }
    },
    id(state, action) {
        return {
            ...state,
            id: action.payload.id
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
        let id = yield select(state => state.rechargeCardDetail.id);
        body.type = type;
        body.id = id;
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
        if (location.pathname.indexOf('/order/rechargeCard/detail') === 0) {
            let type = 'baseInfo';
            switch (location.pathname) {
                case '/order/rechargeCard/detail':
                case '/order/rechargeCard/detail/baseInfo':
                    type = 'baseInfo'
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
                type: 'id',
                payload: {
                    id: location.query.id
                }
            });
        }
      })
    }
  },
};
