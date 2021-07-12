// 在对发送请求封装了一层
function requsrt(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://api-hmugo-web.itheima.net${url}`,
      data,
      method,
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