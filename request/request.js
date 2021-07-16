// 在对发送请求封装了一层
function requsrt(data) {
  // 定义公共的 url
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

  // 判断 url 中是否带有 /my/ 请求的是私有的路径 带上 header token  统一设置
  // let header = {} 这样写就写死了 只能写一个 想要在 header 里面传多个属性就不行了
  let header = {...data.header }
  if (data.url.includes('/my/')) {
    header['Authorization'] = wx.getStorageSync('token')
  }

  return new Promise((resolve, reject) => {
    wx.request({
      ...data, // 这也是合并的意思 对象合并
      header,
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