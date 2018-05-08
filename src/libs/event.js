export default class Event {
  constructor () {
    this.EventObj = {}
  }

  /**
   * 对页面中的 events 对象进行遍历 挂载事件
   * 二次封装页面卸载钩子 清空当前页面挂载的事件
   * @param {object} page 小程序页面实例this
   */
  initEventOnPage (page) {
    if (!page || !page.events) return

    Object.keys(page.events).forEach(key => {
      this.listen(key, page.events[key], page)
    })

    let onUnload = page.onUnload
    page.onUnload = function () {
      Object.keys(page.events).forEach(key => {
        this.remove(key, page)
      })
      onUnload && onUnload.call(page)
    }
  }

  /**
   * listen 添加事件监听
   * @param {string} key 事件名称
   * @param {function} callback 事件回调
   * @param {object} pageInstance 页面实例
   */
  listen (key, callback, pageInstance) {
    (this.eventObj[key] = this.eventObj[key] || []).push({
      callback,
      pageInstance: pageInstance || getCurrentPages()[getCurrentPages().length - 1]
    })
  }

  /**
   * trigger 触发事件
   * @param {string} key 事件名称
   * @param {object} args 参数对象
   */
  trigger (key, ...args) {
    if (!this.EventObj[key]) return

    this.EventObj[key].forEach(item => {
      item.callback.apply(item.pageInstance, args)
    })
  }

  /**
   * remove 移除事件 key 在实例页面下的相关回调
   * @param {string} key 事件名称
   * @param {object} pageInstance 页面实例
   */
  remove (key, pageInstance) {
    if (!this.EventObj[key]) return

    let callbackList = this.EventObj[key]
    let _pageInstance = pageInstance || getCurrentPages()[getCurrentPages().length - 1]
    let index = callbackList.findIndex(item => item.pageInstance === _pageInstance)

    if (~index) callbackList.splice(index, 1)
    if (callbackList.length === 0) delete this.EventObj[key]
  }

  // removeAll 移除事件 key 的所有回调
  removeAll (key) {
    if (key) {
      delete this.EventObj[key]
    } else {
      this.EventObj = {}
    }
  }
}
