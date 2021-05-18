# uvue-crud

基于 uni-app 和 uview 封装的 crud 组件，包括列表 uvue-list、表单 uvue-form 和表单项 uvue-form-item 组件

- [示例](https://soullyoko.github.io/uvue-crud/)
- [uvue-list 文档](https://github.com/SoulLyoko/uvue-crud/blob/master/uvue-crud/components/uvue-list/README.md)
- [uvue-form 文档](https://github.com/SoulLyoko/uvue-crud/blob/master/uvue-crud/components/uvue-form/README.md)

# 安装

## npm/yarn

```
npm i uvue uview-ui
or
yarn add uvue uview-ui
```

## 下载

# 快速上手

## 引入 uview

由于组件库依赖于 uview，所以需要先引入 uview，[官网安装方式](https://www.uviewui.com/components/setting.html)

## 注册组件

```js
//main.js
import UvueCrud from "uvue-crud";
Vue.use(UvueCrud);
```

## 配置 easycom 规则

```js
// pages.json
{
    "easycom": {
		//下载安装方式
        "^uvue(.*)": "@/uvue-crud/components/uvue-$1/index.vue",
		//npm安装方式
        "^uvue(.*)": "uvue-crud/components/uvue-$1/index.vue",
    },
    "pages": [
        // ......
    ]
}
```
