import './index.html';
import createLoading from 'dva-loading';

// 时间控件
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import dva from 'dva';

// 1. Initialize
const app = dva({
    onEffect: function (effect, { put, call }, model, actionType) {
        return function*(...args) {
            let b = yield effect(...args);
        }
    },
    onError: function(e, dispatch) {
        // TODO 错误全局提示
        let msg = "";
        if (e) {
            if (e.status && e.statusText) {
                msg = e.status + ': ' + e.stateText;
            } else if (e.message) {
                msg = e.message;
            }

        }
        dispatch({
            type: 'app/error',
            payload: {
                msg
            }
        })
    }
});

// 处理loading中间件
app.use(createLoading({
    effects: {
        query: false,
        queryDetailInfo: false,
        modify: false
    }
}));
// 2. Model

app.model(require('./models/app'));
app.model(require('./models/dashboard'));

// booth
app.model(require('./models/booth/booth'));
app.model(require('./models/booth/boothDetail'));

// category
app.model(require('./models/category/booth'));
app.model(require('./models/category/boothDetail'));
app.model(require('./models/category/normal'));
app.model(require('./models/category/normalDetail'));

// 商品管理
app.model(require('./models/product/product'));
app.model(require('./models/product/productDetail'));

// 用户
app.model(require('./models/user/user'));
app.model(require('./models/user/userDetail'));

// 订单
app.model(require('./models/order/list'));
app.model(require('./models/order/detail'));

// 充值卡
app.model(require('./models/rechargeCard/list'));
app.model(require('./models/rechargeCard/cardDetail'));
app.model(require('./models/rechargeCard/salesList'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
