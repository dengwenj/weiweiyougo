// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '综合',
      isActive: true,
    }, {
      id: 1,
      name: '销量',
      isActive: false,
    }, {
      id: 0,
      name: '价格',
      isActive: false,
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
  },

  // 自定义事件 子传父
  ItemTap(e) {
    const detail = e.detail
    const { tabs } = this.data
    tabs.forEach((item, index) => {
      index === detail ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })
  }
})