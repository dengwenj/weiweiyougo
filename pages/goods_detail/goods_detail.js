import { getGoodsDetail } from "../../api/goods"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}, // 商品详情 
    isCollect: false // 商品收藏
  },

  // 商品详情全部数据
  goodsXQ: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    // 页面栈 
    const curPages = getCurrentPages()
    const { options } = curPages[curPages.length - 1]

    const { goods_id } = options
    this._getGoodsDetail(goods_id)

    /* 
      商品收藏
      1 页面 onShow 的时候，加载缓存中的商品收藏的数据
      2 判断当前商品是不是被收藏
        1 是 改变页面的图标
        2 不是
      3 点击商品收藏按钮
        1 判断该商品是否存在于缓存数组中
        2 已经存在 把该商品删除
        3 没有存在 把商品添加到收藏数组中 存入到缓存中
    */
    const collect = wx.getStorageSync('collect') || []
      // some 方法就是里面只要有一个满足条件的话 就返回 true  空数组返回的是 false
    const isCollect = collect.some(item => { item.goods_id === this.goodsXQ.goods_id })
    this.setData({
      isCollect // 商品收藏
    })
  },

  // 获取商品详情数据
  async _getGoodsDetail(goods_id) {
    const res = await getGoodsDetail({ goods_id })
    this.goodsXQ = res.data.message
    const goodsDetail = res.data.message
    this.setData({
      goodsDetail: {
        //小程序中建议 data 里面只存放标签中要使用的数据
        goods_price: goodsDetail.goods_price,
        goods_name: goodsDetail.goods_name,
        goods_introduce: goodsDetail.goods_introduce.replace(/webp/g, 'jpg'),
        pics: goodsDetail.pics
      }
    })
  },

  // 点击轮播图放大预览
  handleTap(e) {
    const { index } = e.currentTarget.dataset

    const { pics } = this.goodsXQ

    const urls = pics.map(item => item.pics_mid)

    wx.previewImage({
      current: urls[index],
      urls,
    })
  },

  // 点击加入购物车
  handleGwcTap() {
    /* 
      1 获取缓存中的购物车数据 数组格式
      2 先判断当前商品是否已经存在于购物车
      3 已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组填充回缓存中
      4 不存在于购车的数组中 直接给购物车数组添加一个新元素 新元素带上购买数量属性 num 重新把购物车数组填充回本地存储中
      5 弹出加入成功提示
    */
    const cart = wx.getStorageSync('cart') || []

    // 返回数组中满足提供的测试函数的第一个元素的索引，没有找到的话则返回 -1
    const index = cart.findIndex((item, index) => item.goods_id === this.goodsXQ.goods_id)

    if (index === -1) {
      // 等于 -1 说明没有找到 就说明 里面一次就没有 就添加商品 在添加一个属性 num
      this.goodsXQ.num = 1

      // 在添加一个 选中状态
      this.goodsXQ.checked = true

      cart.push(this.goodsXQ)
    } else {
      // 说明找到了 说明至少已经添加过一次了  就让 num 属性 ++
      // this.goodsXQ.num++ 这样加不行
      cart[index].num++
    }

    // 把购物车数组填充回本地存储中
    wx.setStorageSync('cart', cart)

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500,
      mask: true,
    });
  }
})