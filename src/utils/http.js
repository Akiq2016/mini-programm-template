import Promise from '../libs/promise'
import wxApi from './wxApi.js'
import CONFIG from '../config/index.js'
import reLogin from './wx/reLogin.js'

const STATUS_CODE = {
  SUCCESS: 200,
  NO_AUTH: 401
}

function buildUrl (url) {
  const basePath = CONFIG.HOST.production
    ? CONFIG.HOST.pro.reqHost
    : CONFIG.HOST.dev.reqHost

  if (~url.indexOf('https')) {
    return url
  } else {
    return basePath + url
  }
}

function buildHeader () {
  return {
    'content-type': 'application/json',
    'session3rd': wxApi.getStorageSync('session3rd')
  }
}

class Request {
  constructor (args) {
    this.get = this.init('GET')
    this.post = this.init('POST')
    this.put = this.init('PUT')
    this.delete = this.init('DELETE')
  }

  init (method) {
    return (url, data) => {
      return new Promise((resolve, reject) => {
        wxApi.request({
          url: buildUrl(url),
          data: data,
          method: method,
          header: buildHeader(),
          success ({ statusCode, data }) {
            if (statusCode === STATUS_CODE.SUCCESS) {
              resolve(data)
            } else if (statusCode === STATUS_CODE.NO_AUTH) {
              reLogin()
              reject(data)
            }
          },
          fail (err) {
            reject(err)
          }
        })
      })
    }
  }
}

export default Request
