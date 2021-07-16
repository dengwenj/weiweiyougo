import { login } from "../../utils/asyncwx"
import { token } from "../../api/user"

Page({
  // 授权 获取用户信息
  async handleUserInfo(e) {
    try {
      // 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail
      const { code } = await login()
      const data = { encryptedData, rawData, iv, signature, code }
      const res = await token(data)
      console.log(res)
      const t = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo`
        // 这里不是企业号 所以没办法拿到 token  res 里面的 message 是 null
      wx.setStorageSync('token', t)

      wx.navigateBack({
        delta: 1 // 回到上一页
      })
    } catch (error) {
      console.log(error);
    }
  }
})