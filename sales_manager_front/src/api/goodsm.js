import request from '@/utils/request'

export function fetchBasicDataList(query) {
  return request({
    url: '/basicDataList',
    method: 'get',
    params: query
  })
}

export function deleteBasicData(data) {
  return request({
    url: '/basicDataDelete',
    method: 'post',
    data
  })
}

export function newBasicData(data) {
  return request({
    url: '/basicDataNew',
    method: 'post',
    data
  })
}

export function modifyBasicData(data) {
  return request({
    url: '/basicDataModify',
    method: 'post',
    data
  })
}
