import { request } from '../utils'
import { deleteEmptyProperty } from '../utils/tools'


import {defaultPagination} from '../utils/config'
const DEFAULT_PAGE_SIZE =  defaultPagination.defaultPageSize;

export async function list(params) {
    let {
        page,
        pageSize,
        keyword,
        id,
        name,
        enable,
        priorityMin,
        priorityMax,
        boothName
    } = params;

    let body = {
        'curPage': +page || 1,
        'numPerPage': +pageSize || DEFAULT_PAGE_SIZE,
        'searchKey': keyword,
        'id': id,
        'name': name,
        'enable': enable && +enable,
        'priority': {
            'min': priorityMin && +priorityMin,
            'max': priorityMax && +priorityMax
        },
        'boothName': boothName
    };
    deleteEmptyProperty(body);

    return request('/product/v1/list', {
        method: 'post',
        data: body,
    })
}

export async function queryDetailInfo(params, type) {
    let {
        id,
        page,
        pageSize,
        condition
    } = params;
    let body = {
        'id': +id || '',
        'type': type || 'baseInfo',
        'curPage': +page || 1,
        'numPerPage': +pageSize || DEFAULT_PAGE_SIZE,
        'condition': JSON.parse(condition || '{}')
    }

    deleteEmptyProperty(body)

    return request('/product/v1/info', {
        method: 'post',
        data: body
    })
}


export async function modify (data) {

    return request('/product/v1/modify', {
        method: 'post',
        data: data
    })
}

export async function create (data) {

    return request('/product/v1/add', {
        method: 'post',
        data: data
    })
}

