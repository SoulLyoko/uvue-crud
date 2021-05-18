# uvue-crud

- 基于 uni-app 和 uview 封装的 crud 组件
- 以配置的方式渲染列表和表单，实现一次配置，多处复用
- 包含 uvue-list 列表组件、uvue-form 表单组件 和 uvue-form-item 表单项组件

- [示例](https://soullyoko.github.io/uvue-crud/build/h5)
- [uvue-list 文档](https://github.com/SoulLyoko/uvue-crud/blob/master/uvue-crud/components/uvue-list/README.md)
- [uvue-form 文档](https://github.com/SoulLyoko/uvue-crud/blob/master/uvue-crud/components/uvue-form/README.md)

# 安装

## npm/yarn 安装方式

```
npm i uvue-crud
or
yarn add uvue-crud
```

## 下载安装方式

[https://ext.dcloud.net.cn/plugin?id=5071](https://ext.dcloud.net.cn/plugin?id=5071)

# 快速上手

## 引入 uview

由于组件库依赖于 uview，所以需要先引入 uview，[安装 uview](https://www.uviewui.com/components/setting.html)

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

# 示例代码

## uvue-list

```html
<template>
  <view>
    <uvue-list :option="option" :data="data">
      <template #title="{ row }">
        <view>{{ row.title }}</view>
      </template>
      <template #content="{ row }">
        <view>{{ row.content }}</view>
      </template>
      <template #right="{ row }">
        <view>{{ row.time }}</view>
      </template>
    </uvue-list>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        option: {
          formPath: "/pages/form/form"
        },
        data: [
          {
            title: "title1",
            content: "content1",
            time: new Date().toLocaleDateString()
          },
          {
            title: "title2",
            content: "content2",
            time: new Date().toLocaleDateString()
          },
          {
            title: "title3",
            content: "content3",
            time: new Date().toLocaleDateString()
          }
        ]
      };
    }
  };
</script>
```

## uvue-form

```html
<template>
  <view>
    <uvue-form v-model="formData" :option="formOption" @submit="handleSubmit"></uvue-form>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          username: "admin",
          sex: "1"
        },
        formOption: {
          labelWidth: "auto",
          column: [
            {
              label: "用户名",
              prop: "username",
              rules: [{ required: true, message: "请输入用户名", trigger: "change" }]
            },
            {
              label: "性别",
              prop: "sex",
              type: "action",
              dictData: [
                { label: "男", value: "1" },
                { label: "女", value: "0" }
              ]
            }
          ]
        }
      };
    }
  };
</script>
```
