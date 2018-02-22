/**
 * @fileOverview 分类管理相关接口
 */
import { request } from '../utils'
import { deleteEmptyProperty } from '../utils/tools'

import {defaultPagination} from '../utils/config'
const DEFAULT_PAGE_SIZE =  defaultPagination.defaultPageSize;


// 商家列表相关
export async function query (params, type) {
  let categoryType = type ? type : 0;   
  let {page = 1, pageSize = DEFAULT_PAGE_SIZE, searchKey, id, name, enable, productNumMin, productNumMax, priorityMin, priorityMax, boothName} = params;
  let body = {
      "type": categoryType,
      "curPage": +page, 
      "numPerPage":+pageSize, 
      "searchKey": searchKey, 
      "id":id, 
      "name":name,
      "enable":enable && +enable, 
      "productNum": {
        "min":productNumMin && +productNumMin,
        "max":productNumMax && +productNumMax
      },
      "boothName": boothName,
      "priority": {
        "min":priorityMin,
        "max":priorityMax}
      }
      deleteEmptyProperty(body);
  return request('/category/v1/list', {
    method: 'post',
    data: body
  })
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

    return request('/category/v1/info', {
        method: 'post',
        data: body
    })
}


export async function create (params) {
  return request('/category/v1/add', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('/api/users', {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request('/api/users', {
    method: 'put',
    data: params
  })
}

export async function modify (data) {

    return request('/category/v1/modify', {
        method: 'post',
        data: data
    })
}


// 商品列表相关

export async function queryProductList (params) {
  return request('booth/v1/info?type=productInfo', {
    method: 'get',
    data: params
  })
}

export async function searchProductList (params) {
  return request('booth/v1/info?type=productInfo', {
    method: 'get',
    data: params
  })
}
