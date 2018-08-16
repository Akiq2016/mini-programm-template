# mini-programm-template

```bash
git clone https://github.com/Akiq2016/mini-programm-template.git yourFolderName
cd yourFolderName

npm install -g gulp-cli
npm install

# 生成 dist 目录
npm run build

# 开发目录监听
npm run dev

# 安装 gulp 的 plugins 后，如果报错找不到 gulp 需手动重新安装 gulp4
npm install gulp@next --save-dev
```
### TODO
- [ ] webpack 版

## Features
- [x] 开启 eslint
- [x] 开启 autoprefixer
- [x] 兼容 promise
- [x] 支持 async / await
- [x] 支持 scss
- [x] 封装 wx API
- [x] 跨页面事件通讯 event
- [x] 监听数据变化 watch

**注意**: 本模板依赖 gulp 进行预处理和编译压缩，因此不使用微信开发者工具提供的相关功能。微信开发者工具选项设置：**不使用** es6 -> es5。**不使用** 上传代码时样式自动补全。（`project.config.json` 已配置）

## Structure

在开发者工具中，小程序目录请选择编译后的 `dist` 。

```shell
# src 结构

├── assets
|   ├── [pictures]
└── └── [icons]

├── config
|   ├── [global constant]
└── └── [configuration]

├── libs
└── └── [libary]

├── pages
└── └── [package page]
├── subPages
└── └── [subPackage page]

├── components
└── └── [components]
├── templates
└── └── [templates]

├── style
└── └── [scss]

├── utils
└── └── [tools]

├── project.config.json
├── app.js
├── app.json
├── app.scss
```

## Libary

#### Promise

部分低端机型(eg. iPhone5)环境中不存在 `native promise` ，开发者需要自行引入 `promise` 库([issue](https://github.com/Akiq2016/mini-programm-template/issues/2))。小程序不运行在浏览器中，不存在 `document/window` 等对象，不能引入依赖这些对象的第三方库，因此推荐使用 `bluebird` 。

#### async/await 语法

直接使用 `async/await` 语法会出现报错：
```
Uncaught ReferenceError: regeneratorRuntime is not defined
```
需要引入 `Facebook/regenerator` 解决报错。 `regenerator` 编译后会生成 `promise` ，在低端机型中会再次出现 `promise` 兼容问题。因此手动在 `regenerator` 库开头引入了第三方 `promise` 。

#### event.js

跨页面通讯机制，原理是发布订阅模式。具体使用请看源码注释。及使用例子 `pages/eventSamplePage`，`pages/eventSamplePage2`。

简单使用介绍：
```js
// 入口文件app.js
import Event from 'libs/event.js'

App({
  onLaunch: function(options) {
  },

  // 添加一个全局的事件总线
  event: new Event(),
})
```

```js
// 写法一：在页面中写events对象
// 在合适的地方（比如页面生命周期钩子中）进行事件初始化 initEventOnPage
// initEventOnPage 会帮助遍历events中的事件 逐个进行listen
// 且改写了onUnload钩子，令页面在销毁时，将页面中事件销毁
Page({ // A页面
  events: {
    eventA(arg1) {
    },
    eventB(arg2) {
    },
  },
  onLoad() {
    getApp().event.initEventOnPage(this)
  },
})

Page({ // B页面
  someHandler() {
    getApp().event.trigger('eventA', { data: 888 })
  }
})
```

```js
// 写法二：手动注册事件
// 注册 getApp().event.listen(keyname, callback, pageInstance)
// 销毁 getApp().event.remove(keyname, pageInstance)
Page({ // A页面
  someHandler() {
    getApp().event.listen('eventA', function (arg) { console.log(arg) }, this)
  }
  onUnload() {
    getApp().event.remove('eventA', this)
  }
})

Page({ // B页面
  someHandler() {
    getApp().event.trigger('eventA', { data: 888 })
  }
})
```

#### watch.js

数据监听，原理是发布订阅模式。具体使用请看源码注释。[源库地址](https://github.com/jayZOU/watch)

简单使用介绍：
```js
// A页面
import Watch from '../../libs/watch'

let watch;
Page({
  data: {
    a: '1',
    b: {
      c: { d: 33 },
      e: [1, 2, [3, 4]]
    }
  },
  // 可以将需要监听的数据放入watch里面，当数据改变时推送相应的订阅事件
  watch: {
    a: function(val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    'b.c.d': function(val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    'b.e[2][0]': function(val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 不在data里面的数据项不会放入观察者列表
    'b.e[3][4]': function(val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
  },
  onLoad(options) {
    // 实例化watch
    watch = new Watch(this)
  },
  method1() {
    // 扩展原生小程序setData方法: (改变数据 更新视图) + 触发回调（假如有配置）
    watch.setData({
      a: 2,
      'b.c.d': 3,
      'b.e[2][0]': 444,
      c: 123  
    })
    
    // 扩展原生小程序对data对象直接赋值的操作: (改变数据 不更新视图) + 触发回调（假如有配置）
    // watch.data(key, val)
    watch.data('b.e[2][0]', 555)

    // 删除观察者，改变数据不触发回调
    // watch.unSubscribe(key)
    watch.unSubscribe('b.e[2][0]')
  }
})
```
