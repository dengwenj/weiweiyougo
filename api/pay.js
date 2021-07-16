import request from "../request/request"

// 获取支付参数
export const getPayParams = data => {
  return request({
    url: '/my/orders/req_unifiedorder',
    method: 'POST',
    data
  })
}