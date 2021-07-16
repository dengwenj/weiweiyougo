import request from "../request/request"

// 创建订单
export const cjOrder = (header, data) => {
  return request({
    url: '/my/orders/create',
    method: 'POST',
    header,
    data
  })
}

// 查询后台 订单状态
export const chkOrder = (header, data) => {
  return request({
    utl: '/my/orders/chkOrder',
    method: 'POST',
    header,
    data
  })
}