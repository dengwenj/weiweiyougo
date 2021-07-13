import requsrt from '../request/request'

// 获取轮播图列表
export const swiper = () => {
  return requsrt({
    url: '/home/swiperdata',
    method: 'GET'
  })
}

// 导航数据
export const nav = () => {
  return requsrt({
    url: '/home/catitems',
    method: 'GET'
  })
}

// 楼层数据
export const floor = () => {
  return requsrt({
    url: '/home/floordata',
    method: 'GET'
  })
}