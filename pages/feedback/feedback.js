import { chooseImage } from "../../utils/asyncwx"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '体验问题',
      isActive: true
    }, {
      id: 1,
      name: '商品 商检投诉',
      isActive: false
    }],
    img: [] // 上传的图片
  },

  // 子传父
  ItemTap(e) {
    const { detail } = e
    const { tabs } = this.data
    tabs.forEach(item => {
      item.id === detail ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })
  },

  // 点击 button
  async handleChooseBtn() {
    /* 
      1 调用小程序内置的 选择图片的 api
      2 获取到图片的路径 数组
      3 把图片路径存储到 data 的变量中
      4 页面就可以根据图片吧数组进行循环显示 自定义事件
    */
    const res = await chooseImage()
    const img = [...res.tempFilePaths, ...this.data.img] // 一定是合并
    this.setData({
      img
    })
  },

  // 点击删除图片
  handleRemoveTap(e) {
    const { index } = e.currentTarget.dataset
    console.log(index);
    const { img } = this.data
    img.splice(index, 1)
    this.setData({
      img
    })
  }
})