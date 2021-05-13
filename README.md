# uvue-crud
基于uni-app和uview封装的crud组件，包括列表uvue-list、
表单uvue-form和表单项uvue-form-item组件

# 安装
## npm/yarn
```
npm i uvue uview-ui
or
yarn add uvue uview-ui
```
## 下载

# 快速上手
## 引入uview
由于组件库依赖于uview，所以需要先引入uview，[官网安装方式](https://www.uviewui.com/components/setting.html)
## 注册组件
```js
//main.js
import UvueCrud from 'uvue-crud';
Vue.use(UvueCrud);
```
## 配置easycom规则
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