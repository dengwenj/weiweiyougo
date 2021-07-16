import { getUserProfile } from "../../utils/asyncwx"

Page({
  // 获取用户个人资料
  async getUserProfile(e) {
    const { userInfo } = await getUserProfile()
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({ // 跳转会上一页
      delta: 1
    })
  }
})