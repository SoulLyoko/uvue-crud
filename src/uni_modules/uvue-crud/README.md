# uvue-crud

- 基于 uni-app 和 uview-plus 封装的 crud 组件
- 以配置的方式渲染列表和表单，实现一次配置，多处复用
- 包含 uvue-list 列表组件、uvue-form 表单组件
- [示例](https://soullyoko.github.io/uvue-crud/build/h5)
- [uvue-list 文档](https://github.com/SoulLyoko/uvue-crud/blob/master/uvue-crud/components/uvue-list/README.md)
- [uvue-form 文档](https://github.com/SoulLyoko/uvue-crud/blob/master/uvue-crud/components/uvue-form/README.md)

# 安装

## npm 安装方式

```
npm i uvue-crud
```

## 下载安装方式

[https://ext.dcloud.net.cn/plugin?id=5071](https://ext.dcloud.net.cn/plugin?id=5071)

# 快速上手

## 引入 uview

由于组件库依赖于 uview-plus，所以需要先引入 uview-plus，[安装 uview-plus](https://uiadmin.net/uview-plus/components/install.html)

## 注册组件

```js
//main.js
import uvueCrud from "uvue-crud";
Vue.use(uvueCrud);
```

## 配置 easycom 规则

```js
// pages.json
{
    "easycom": {
		    //下载安装方式
        //"^uvue(.*)": "@/uvue-crud/components/uvue-$1/uvue-$1.vue",
		    //npm安装方式
        "^uvue(.*)": "uvue-crud/components/uvue-$1/uvue-$1.vue",
    },
    "pages": [
        // ......
    ]
}
```
