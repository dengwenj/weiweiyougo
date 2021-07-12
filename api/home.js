import requsrt from '../request/request'

// 获取轮播图列表
export const swiper = () => {
  return requsrt({
    url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    method: 'GET'
  })
}

// 导航数据
export const nav = () => {
  return requsrt({
    url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
    method: 'GET'
  })
}