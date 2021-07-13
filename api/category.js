import request from "../request/request"

// 商品分类
export const getCategory = () => {
  return request({
    url: '/categories',
    method: 'GET'
  })
}