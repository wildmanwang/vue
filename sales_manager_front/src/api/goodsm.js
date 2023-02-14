import request from '@/utils/request'

export function fetchBasicDataList(query) {
  return request({
    url: '/goods/basicDataList',
    method: 'get',
    params: query
  })
}

export function deleteBasicData(data) {
  return request({
    url: '/goods/basicDataDelete',
    method: 'post',
    data
  })
}

export function newBasicData(data) {
  return request({
    url: '/goods/basicDataNew',
    method: 'post',
    data
  })
}

export function modifyBasicData(data) {
  return request({
    url: '/goods/basicDataModify',
    method: 'post',
    data
  })
}
