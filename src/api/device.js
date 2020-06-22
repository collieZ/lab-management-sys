import request from '@/utils/request'
// import Qs from 'qs';

/**
 * 获取器材列表
 */
export function deviceList(params) {
  return request({
    url: '/user/equipment',
    method: 'get',
    params
  })
}
