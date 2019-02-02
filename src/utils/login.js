import db from './db'
import Http from './http'

export default class Login {
  checkSession() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: res => resolve(res),
        fail: err => reject(err)
      })
    })
  }

  async getToken() {
    let token = db.Get('token')
    console.log('token: ' + token)
    if (!token) {
      await this.login()
    } else {
      try {
        await this.checkSession()
      } catch (err) {
        await this.login()
      }
    }
  }

  async login() {
    // 微信登录
    const code = await this.wxLogin()
    console.log(code)
    //  登录服务器
    const resp = await Http.Post('login', { code: code })
    console.log(resp)
    if (resp.code === 1) {
      const data = resp.data
      const userInfo = {}
      // 缓存登录之后的数据
      for (const key in data) {
        userInfo[key] = data[key]
      }
      db.Set('userInfo', userInfo)
    }
  }

  wxLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          if (res.code) {
            resolve(res.code)
          } else {
            reject(res.errMsg)
          }
        },
        fail: err => reject(err)
      })
    })
  }

  showErr() {
    const self = this
    wx.showModal({
      title: '登录失败', // 提示的标题,
      content: '点击确认重试，或者后台关闭小程序重新进入再试', // 提示的内容,
      confirmColor: '#3CC51F', // 确定按钮的文字颜色,
      success: res => {
        if (res.confirm) {
          self.getToken()
        }
      }
    })
  }
}
