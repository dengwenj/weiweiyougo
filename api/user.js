import request from "../request/request"

export const token = data => {
  return request({
    url: '/users/wxlogin',
    method: 'POST',
    data
  })
}