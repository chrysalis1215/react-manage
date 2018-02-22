import dva from 'dva';
import {parse} from 'qs';
import {defaultPagination} from '../../utils/config';
import {queryDetailInfo} from '../../services/order';

export default {
    namespace: 'orderDetail',
    state: {
        title: '',
        customerServicePhone: '',
        remarksStatus: '', //暂时不需要展示,忽略
        contactPhone: '',
        paymentTime: '', //暂时不需要展示,忽略
        paymentMode: '',
        receivingTime: [], 
        orderProducts: [],
        deliveryLine: '',
        totalMoney: '',
        userPhone: '',
        createTime: '',
        printStatus: '',
        agentMemberGroup: '',
        remarksMessage: '',
        orderStatus: '',
        contactName: '',
        boothInfo: {
            images: [],
            id: '',
            name: ''
        },
        superOrderId: '',
        contactAddress: '',
        distributionCenter: '',
        dispatchName: '',
        dispatchPhone: '',
        orderNumber: '',
        basketInfo: '',
        sysRemarksMessage: '',
        totalVolume: ''
    },
    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/order/detail') {
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
            let query = payload;
            let result = yield call(queryDetailInfo, parse(query))
            if (result && result.data) {
                yield put ({
                    type: 'querySuccess',
                    payload: {
                        data: result.data
                    }
                })
            }
        }
    },
    reducers: {
        querySuccess(state, action) {
            let {data} = action.payload;
            data.receivingTime = data.receivingTime.join(' - ')
            return {
                ...state,
                ...data
            }
        }
    }
}
