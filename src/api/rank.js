import request from '@/utils/request'
// import Qs from 'qs';

export function rankList(data) {
  return request({
    url: '/user/rank',
    method: 'get',
    params: data
  })
}
