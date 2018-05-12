Page({
  data: {
    dataA: 233
  },
  events: {
    eventA (arg1) {
      console.log('here is the event in page A! i am invoked by other pages!', arg1)
      this.setData({ dataA: arg1 })
    }
  },
  onLoad (options) {
    getApp().event.initEventOnPage(this)
  },
  onShow () {
    console.log('onshow 主包, 当前dataA值为', this.data.dataA)
  },
  toAnotherPage () {
    getApp().wxApi.navigateTo({
      url: '/pages/eventSamplePage2/eventSamplePage2'
    })
  }
})
