import Promise from '../lib/promise'
import regeneratorRuntime from '../lib/regenerator'
import CONFIG from '../config/index.js'
import Tools from './tools'

/**
 * 兼容旧版本
 */
function checkCanIuse ({ apiName, ...options }) {
  if (wx[apiName]) {
    wx[apiName](options)
  } else {
    showModal({
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

function showLoading (options = {}) {
  wx.showLoading(Object.assign({
    title: '加载中',
    mask: 'true'
  }, options))
}

function showToast (options = {}) {
  wx.showToast(Object.assign({
    title: '成功',
    mask: 'true',
    icon: 'success',
    duration: 1000
  }, options))
}

function showModal (options = {}) {
  wx.showModal(Object.assign({}, {
    title: '提示',
    content: '',
    cancelColor: CONFIG.THEME.disabledColor,
    confirmColor: CONFIG.THEME.mainColor
  }, options))
}

/**
 * 路由相关 wx API
 * 统一处理权限
 */
function linkTo ({ url, type, data }) {
  // TODO: `AUTH` might be a property from getApp() or data
  // Here we just set it to `true` if you don't have auth stuff.
  const AUTH = true

  if (AUTH) {
    switch (type) {
      case 'navigateTo':
        wx.navigateTo(url)
        break
      case 'redirectTo':
        wx.redirectTo(url)
        break
      case 'switchTab':
        wx.switchTab(url)
        break
      case 'reLaunch':
        wx.reLaunch(url)
        break
    }
  } else {
    showModal({
      content: '请登陆后再访问',
      showCancel: false,
      success: function (e) {
        // TODO: for example: go to the login page
        // wx.reLaunch(LOGIN_PATH)
      }
    })
  }
}

function navigateTo ({ url, ...data }) {
  linkTo({ url, data, type: 'navigateTo' })
}

function redirectTo ({ url, ...data }) {
  linkTo({ url, data, type: 'redirectTo' })
}

function switchTab ({ url, ...data }) {
  linkTo({ url, data, type: 'switchTab' })
}

function reLaunch ({ url, ...data }) {
  linkTo({ url, data, type: 'reLaunch' })
}

async function getUserInfo () {
  let res
  let T = new Tools

  try {
    res = await T.wxPromise(wx.getUserInfo)()
  } catch (e) {
    showModal({ content: '您已拒绝授权' })
  }
  return res
}

/**
 * wx API 二次封装
 * 建议要使用到的 wx API 统一走这份文件，方便处理
 * 1. 兼容性问题
 * 2. 设置默认参数
 */
export default {
  checkCanIuse,

  showLoading,
  showToast,
  showModal,
  navigateTo,
  redirectTo,
  switchTab,
  reLaunch,
  getUserInfo,

  setStorageSync: wx.setStorageSync,
  getStorageSync: wx.getStorageSync,
  getStorage: wx.getStorage,
  setStorage: wx.setStorage,
  removeStorage: wx.removeStorage,
  removeStorageSync: wx.removeStorageSync,
  getSystemInfoSync: wx.getSystemInfoSync,
  getLocation: wx.getLocation,
  chooseLocation: wx.chooseLocation,
  openLocation: wx.openLocation,
  createMapContext: wx.createMapContext,
  createSelectorQuery: wx.createSelectorQuery,
  hideLoading: wx.hideLoading,
  hideToast: wx.hideToast,
  login: wx.login,
  checkSession: wx.checkSession,
  navigateBack: wx.navigateBack,
  chooseImage: wx.chooseImage,
  previewImage: wx.previewImage,
  saveImageToPhotosAlbum: wx.saveImageToPhotosAlbum,
  getImageInfo: wx.getImageInfo,
  request: wx.request,
  scanCode: wx.scanCode,
  setNavigationBarTitle: wx.setNavigationBarTitle,
  setTabBarBadge: wx.setTabBarBadge,
  removeTabBarBadge: wx.removeTabBarBadge,
  showTabBarRedDot: wx.showTabBarRedDot,
  hideTabBarRedDot: wx.hideTabBarRedDot,
  setTabBarStyle: wx.setTabBarStyle,
  setTabBarItem: wx.setTabBarItem,
  showTabBar: wx.showTabBar,
  hideTabBar: wx.hideTabBar,
  showNavigationBarLoading: wx.showNavigationBarLoading,
  stopPullDownRefresh: wx.stopPullDownRefresh,
  getSetting: wx.getSetting,
  authorize: wx.authorize,
  openSetting: wx.openSetting,
  makePhoneCall: wx.makePhoneCall
}
