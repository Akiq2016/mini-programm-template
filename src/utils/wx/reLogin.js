import wxApi from '../wxApi.js'

export default function () {
  getApp().Tools.wxPromise(wxApi.showModal)({
    content: '请重新登陆',
    showCancel: false
  }).then(() => {
    wxApi.getUserInfo()
    wxApi.showLoading({ title: '正在登录' })
  })
}
