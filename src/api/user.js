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

/**
 * 获取成员列表，带权限
 * @param {object} role: all,member,admin,super_admin
 */
export function getMemberList(params = { role: 'all' }) {
  return request({
    url: '/admin/members',
    method: 'get',
    params
  })
}

/**
 * 设置/取消管理员
 */
export function manageAdmin(data) {
  return request({
    url: '/admin/setting',
    method: 'post',
    data: Qs.stringify(data)
  })
}

/**
 * 删除选中成员
 */
export function delMember(data) {
  return request({
    url: '/admin/delete_member',
    method: 'post',
    data: Qs.stringify(data)
  })
}

/**
 * 获取用户记录打卡时长
 */
export function getUserRecode() {
  return request({
    url: '/user/records',
    method: 'get'
  })
}

/**
 * 修改密码
 * @param {*} data
 */
export const updatePwd = async(data) => {
  const res = await request({ url: '/user/update_password', method: 'post', data: Qs.stringify(data) })
  return res
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

