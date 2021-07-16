// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '全部',
      isActive: true
    }, {
      id: 1,
      name: '待付款',
      isActive: false
    }, {
      id: 2,
      name: '待发货',
      isActive: false
    }, {
      id: 3,
      name: '退款/退货',
      isActive: false
    }, ]
  },

  handleItemTap(e) {
    const { detail } = e
    const { tabs } = this.data
    tabs.forEach((item, index) => {
      detail === index ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })
  }
})