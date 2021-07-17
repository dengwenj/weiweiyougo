// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '体验问题',
      isActive: true
    }, {
      id: 1,
      name: '商品 商检投诉',
      isActive: false
    }]
  },

  // 子传父
  ItemTap(e) {
    const { detail } = e
    const { tabs } = this.data
    tabs.forEach(item => {
      item.id === detail ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })
  }
})