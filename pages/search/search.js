import { categorySearch } from "../../api/goods"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: []
  },
  timeID: 1,
  // 当输入框值发生变化的时候
  handleInput(e) {
    // 输入框输入的值
    const { value } = e.detail
    if (!value.trim()) {
      return
    }

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
  }
})