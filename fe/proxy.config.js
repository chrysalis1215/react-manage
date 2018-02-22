// const mock = {}

// require('fs').readdirSync(require('path').join(`./mock`)).forEach((file) => {
//   Object.assign(mock, require(file))
// })

var mockjs = require('mockjs');
// import {hostname} from './src/utils/hostname';
const HOST = 'http://47.93.1.56';
module.exports = {
    // '/*': 'http://59.110.25.240/*'
    '/booth/v1/list': `${HOST}/booth/v1/list`,
    '/booth/v1/add': `${HOST}/booth/v1/add`,
    '/booth/v1/info': `${HOST}/booth/v1/info`,
    '/booth/v1/modify': `${HOST}/booth/v1/modify`,
    '/category/v1/list': `${HOST}/category/v1/list`,
    '/category/v1/add': `${HOST}/category/v1/add`,
    '/category/v1/info': `${HOST}/category/v1/info`,
    '/category/v1/modify': `${HOST}/category/v1/modify`,
    '/product/v1/list': `${HOST}/product/v1/list`,
    '/user/v1/list': `${HOST}/user/v1/list`,
    '/user/v1/modify': `${HOST}/user/v1/modify`,
    '/user/v1/info': `${HOST}/user/v1/info`,
    '/product/v1/info': `${HOST}/product/v1/info`,
    '/product/v1/add': `${HOST}/product/v1/add`,
    '/product/v1/modify': `${HOST}/product/v1/modify`,
    '/order/v1/list': `${HOST}/order/v1/list`,
    '/order/v1/info': `${HOST}/order/v1/info`,
    '/rechargeCard/v1/list': `${HOST}/rechargeCard/v1/list`,
    '/rechargeCard/v1/info': `${HOST}/rechargeCard/v1/info`,
    '/rechargeCard/v1/add': `${HOST}/rechargeCard/v1/add`,
    '/rechargeCard/v1/modify': `${HOST}/rechargeCard/v1/modify`,
    '/rechargeCard/v1/salesList': `${HOST}/rechargeCard/v1/salesList`,
    '/user/v1/login': `${HOST}/user/v1/login`,
    '/user/v1/logout': `${HOST}/user/v1/logout`,
    '/common/v1/memberGroup/list': mockjs.mock({
        'data': [{
            name: 'YYY'
        }, {
            name: 'VIP'
        }, {
            name: 'XXX'
        }]
    }),
    '/common/v1/adminFlavor/list': `${HOST}/common/v1/adminFlavor/list`,
    '/common/v1/adminBusinessType/list': `${HOST}/common/v1/adminBusinessType/list`,
    '/common/v1/adminBusinessScope/list': `${HOST}/common/v1/adminBusinessScope/list`,
    '/common/v1/adminBusinessArea/list': `${HOST}/common/v1/adminBusinessArea/list`,
    '/common/v1/adminDistributionCenter/list': `${HOST}/common/v1/adminDistributionCenter/list`,
    '/common/v1/adminProductClassification/list': `${HOST}/common/v1/adminProductClassification/list`,
    '/common/v1/adminDeliveryLine/list': `${HOST}/common/v1/adminDeliveryLine/list`,
    '/common/v1/adminImage/list': `${HOST}/common/v1/adminImage/list`,
    '/common/v1/adminImage/upload': `${HOST}/common/v1/adminImage/upload`,
    '/booth/v1/boothNameList': `${HOST}/booth/v1/boothNameList`,
    '/category/v1/categoryNameList': `${HOST}/category/v1/categoryNameList`,
    '/appClassification/v1/adminFirstLevelList': `${HOST}/appClassification/v1/adminFirstLevelList`,
    '/appClassification/v1/adminSecondLevelList': `${HOST}/appClassification/v1/adminSecondLevelList`
}
