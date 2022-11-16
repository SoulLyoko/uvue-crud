# uvue-form 表单组件

## 示例

### 基本使用

```html
<template>
  <uvue-form v-model="data" :option="option" v-model:defaults="defaults" @submit="handleSubmit">
    <template #username>
      <view>{{data.username}}</view>
    </template>
  </uvue-form>
</template>

<script setup>
  import { ref } from "vue";
  const option = {
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
        type: "radio",
        dicData: [
          { label: "男", value: "1" },
          { label: "女", value: "0" }
        ]
      }
    ]
  };
  const data = ref({
    username: "admin",
    sex: "1"
  });
  const defaults = ref({});
</script>
```

## Props

| 参数             | 说明                                       | 类型   | 可选值        | 默认值 |
| ---------------- | ------------------------------------------ | ------ | ------------- | ------ |
| v-model          | 表单数据对象                               | Object | -             | -      |
| option           | 列表配置，见下方说明                       | Object | -             | -      |
| formType         | 表单类型，用于 display,disabled 属性的判断 | String | add/edit/view | -      |
| permission       | 动态修改配置项                             | Object | -             | -      |
| v-model:defaults | 配置同步对象，用于 column 属性的动态修改   | Object | -             | -      |

## Option

| 参数                  | 说明                                                                   | 类型  | 可选值 | 默认值 |
| --------------------- | ---------------------------------------------------------------------- | ----- | ------ | ------ |
| `u-form` 的所有属性   | [文档](https://uiadmin.net/uview-plus/components/form.html#form-props) | -     | -      | -      |
| `AvueForm` 的所有属性 | 自行查看各组件文档：[文档](https://avuejs.com/form/form-doc/#option)   | -     | -      | -      |
| column                | 表单项配置，与 AvueForm 基本相同，见下方说明                           | Array | -      | []     |
| group                 | 表单组配置，与 AvueForm 基本相同                                       | Array | -      | []     |

## Column

| 参数                   | 说明                                                                                  | 类型 | 可选值                                      | 默认值 |
| ---------------------- | ------------------------------------------------------------------------------------- | ---- | ------------------------------------------- | ------ |
| `u-form-item` 所有属性 | [文档](https://uiadmin.net/uview-plus/components/form.html#form-item-props)           | -    | -                                           | -      |
| 默认组件的所有属性     | 自行查看各组件文档：[文档](https://uiadmin.net/uview-plus/components/input.html)      | -    | input/textarea/picker/checkbox/radio/switch | -      |
| `AvueForm` 的所有属性  | [文档](https://avuejs.com/form/form-doc/#column-%E5%85%B1%E7%94%A8%E5%B1%9E%E6%80%A7) | -    | -                                           | -      |

## Events

| 事件名 | 说明                 | 参数                                        |
| ------ | -------------------- | ------------------------------------------- |
| submit | 点击提交按钮触发事件 | (form:表单数据对象,done:取消加载按钮的函数) |

## Methods

| 方法名             | 说明                                                                     | 参数 |
| ------------------ | ------------------------------------------------------------------------ | ---- |
| `u-form`的所有方法 | [文档](https://uiadmin.net/uview-plus/components/form.html#form-methods) | -    |

## Slots

| name         | 说明                 | 参数 |
| ------------ | -------------------- | ---- |
| 属性名       | 表单项自定义内容     |      |
| 属性名-right | 表单项右方自定义内容 |      |
