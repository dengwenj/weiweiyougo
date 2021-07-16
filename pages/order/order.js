import { lshiOrder } from "../../api/dingdan"

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
    }, ],
    orders: [] // 订单
  },

  onShow() {
    /* 
      页面被打开的时候
      1 onShow 不同于 onLoad 无法在形参上接收 options 参数
      2 判断缓存中有没有 token
        没有 直接跳转到授权页面
        有 直接进行下面操作
      3 获取 url 上的参数 type
      4 根据 type 去发送请求获取订单数据
      5 渲染页面
    */
    //  判断有没有 token 有就继续 没有就跳转到 授权页面
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
      return
    }

    //  获取当前页面栈
    // 当前页面就是索引最大的那个
    const curPages = getCurrentPages()
      // console.log(curPages[curPages.length - 1].options)
    const { type } = curPages[curPages.length - 1].options

    // 根据 type 来决定页面标题的数组元素哪个被激活选中  type = 1 index = 0 这样的关系
    this.changeTitleByIndex(type - 1)

    // 发送请求
    this._lshiOrder(type)
  },

  // 发送请求 获取历史订单查询  
  async _lshiOrder(type) {
    const res = await lshiOrder({ type })
    const { orders } = res.data.message
    this.setData({
      // 转时间 有点行 没想到 还有这操作 牛逼 学到了学到了
      orders: orders.map(item => ({...item, create_time_cn: new Date(item.create_time * 1000).toLocaleString() }))
    })
  },

  // 根据 type 来决定页面标题的数组元素哪个被激活选中  type = 1 index = 0 这样的关系
  changeTitleByIndex(detail) {
    const { tabs } = this.data
    tabs.forEach((item, index) => {
      detail === index ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })
  },


  // 自定义事件
  handleItemTap(e) {
    const { detail } = e

    // 根据 type 来决定页面标题的数组元素哪个被激活选中  type = 1 index = 0 这样的关系
    this.changeTitleByIndex(detail)

    // 当点击了不同的标题，重新发送请求获取数据
    this._lshiOrder(detail + 1)
  }
})