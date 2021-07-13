// 网络请求
import { goodsSearch } from "../../api/goods"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '综合',
      isActive: true,
    }, {
      id: 1,
      name: '销量',
      isActive: false,
    }, {
      id: 0,
      name: '价格',
      isActive: false,
    }],
    goodsList: [] // 商品列表
  },

  // 接口要的参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  // 总条数
  total: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.queryParams.cid = options.cid
      // 发送请求
    this._goodsSearch(this.queryParams)
  },

  // 自定义事件 子传父
  ItemTap(e) {
    // 获取被点击的标题索引
    const detail = e.detail
      // 修改原数组
    const { tabs } = this.data
      // 赋值到 data 中 
    tabs.forEach((item, index) => {
      index === detail ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })
  },

  // 商品列表
  async _goodsSearch(data) {
    const res = await goodsSearch(data)
    this.total = res.data.message.total

    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods] // 合并数组 下拉加载很多还有数据
    })

    // 下拉刷新数据加载了 就关闭下拉加载
    wx.stopPullDownRefresh()
  },

  // 上拉加载触底生命周期函数
  onReachBottom() {
    /* 
      1 用户上滑页面 滚动条触底 开始加载下一页
        判断还有没有下一页数据
          1 获取到总页数 只有总条数
          总页数 = Math.ceil(总条数 / 页容量 pagesize)
          2 获取到当前的页码 pagenum
          3 判断一下 当前的页码是否大于等于总页数  大于了表述没有数据了
      2 没有下一页数据 弹出一个提示
      3 有下一页数据加载下一页数据
    */
    // 每次触底了就提醒用户加载中
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 800
    })

    //  每次触底了就加一
    this.queryParams.pagenum = this.queryParams.pagenum + 1;

    // 总页数
    const pages = Math.ceil(this.total / this.queryParams.pagesize) // 数组内置对象
    if (this.queryParams.pagenum > pages) {
      // 表示没有数据
      return wx.showToast({
        title: '数据加载完啦~',
        icon: 'none',
        duration: 2000
      })
    }

    // 发送请求
    this._goodsSearch(this.queryParams)
  },

  // 下拉刷新
  onPullDownRefresh() {
    /* 
      1 触发下拉刷新事件 需要早页面的 json 文件中开启一个配置项
        找到触发下拉刷新的事件
      2 重置数据 数组
      3 重置页码设置为1
      4 重新发送请求
      5 数据请求回来关闭下拉刷新
    */
    this.data.goodsList = []
    this.queryParams.pagenum = 1
    this._goodsSearch(this.queryParams)
  }
})