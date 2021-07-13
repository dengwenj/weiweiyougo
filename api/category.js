import requsrt from "../request/request"

// 商品分类
export const getCategory = () => {
  return requsrt({
    url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
    method: 'GET'
  })
}