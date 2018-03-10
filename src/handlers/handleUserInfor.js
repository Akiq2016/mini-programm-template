import Promise from '../assets/promise'
import regeneratorRuntime from '../assets/regenerator'
import Tools from '../utils/tools'
import handleRequiredError from 'handleRequiredError'

export default async () => {
  let info, T = new Tools
  try {
    info = await T.wxPromise(wx.getUserInfo)()
  } catch (e) {
    handleRequiredError('您已拒绝授权，请巴拉巴拉小魔仙', '温馨提示')
  }
  return info
}
