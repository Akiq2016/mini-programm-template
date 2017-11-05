// 如果使用async语法，请在顶部依次引入promise和regenerator
import Promise from 'assets/promise'
import regeneratorRuntime from 'assets/regenerator'
import handleUserInfor from 'handlers/handleUserInfor'
import Request from 'utils/http'
import Tools from 'utils/tools'

App({
  async getUserInfo (cb) {
    let login, key, user, dolog
    if (this.globalData.userInfo && typeof cb == "function") {
      cb(this.globalData.userInfo)
      return
    }
    try {
      // invoke wechat login
      login = await this.Tools.wxPromise(wx.login)()

      // get session_key
      key = this.Http.get("/login/getSessionKey", { code: res.code })
      if (key.status == 0)
        console.log('获取session_key失败: ' + key.data.msg)
      else
        wx.setStorage({ key: "dr_session", data: key.data.dr_session })

      // get user information
      user = await handleUserInfor()
      if (!user) return
      Object.assign(this.globalData, {
        login: true,
        iv: user.iv,
        userInfo: user.userInfo,
        encryptedData: user.encryptedData
      })
      typeof cb == "function" && cb(this.globalData.userInfo);

      // login
      dolog = this.Http.get('/login/doLogin', {
        dr_session: wx.getStorageSync("dr_session"),
        encryptedData: user.encryptedData,
        iv: user.iv
      })
    } catch (e) {
      console.log(e)
    }
  },
  Http: new Request,
  Tools: new Tools,
  globalData: {
    login: false,
    userInfo: null
  }
})