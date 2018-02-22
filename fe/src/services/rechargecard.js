/**
 * Created by xunzhi on 2017/6/15.
 */
import { request } from '../utils'
import { deleteEmptyProperty } from '../utils/tools'

import {defaultPagination} from '../utils/config'
const DEFAULT_PAGE_SIZE =  defaultPagination.defaultPageSize;

export async function query(params) {
    const {
        page = 1,
        pageSize = DEFAULT_PAGE_SIZE,
    } = params;

    let body = {
        'curPage': +page,
        'numPerPage': +pageSize,
    };

    deleteEmptyProperty(body);

    return request('/rechargeCard/v1/list', {
        method: 'post',
        data: body
    });
}

export async function queryDetailInfo (params, type) {
    let {
        id,
        page,
        pageSize,
        condition
    } = params

    let body = {
        'id': id || 1,
        'type': type || 'baseInfo',
        'curPage': +page || 1,
        'numPerPage': +pageSize || DEFAULT_PAGE_SIZE,
        'condition': JSON.parse(condition || '{}')
    }

    deleteEmptyProperty(body)

    return request('/rechargeCard/v1/info', {
        method: 'post',
        data: body
    })
}

export async function create (data) {

    return request('/rechargeCard/v1/add', {
        method: 'post',
        data: data
    })
}

export async function modify (data) {

    return request('/rechargeCard/v1/modify', {
        method: 'post',
        data: data
    })
}

export async function querySales(params) {
    const {
        page = 1,
        pageSize = DEFAULT_PAGE_SIZE,
        id,
        orderId,
        userPhone,
        buyTimeMin,
        buyTimeMax
    } = params;

    let body = {
        'curPage': +page,
        'numPerPage': +pageSize,
        'id': id && +id,
        'orderId': orderId,
        'userPhone': userPhone,
        'buyTime': {
            'min': buyTimeMin,
            'max': buyTimeMax
        }
    };

    deleteEmptyProperty(body);

    return request('/rechargeCard/v1/salesList', {
        method: 'post',
        data: body
    });
}
