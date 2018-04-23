# mini-programm-template

```bash
git clone https://github.com/Akiq2016/mini-programm-template.git
cd mini-programm-template

npm install -g gulp-cli
npm install

# 生成 dist 目录
npm run build

# 开发目录监听
npm run dev

# 安装 gulp 的 plugins 后，如果报错找不到 gulp 需手动重新安装 gulp4
npm install gulp@next --save-dev
```

## Features
- [x] 开启 eslint
- [x] 开启 autoprefixer
- [x] 支持 promise
- [x] 支持 async / await
- [x] 支持 scss
- [x] 封装 wx API
- [ ] 支持 数据监听 watch

**注意**: 本模板依赖 gulp 进行预处理和编译压缩，因此不使用微信开发者工具提供的相关功能。微信开发者工具选项设置：**不使用** es5 -> es6。**不使用** 上传代码时样式自动补全。（`project.config.json` 已配置）

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

├── lib
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

部分低端机型(eg. iPhone5)环境中不存在 `native promise` ，开发者需要自行引入 `promise` 库。小程序不运行在浏览器中，不存在 `document/window` 等对象，不能引入依赖这些对象的第三方库，因此推荐使用 `bluebird` 。

#### async/await 语法

直接使用 `async/await` 语法会出现报错：
```
Uncaught ReferenceError: regeneratorRuntime is not defined
```
需要引入 `Facebook/regenerator` 解决报错。 `regenerator` 编译后会生成 `promise` ，在低端机型中会再次出现 `promise` 兼容问题。因此手动在 `regenerator` 库开头引入了第三方 `promise` 。

## 其他推荐
[零配置, 无侵入式的小程序开发工具](https://github.com/axetroy/webuild)

[为你的小程序添加 mobx 数据层驱动](https://github.com/80percent/wechat-weapp-mobx)

[提供小程序一种更通用的方式来观察和响应data实例上的数据变动](https://github.com/jayZOU/watch)

[minapp 是为开发微信小程序而打造的一整套提升开发体验的工具](https://github.com/qiu8310/minapp)

[微信小程序所有API promise化，支持await、支持请求列队](https://github.com/bigmeow/minapp-api-promise)
