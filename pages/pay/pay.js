Page({

  /**
   * 页面的初始数据
   */
  data: {
    dizhi: {}, // 获取用户地址
    cart: [], // 获取商品详情 加入的购物车
    zjg: 0, // 总价格
    zsl: 0, // 总数量
    newCart: [] // 新的
  },

  onShow() {
    // 当页面显示的时候获取用户的收货地址
    const dizhi = wx.getStorageSync('address')
    if (dizhi && dizhi.userName) {
      dizhi.all = `${dizhi.provinceName}${dizhi.cityName}${dizhi.countyName}${dizhi.detailInfo}`
    }

    // 获取商品详情
    const cart = wx.getStorageSync('cart') || []

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
    })

    // 过滤把 checked 为 true 的筛选出来
    // filter方法就是 返回一个新的数组 判断里面为不为真 为真的话就把那个元素放入一个新的数组中 要遍历完
    const newCart = cart.filter(item => item.checked)

    this.setData({
      dizhi,
      cart,
      zjg,
      zsl,
      newCart
    })
  }
})