import { request } from '../utils'
import { deleteEmptyProperty } from '../utils/tools'

import {defaultPagination} from '../utils/config'
const DEFAULT_PAGE_SIZE =  defaultPagination.defaultPageSize;


export async function query(params) {
    const {
        page = 1,
        pageSize = DEFAULT_PAGE_SIZE,
        productName,
        userPhone,
        orderNumber,
        userName,
        orderStatus,
        deliveryLine,
        createTimeMin,
        createTimeMax
    } = params;

    let body = {
        'curPage': +page,
        'numPerPage': +pageSize,
        'productName': productName,
        'userPhone': userPhone,
        'orderNumber': orderNumber && +orderNumber,
        'userName': userName,
        'orderStatus': orderStatus && +orderStatus,
        'deliveryLine': deliveryLine && +deliveryLine,
        'createTime': {
            'min': createTimeMin,
            'max': createTimeMax
        }
    };

    deleteEmptyProperty(body);

    return request('/order/v1/list', {
        method: 'post',
        data: body
    });
}

export async function queryDetailInfo(params) {
    const {orderNumber} = params;

    let body = {
        'orderNumber': +orderNumber
    };

    deleteEmptyProperty(body);

    return request('/order/v1/info', {
        method: 'post',
        data: body
    });
}
