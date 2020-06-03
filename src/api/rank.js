import request from '@/utils/request'
// import Qs from 'qs';

export function rankList(data) {
  return request({
    url: '/user/rank',
    method: 'get',
    params: data
  })
}

export function getUserDetal(params) {
  return request({
    url: '/admin/records',
    method: 'get',
    params
  })
}
