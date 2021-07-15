export const showModal = (content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({ // 这个可以封装成 async 代码看起就很好理解了
      title: '提示',
      content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}