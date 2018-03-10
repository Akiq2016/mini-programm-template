# mini-programm-template 1.0.0

#### 模板结构

`src`为开发目录，`dist`为编译后目录。在开发者工具中，开发目录请选择`dist`。此模板未使用小程序第三方框架，因此文件结构与官方开发结构一致。

#### 编译方法

不使用开发工具`es5 -> es6`功能，使用`gulp4`自主编译。

#### Promise

部分低端机型(eg. iPhone5)环境中不存在`native promise`，开发者需要自行引入`promise`库。

小程序不运行在浏览器中，不存在`document/window`等对象，不能引入依赖这些对象的第三方库，因此推荐使用`bluebird`

#### async/await语法

直接使用`async/await`语法会出现报错：`Uncaught ReferenceError: regeneratorRuntime is not defined`

需要引入`Facebook/regenerator`解决报错。

`regenerator`编译后会生成`promise`，在低端机型中会再次出现`promise`兼容问题。

因此请在`regenerator`前引入`promise`。

# Version 2

- [ ] 上 eslint
- [ ] 支持 pug
- [ ] 支持 scss
- [ ] 支持 async / await
- [ ] 使用 WEUI