// 网络请求
import requsrt from '../../request/request'

Page({
  data: {
    swiperList: [] // 轮播图数组
  },

  onLoad: async function(options) {
    // 发送请求  我这里封装了一层
    const { data } = await requsrt('/api/public/v1/home/swiperdata', 'GET')
    this.setData({
      swiperList: data.message
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