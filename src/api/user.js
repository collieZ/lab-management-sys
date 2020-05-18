import request from '@/utils/request'
import Qs from 'qs';

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/user/detail',
    method: 'get'
    // params: { token }
  })
}

export function regiter(data) {
  return request({
    url: '/user/signup',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function regiterApply(params = {}) { // 查看申请列表
  return request({
    url: '/admin/audit',
    method: 'get',
    params
  })
}

export function agreeApply(data) {  // 同意/取消申请
  return request({
    url: '/admin/audit',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
