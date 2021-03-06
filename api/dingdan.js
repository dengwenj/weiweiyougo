import request from "../request/request"

// 创建订单
export const cjOrder = data => {
  return request({
    url: '/my/orders/create',
    method: 'POST',
    data
  })
}

// 查询后台 订单状态
export const chkOrder = data => {
  return request({
    utl: '/my/orders/chkOrder',
    method: 'POST',
    data
  })
}

// 历史订单查询
export const lshiOrder = data => {
  return request({
    url: '/my/orders/all',
    method: 'GET',
    data
  })
}