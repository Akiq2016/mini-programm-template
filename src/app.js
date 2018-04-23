// 如果使用async语法，请在顶部依次引入promise和regenerator
import Promise from 'lib/promise'
import regeneratorRuntime from 'lib/regenerator'
import Request from 'utils/http'
import Tools from 'utils/tools'
import wxApi from 'utils/wxApi'

App({
  onLaunch (options) {
    this.getUserInfo()
  },

  // 登陆流程代码参考
  async getUserInfo (cb) {
    let login, key, user, dolog
    if (this.globalData.userInfo && typeof cb === 'function') {
      cb(this.globalData.userInfo)
      return
    }
    try {
      // invoke wechat login
      login = await this.Tools.wxPromise(wx.login)()

      // get session_key
      key = this.Http.get('/login/getSessionKey', { code: login.code })
      if (+key.status === 0) {
        console.log('获取session_key失败: ' + key.data.msg)
      } else {
        wx.setStorage({ key: 'dr_session', data: key.data.dr_session })
      }

      // get user information
      user = await wxApi.getUserInfo()
      if (!user) { return }
      Object.assign(this.globalData, {
        login: true,
        iv: user.iv,
        userInfo: user.userInfo,
        encryptedData: user.encryptedData
      })
      typeof cb === 'function' && cb(this.globalData.userInfo)

      // login
      dolog = this.Http.get('/login/doLogin', {
        dr_session: wx.getStorageSync('dr_session'),
        encryptedData: user.encryptedData,
        iv: user.iv
      })
    } catch (e) {
      console.log('登陆坏掉了', e)
    }
  },

  Http: new Request,
  Tools: new Tools,
  wxApi: wxApi,
  globalData: {
    login: false,
    userInfo: null
  }
})
