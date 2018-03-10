import Config from 'httpconfig'

let Promise = require('../assets/promise')

class Request {

  constructor (args) {
    this.basePath = Config.production ? Config.proHttpConfig.reqHost : Config.devHttpConfig.reqHost
    this.get = this.init('GET')
    this.post = this.init('POST')
    this.put = this.init('PUT')
    this.delete = this.init('DELETE')
  }

  init (method) {
    let _ = this
    return (pathname, data) => {
      return new Promise((resolve, reject) => {
        let headers = {
          'content-type': 'application/json',
          'session3rd': wx.getStorageSync('session3rd')
        }
        wx.request({
          url: _.basePath + pathname,
          data: data,
          method: method,
          header: headers,
          success (res) {
            switch (res.statusCode) {
              case 200:
                resolve(res.data)
                break
              default:
                reject(res.data)
                break
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
