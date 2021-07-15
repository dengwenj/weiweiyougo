// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dizhi: {}, // 获取用户地址
    cart: [], // 获取商品详情 加入的购物车
    allChecked: false, // 全选
    zjg: 0, // 总价格
    zsl: 0 // 总数量
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
    // 注意 空数组调用 every 返回值就是 true  全选的实现
    const allChecked = cart.length ? cart.every(item => item.checked) : false

    /* 
      总价格和总数量
      1 都需要商品被选中，我们才拿他计算
      2 获取购物车数组 遍历
      3 判断商品是否被选中
      4 总价格 += 商品的单价 * 商品的数量
      5 总数量 += 商品的数量
      6 把计算的价格和数量 设置回 data 中
    */
    let zjg = 0
    let zsl = 0
    cart.forEach(item => {
      if (item.checked) {
        zjg += item.goods_price * item.num
        zsl += item.num
      }
      this.setData({

      })
    })

    // 把地址赋值给 data 中
    this.setData({
      dizhi,
      cart,
      allChecked,
      zjg,
      zsl
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