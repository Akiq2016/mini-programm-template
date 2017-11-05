export default (content, title = '错误') => {
  if (content instanceof Array) content = content[0]
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    confirmColor: '#ff0000'
  })
}