// 在对发送请求封装了一层
function requsrt(data) {
  // 定义公共的 url
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

  return new Promise((resolve, reject) => {
    wx.request({
      ...data, // 这也是合并的意思 对象合并
      url: `${baseUrl}${data.url}`,
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