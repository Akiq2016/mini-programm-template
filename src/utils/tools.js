let Promise = require('../assets/promise')

class Tools {
  /**
   * let wx.function use promise
   * @param  {Function} fn [description]
   * @return {Function}    [description]
   */
  wxPromise (fn) {
    return function (obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = function (res) { resolve(res) }
        obj.fail = function (res) { reject(res) }
        fn(obj)
      })
    }
  }

}

export default Tools
