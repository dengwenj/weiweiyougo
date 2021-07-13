import request from '../request/request'

export const goodsSearch = data => {
  return request({
    url: '/goods/search',
    method: 'GET',
    data
  })
}