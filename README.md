# mini-programm-template 0.0.5

- [x] 开启 eslint
- [x] 开启 autoprefixer
- [x] 支持 promise
- [x] 支持 async / await
- [x] 支持 scss

## 目录结构

 `src` 为开发目录， `dist` 为编译后目录。在开发者工具中，目录请选择 `dist` 。此模板未使用小程序第三方框架，因此文件结构与官方开发结构一致。

## 微信开发者工具选项设置

**不使用** `es5 -> es6` 功能。

**不使用** `上传代码时样式自动补全` 功能。

## 相关命令

```bash
# 安装依赖
npm install -g gulp-cli
npm install

# 生成 dist 目录
npm run build

# 开发目录监听
npm run dev

# 安装 gulp 的 plugins 后，如果报错找不到 gulp 需手动重新安装 gulp4
npm install github:gulpjs/gulp#4.0 --save-dev
```

## 关于第三方库的引用

#### Promise

部分低端机型(eg. iPhone5)环境中不存在 `native promise` ，开发者需要自行引入 `promise` 库。小程序不运行在浏览器中，不存在 `document/window` 等对象，不能引入依赖这些对象的第三方库，因此推荐使用 `bluebird` 。

#### async/await 语法

直接使用 `async/await` 语法会出现报错：
```
Uncaught ReferenceError: regeneratorRuntime is not defined
```
需要引入 `Facebook/regenerator` 解决报错。 `regenerator` 编译后会生成 `promise` ，在低端机型中会再次出现 `promise` 兼容问题。因此手动在 `regenerator` 库开头引入了第三方 `promise` 。
