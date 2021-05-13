# uvue-form 表单组件

## 示例

### 基本使用

```html
<template>
  <v-container>
    <uvue-form v-model="formData" :option="formOption" @submit="handleSubmit"></uvue-form>
  </v-container>
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
                { label: "男", text: "男", value: "1" },
                { label: "女", text: "女", value: "0" }
              ]
            }
          ]
        }
      };
    }
  };
</script>
```

### slot 使用方式

- 一般使用方式：

```html
<uvue-form v-model="formData" :option="formOption">
  <!-- 自定义的表单项 -->
  <template #username="{ row }">
    <view>{{row.username}}</view>
  </template>
</uvue-form>
```

- 由于 app 中具名插槽的名称不能使用动态值，需要自己实现 form-item 的渲染，组件提供了`uvue-form-item`用来渲染默认表单项
- 同时不能使用 right 插槽，需要自己调整排版，例如使用 flex 布局等
- app 使用方式：

```html
<uvue-form v-model="formData" :option="formOption" @submit="handleSubmit">
  <template #formItem="{ row, column, prop, dictData }">
    <uvue-form-item v-bind="column.attrs" v-model="row[prop]" :dictData="dictData">
      <!-- 自定义的表单项 -->
      <view v-if="prop === 'username'">{{row.username}}</view>
    </uvue-form-item>
  </template>
</uvue-form>
```

## Props

| 参数    | 说明                 | 类型   | 可选值 | 默认值 |
| ------- | -------------------- | ------ | ------ | ------ |
| v-model | 表单数据对象         | object | -      | -      |
| option  | 列表配置，见下方说明 | object | -      | -      |

## Option

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| `u-form` 的所有属性(除了 `model` 和 `rules`) | [官方文档](https://uviewui.com/components/form.html#form-props) | - | - | - |
| submitBtn | 是否显示提交按钮 | boolean | - | true |
| submitBtnText | 提交按钮文字 | string | - | "提交" |
| column | 表单项配置，见下方说明 | array | - | [] |

## Column

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| `u-form-item`所有属性 | [官方文档](https://uviewui.com/components/form.html#form-item-props) | - | - | - |
| attrs | 默认组件的属性，包含组件：input/select/picker/rate/numberbox /checkbox/radio/switch/slider/action-sheet | Object | 自行查看各组件文档：[官方文档](https://uviewui.com/components/input.html) | - |
| type | 表单类型 | String | text/password/textarea/number/select/date/time/datetime /rate/numberbox/chekcbox/radio/switch/slider/action | text |
| rules | 表单验证规则 | Array | - | - |
| dictData | 字典数据 | Array/Function/Promise | - | - |
| dictOption | 字典配置，见下方说明 | Object | - | - |

## DictOption

| 参数     | 说明                                 | 类型   | 可选值 | 默认值   |
| -------- | ------------------------------------ | ------ | ------ | -------- |
| label    | 字典名称属性值                       | string | -      | label    |
| value    | 字典值属性值                         | string | -      | value    |
| children | 子字典属性值                         | string | -      | children |
| res      | dictData 为 Promise 时返回的数据格式 | string | -      | res.data |

## Events

| 事件名 | 说明                 | 参数              |
| ------ | -------------------- | ----------------- |
| submit | 点击提交按钮触发事件 | form:表单数据对象 |

## Methods

| 方法名     | 说明     | 参数 |
| ---------- | -------- | ---- |
| formSubmit | 表单提交 | -    |

## Slots

- 列名称:即 column 中的 prop

| name         | 说明                       | 参数                                   |
| ------------ | -------------------------- | -------------------------------------- |
| 列名称       | 表单项自定义内容           | {row,column,index,label,prop,dictData} |
| 列名称+Right | 表单项右方自定义内容       | {row,column,index,label,prop,dictData} |
| formItem     | app 需要自定义表单项时使用 | {row,column,index,label,prop,dictData} |
