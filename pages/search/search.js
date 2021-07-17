import { categorySearch } from "../../api/goods"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isShow: false, // 重置页面
    inpValue: '' // 重置页面
  },
  timeID: 1,
  // 当输入框值发生变化的时候
  handleInput(e) {
    // 输入框输入的值
    const { value } = e.detail
    if (!value.trim()) { // 没有值时
      this.setData({
        goods: [],
        isShow: false
      })
      return
    }

    // 下面的就是输入了值了
    this.setData({
      isShow: true
    })

    // 发送请求  用到防抖  不会频繁的发送请求
    clearTimeout(this.timeID) // 清除定时器
    this.timeID = setTimeout(() => {
      this._categorySearch(value)
    }, 300)
  },

  async _categorySearch(value) {
    const res = await categorySearch({ query: value })
    const goods = res.data.message
    this.setData({
      goods
    })
  },

  // 点击按钮时 重置页面
  handleBtnTap() {
    this.setData({
      goods: [],
      isShow: false,
      inpValue: ''
    })
  }
})