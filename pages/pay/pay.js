import { cjOrder, chkOrder } from "../../api/dingdan"
import { getPayParams } from "../../api/pay"
import { requestPayment } from "../../utils/asyncwx"

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
  },

  // 点击支付
  async handleTapPay() {
    try {
      /* 
      1 先判断缓存中有没有 token
      2 没有 跳转到授权页面 进行获取 token
      3 有 token 进行下面的步骤 
    */
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth',
        })

        // 禁止代码向下执行
        return
      }

      // 创建订单 获取订单编号
      // const header = {
      //   Authorization: token
      // }

      // 订单数组
      const { newCart } = this.data
      const goods = []
      newCart.forEach(item => {
        goods.push({
          goods_id: item.goods_id,
          goods_number: item.num,
          goods_price: item.goods_price
        })
      })

      const data = {
        order_price: this.data.zjg,
        consignee_addr: this.data.dizhi.all,
        goods
      }

      // 发送请求
      const res = await cjOrder(data)
      const { order_number } = res.data.message // 获取订单编号

      // 发送请求 准备预支付 获取支付参数
      const res1 = await getPayParams({ order_number })
      const { pay } = res1.data.message

      // 发起微信支付  APPID 要一致  所以到这里就进入失败了 进入 catch 里面了
      await requestPayment(pay)

      // 查询后台 订单状态
      const res2 = await chkOrder({ order_number })

      /* 
        完成微信支付了
        手动删除缓存中已经被选中的商品
        删除后的购物车数据填充回缓存
      */
      const cart = wx.getStorageSync('cart')
      const newnewCart = cart.filter(item => !item.checked)
      wx.setStorageSync('cart', newnewCart)

      // 支付成功 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/order'
      })
    } catch (error) {
      wx.showToast({
        title: '支付失败，因为不是企业账号，个人账号不能发起微信支付，希望理解！',
        icon: 'none',
        duration: 4500,
        mask: true
      })
    }
  }
})