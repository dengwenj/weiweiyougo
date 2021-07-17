// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '商品收藏',
      isActive: true
    }, {
      id: 1,
      name: '品牌收藏',
      isActive: false
    }, {
      id: 2,
      name: '店铺收藏',
      isActive: false
    }, {
      id: 3,
      name: '浏览足迹',
      isActive: false
    }],
    collect: [], // 商品收藏
    detail: 0 // 索引
  },

  onShow() {
    // 页面栈
    const curPages = getCurrentPages()
    console.log(curPages);
    // 当前的页面就是最大索引
    const { id } = curPages[curPages.length - 1].options
    this.changeIndex(parseInt(id))

    const collect = wx.getStorageSync('collect')
    this.setData({
      collect
    })
  },

  changeIndex(detail) {
    console.log(detail);
    const { tabs } = this.data
    tabs.forEach(item => {
      item.id === detail ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs,
      detail
    })
  },

  tabsItemTap(e) {
    const { detail } = e
    this.changeIndex(detail)
  }
})