// 网络请求
import { getCategory } from "../../api/category";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧的菜单数据
    rightContent: [], // 右侧的商品数据
    isActive: 0 // 点击的激活
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
    console.log(data);
    this.Cates = data.message

    const leftMenuList = this.Cates.map((item) => item.cat_name)
    const rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  // 点击左侧
  handleTap(e) {
    /* 
      1 获取被点击的标题身上的索引
      2 给 data 中的 isActive 赋值就可以了
      3 根据不同的索引来渲染右侧的商品内容
    */
    const { index } = e.currentTarget.dataset
    const rightContent = this.Cates[index].children
    this.setData({
      isActive: index,
      rightContent
    })
  }

})