import { request } from '../utils'
import { deleteEmptyProperty } from '../utils/tools'

export async function queryFirstCategory() {
    return request('/appClassification/v1/adminFirstLevelList', {
        method: 'post',
        data: {}
    }).then((res) => {
        res.data = res.data.map((item) => {return item.name});
        return res;
    });
}

export async function querySecondaryCategory(params) {
    return request('/appClassification/v1/adminSecondLevelList', {
        method: 'post',
        data: params
    })
}

export async function searchByBoothName(params) {
    return request('/booth/v1/boothNameList', {
        method: 'post',
        data: params
    })
}

export async function searchByCategoryName(params) {
    return request('/category/v1/categoryNameList', {
        method: 'post',
        data: params
    })
}

export async function queryMemberGroup (params) {
    return Promise.resolve({
        data: [{name: 'VIP'}]
    });
    return request('/common/v1/memberGroup/list', {
        method: 'post',
        data: {}
    })
}

export async function queryBusinessType (params) {

    return request('/common/v1/adminBusinessType/list', {
        method: 'post',
        data: {}
    })
}

export async function queryFlavor (params) {

    return request('/common/v1/adminFlavor/list', {
        method: 'post',
        data: {}
    })
}


export async function queryBusinessScope (params) {

    return request('/common/v1/adminBusinessScope/list', {
        method: 'post',
        data: {}
    })
}

export async function queryBusinessArea (params) {

    return request('/common/v1/adminBusinessArea/list', {
        method: 'post',
        data: {}
    })
}

export async function queryDistributionCenter (params) {

    return request('/common/v1/adminDistributionCenter/list', {
        method: 'post',
        data: {}
    })
}

export async function queryDeliveryLine(params) {

    return request('/common/v1/adminDeliveryLine/list', {
        method: 'post',
        data: {}
    })
}

export async function queryProductCategory (params) {

    return request('/common/v1/adminProductClassification/list', {
        method: 'post',
        data: {}
    })
}

export async function queryImage (params) {

    return request('/common/v1/adminImage/upload', {
        method: 'post',
        data: {}
    })
}


