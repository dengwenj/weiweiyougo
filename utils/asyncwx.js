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

export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 发起微信支付
export const requestPayment = pay => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
        console.log(1);
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}