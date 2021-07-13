import requsrt from "../request/request"

// 商品分类
export const getCategory = () => {
  return requsrt({
    url: '/categories',
    method: 'GET'
  })
}