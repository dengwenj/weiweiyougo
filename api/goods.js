import request from '../request/request'

// 商品列表
export const goodsSearch = data => {
  return request({
    url: '/goods/search',
    method: 'GET',
    data
  })
}

// 商品详情
export const getGoodsDetail = data => {
  return request({
    url: '/goods/detail',
    method: 'GET',
    data
  })
}

// 商品搜索
export const categorySearch = data => {
  return request({
    url: '/goods/qsearch',
    method: 'GET',
    data
  })
}