// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dizhi: {} // 获取用户地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onShow() {
    // 当页面显示的时候获取用户的收货地址
    const dizhi = wx.getStorageSync('address')
    if (dizhi && dizhi.userName) {
      dizhi.all = `${dizhi.provinceName}${dizhi.cityName}${dizhi.countyName}${dizhi.detailInfo}`
    }

    // 把地址赋值给 data 中
    this.setData({
      dizhi
    })
  },

  handleChooseAddress() {
    // 调用小程序内置 api 获取用户的收货地址
    wx.chooseAddress({
      success: (result) => {
        // 获取了用户的收货地址就把存到本地存储中
        wx.setStorageSync('address', result);
      }
    })
  }

})