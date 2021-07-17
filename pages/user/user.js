// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户个人信息
    collectNums: null // 收藏商品数量
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    })

    const collect = wx.getStorageSync('collect')
    const collectNums = collect.length
    this.setData({
      collectNums
    })
  },
})