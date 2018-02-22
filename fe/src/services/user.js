import { request } from '../utils'
import { deleteEmptyProperty } from '../utils/tools'
import {defaultPagination} from '../utils/config'

export async function query (params) {
    const {
        page = 1,
        pageSize = defaultPagination.defaultPageSize,
        phone,
        businessType,
        name,
        createTimeStart,
        createTimeEnd,
        businessArea,
        deliveryLine,
        receivingTimeStart,
        receivingTimeEnd,
        recommendName,
        totalExpenseMin,
        totalExpenseMax,
        consumptionLevel
    } = params;

    let body = {
        'curPage': +page,
        'numPerPage': +pageSize,
        'phone': phone,
        'businessType': businessType && +businessType,
        'name': name,
        'consumptionLevel': consumptionLevel,
        'createTime': {
            'min': createTimeStart,
            'max': createTimeEnd
        },
        'businessArea': businessArea && + businessArea,
        'deliveryLine': deliveryLine && +deliveryLine,
        'receivingTime': {
            'min': receivingTimeStart,
            'max': receivingTimeEnd,
        },
        'recommendName': recommendName,
        'totalExpense': {
            'min': totalExpenseMin,
            'max': totalExpenseMax
        }
    };
    deleteEmptyProperty(body)

    return request('/user/v1/list', {
        method: 'post',
        data: body
    });
}

export async function queryDetailInfo (params, type) {
    let {
        phone,
        condition
    } = params


    let body = {
        'phone': phone,
        'type': type,
    }

    if (condition) {
        let c  = JSON.parse(condition)
        body = Object.assign({}, body, c);
    }
    deleteEmptyProperty(body)

    return request('/user/v1/info', {
        method: 'post',
        data: body
    })
}

export async function modify (data) {

    return request('/user/v1/modify', {
        method: 'post',
        data: data
    })
}

export async function create (data) {

    return request('/user/v1/add', {
        method: 'post',
        data: data
    })
}

