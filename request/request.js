// 在对发送请求封装了一层
function requsrt(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...data, // 这也是合并的意思 对象合并
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

export default requsrt