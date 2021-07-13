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

  async _goodsSearch(data) {
    const res = await goodsSearch(data)
    this.setData({
      goodsList: res.data.message.goods
    })
  }
})