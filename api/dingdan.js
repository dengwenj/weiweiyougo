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