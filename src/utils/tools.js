let Promise = require('../libs/promise')

class Tools {
  /**
   * let wx.function use promise
   * @param  {Function} fn [description]
   * @return {Function}    [description]
   */
  wxPromise (fn) {
    return function (options = {}) {
      return new Promise((resolve, reject) => {
        options.success = function (e) { resolve(e) }
        options.fail = function (err) { reject(err) }
        fn(options)
      })
    }
  }

}

export default Tools
