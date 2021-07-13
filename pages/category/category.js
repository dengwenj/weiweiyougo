// 网络请求
import { getCategory } from "../../api/category";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧的菜单数据
    rightContent: [] // 右侧的商品数据
  },

  // 接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 发送请求
    this._getCategory()
  },

  async _getCategory() {
    const { data } = await getCategory()
    this.Cates = data.message

    const leftMenuList = this.Cates.map((item) => item.cat_name)
    this.setData({
      leftMenuList
    })

    const rightContent = this.Cates[0].children
    this.setData({
      rightContent
    })
  }

})