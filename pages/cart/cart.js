// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dizhi: {}, // 获取用户地址
    cart: [], // 获取商品详情 加入的购物车
    allChecked: false
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

    // 获取商品详情
    const cart = wx.getStorageSync('cart') || []

    // every 数组方法 会遍历，会接收一个回调函数，那么每一个回调函数都返回 true，那么 every 方法的返回值为 true，只要有一个回调函数返回了 false 那么不再循环执行，直接返回 false
    // 注意 空数组调用 every 返回值就是 true
    const allChecked = cart.length ? cart.every(item => item.checked) : false

    // 把地址赋值给 data 中
    this.setData({
      dizhi,
      cart,
      allChecked
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