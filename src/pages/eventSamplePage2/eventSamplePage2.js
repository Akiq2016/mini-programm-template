Page({
  onLoad: function (options) {
    console.log('onload 主包')
  },
  someHandler (e) {
    console.log('I am in page B, now is about to trigger page A\'s event!')
    getApp().event.trigger('eventA', { data: e.target.dataset.arg })
  }
})
