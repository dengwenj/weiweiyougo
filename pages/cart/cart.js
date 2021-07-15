import { showModal } from "../../utils/asyncwx"
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

  // 当商品复选框改变的时候
  handleChangeItem(e) {
    /* 
      商品的选中
      1 获取到修改的商品对象
      2 商品对象的选中状态 取反
      3 重新填充回 data 中和缓存中
      4 重新计算全选 总价格 总数量 ...
      事件源中 e.detail.value.length 不为 0 说明是勾选状态 
      事件源中 e.detail.value.length 为 0 说明是没勾选状态 
    */
    // console.log(e);
    const { index } = e.currentTarget.dataset
    const { cart } = this.data
    let { allChecked } = this.data
    if (!e.detail.value.length) {
      cart[index].checked = !cart[index].checked

      // 只要有一个没勾上 全选就没有勾上
      allChecked = false
    } else {
      cart[index].checked = !cart[index].checked
    }

    // 设置回本地存储中
    wx.setStorageSync('cart', cart)

    // 重新计算全选 总价格 总数量 ...
    let zjg = 0
    let zsl = 0
    cart.forEach(item => {
      if (item.checked) {
        zjg += item.goods_price * item.num
        zsl += item.num
      }
    })

    // 判断 checked 是否全部为 true  全部为 true 就把 全选勾上
    allChecked = cart.length ? cart.every(item => item.checked) : false

    // 把地址赋值给 data 中
    this.setData({
      // cart,
      zjg,
      zsl,
      allChecked
    })
  },

  handleChangeAllChecked(e) {
    const { cart } = this.data
    let { zjg } = this.data
    let { zsl } = this.data
    if (!e.detail.value.length) {
      // !e.detail.value.length 说明没有勾上
      cart.forEach(item => {
        // 都把 checked 变成 false
        item.checked = false
      })
      zjg = 0
      zsl = 0
    } else {
      console.log(cart);
      // 勾上了全选
      cart.forEach(item => {
        // 这里是如果每一项勾上了就不再加上那一项了，加的是没有勾上的 这样才没有加重复
        if (!item.checked) {
          // 把全部商品的总价格和总数量渲染在页面中
          zjg += item.goods_price * item.num
          zsl += item.num
        }
        // 都把 checked 变成 true
        item.checked = true

        // zjg += item.goods_price * item.num 这样是错的 把全部的都加上了 加的是没有勾上的 这样加重复了
        // zsl += item.num
      })
    }

    // 重新设置本次存储
    wx.setStorageSync('cart', cart)

    // 赋值给 data
    this.setData({
      cart,
      zjg,
      zsl
    })
  },

  // 当点击减时
  async hanldTapLess(e) {
    const { indey } = e.currentTarget.dataset
    const { cart } = this.data
    let zjg = 0
    let zsl = 0

    // 删除商品
    if (cart[indey].num <= 1) {
      // 封装的 Promise 用的 async
      const res = await showModal('是否删除该商品')
      if (res.confirm) {
        // 当点击确定时 就删除该商品 就从 本地存储中移除就行了  不能直接删除 cart
        cart.splice(indey, 1) // 要这样删  

        cart.forEach(item => {
          if (item.checked) {
            zjg += item.goods_price * item.num
            zsl += item.num
          }
        })

        this.setData({
          cart,
          zjg,
          zsl
        })

        // 然后在重新设置本地存储
        wx.setStorageSync('cart', cart)
      }
      return
    }

    cart[indey].num--;

    // 让总数量和总价格重新算
    cart.forEach(item => {
      if (item.checked) {
        zjg += item.goods_price * item.num
        zsl += item.num
      }
    })

    this.setData({
      cart,
      zjg,
      zsl
    })

    // 重新存储到本地存储
    wx.setStorageSync('cart', cart)
  },

  // 当点击加时
  handleTapAdd(e) {
    const { indez } = e.currentTarget.dataset
    const { cart } = this.data
    let zjg = 0
    let zsl = 0

    cart[indez].num++;

    // 让总数量和总价格重新算
    cart.forEach(item => {
      if (item.checked) {
        zjg += item.goods_price * item.num
        zsl += item.num
      }
    })

    this.setData({
      cart,
      zjg,
      zsl
    })

    // 重新存储到本地存储
    wx.setStorageSync('cart', cart)
  },

  // 获取用户的收货地址
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