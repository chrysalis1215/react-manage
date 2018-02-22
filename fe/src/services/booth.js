import { request } from '../utils'
import { deleteEmptyProperty } from '../utils/tools'
import {defaultPagination} from '../utils/config'

const DEFAULT_PAGE_SIZE =  defaultPagination.defaultPageSize;
export async function query (params) {
    let {page=1, pageSize=DEFAULT_PAGE_SIZE, searchKey, id, name, businessScope, enable, categoryNumMin, categoryNumMax, productNumMin, productNumMax, priorityMin, priorityMax} = params;
    let body = {
        "curPage":+page,
        "numPerPage":+pageSize,
        "searchKey": searchKey,
        "id":id,
        "name":name,
        "businessScope": businessScope && +businessScope,
        "enable": enable && +enable,
        "categoryNum": {
            "min": categoryNumMin && +categoryNumMin,
            "max": categoryNumMax && +categoryNumMax
        },
        "productNum": {
            "min": productNumMin && +productNumMin,
            "max": productNumMax && +productNumMax
        },
        "priority": {
            "min": priorityMin && +priorityMin,
            "max": priorityMax && +priorityMax
        }
    }
    deleteEmptyProperty(body);

    return request('/booth/v1/list', {
        method: 'post',
        data: body
    })
}

export async function removeBooth (params, type) {
    let {
        boothId,
        page,
        pageSize,
        condition
    } = params

    let body = {
        'id': boothId || 1,
        'type': type || 'baseInfo',
        'curPage': +page || 1,
        'numPerPage': +pageSize || DEFAULT_PAGE_SIZE,
        'condition': JSON.parse(condition || '{}')
    }

    deleteEmptyProperty(body)

    return request('/booth/v1/info', {
        method: 'post',
        data: body
    })
}

export async function queryDetailInfo (params, type) {
    let {
        boothId,
        page,
        pageSize,
        condition
    } = params

    let body = {
        'id': boothId || 1,
        'type': type || 'baseInfo',
        'curPage': +page || 1,
        'numPerPage': +pageSize || DEFAULT_PAGE_SIZE,
        'condition': JSON.parse(condition || '{}')
    }

    deleteEmptyProperty(body)

    return request('/booth/v1/info', {
        method: 'post',
        data: body
    })
}

export async function modify (data) {

    return request('/booth/v1/modify', {
        method: 'post',
        data: data
    })
}

export async function create (data) {

    return request('/booth/v1/add', {
        method: 'post',
        data: data
    })
}

