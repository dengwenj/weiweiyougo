// 网络请求
import { swiper } from '../../api/home'

Page({
  data: {
    swiperList: [] // 轮播图数组
  },

  onLoad: async function() {
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