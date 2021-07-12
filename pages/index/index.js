// 网络请求
import { swiper, nav } from '../../api/home'

Page({
  data: {
    swiperList: [], // 轮播图数组
    navList: []
  },

  onLoad: function() {
    // 发送请求
    this.getSwiper() // 获取轮播图
    this.getNav() // 获取导航

  },

  async getSwiper() {
    // 发送请求  我这里封装了两层
    const { data } = await swiper()
    this.setData({
      swiperList: data.message
    })

    // let obj = { yy: 44, gg: 22 };
    // let obj1 = {
    //   ...obj,
    //   jj: 555,
    //   tt: 777
    // } 也是合并的意思
    // console.log(obj1);
  },

  async getNav() {
    const { data } = await nav()
    this.setData({
      navList: data.message
    })
  },

  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap: function(item) {

  }
});