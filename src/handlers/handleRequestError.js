import handleRequiredError from 'handleRequiredError'

export default err => {
  const App = getApp()

  if (!err.http_status) {
    if (err.status) handleRequiredError(err.message)
    return
  }
  switch (err.http_status) {
    case 401:
      App.Tools.wxPromise(wx.showModal)({
        title: '提示',
        content: '提示内容',
        showCancel: false,
        confirmColor: '#ff0000'
      }).then(() => {
        App.getUserInfo()
        wx.showLoading({ title: '重新登录' })
      })
      break
    default:
      handleRequiredError(err.msg)
      break
  }
}
