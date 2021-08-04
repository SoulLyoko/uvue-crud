# uvue-form 表单组件

## 示例

### 基本使用

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
    <uvue-form-item v-bind="column" v-model="row[prop]" :dictData="dictData">
      <!-- 自定义的表单项 -->
      <view v-if="prop === 'username'">{{row.username}}</view>
    </uvue-form-item>
  </template>
</uvue-form>
```

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 表单数据对象 | Object | - | - |
| option | 列表配置，见下方说明 | Object | - | - |
| formType | 表单类型,用于 addDisaplay,editDisplay,viewDisplay,addDisabled,editDisabled 属性的判断 | String | add/edit/view | add |

## Option

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| `u-form` 的所有属性,除了 `model` 和 `rules` | [官方文档](https://uviewui.com/components/form.html#form-props) | - | - | - |
| submitBtn | 是否显示提交按钮 | Boolean | - | true |
| submitBtnText | 提交按钮文字 | String | - | "提交" |
| submitBtnWidth | 提交按钮宽度 | String | - | "100%" |
| submitBack | 提交后是否返回上一级页面 | Boolean | - | true |
| column | 表单项配置，见下方说明 | Array | - | [] |

## Column

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| `u-form-item` 所有属性 | [官方文档](https://uviewui.com/components/form.html#form-item-props) | - | - | - |
| 默认组件的所有属性 | 自行查看各组件文档：[官方文档](https://uviewui.com/components/input.html) | - | input/select/picker/rate/Numberbox /checkbox/radio/switch/slider/action-sheet | - |
| type | 表单类型 | String | text/password/textarea/Number/select/date/time/datetime /rate/Numberbox/chekcbox/radio/switch/slider/action | text |
| rules | 表单验证规则 | Array | - | - |
| dictData | 字典数据 | Array/Function/Promise | - | - |
| dictOption | 字典配置，见下方说明 | Object | - | - |
| display | 显示状态 | Boolean | - | true |
| addDisplay | 新增模式显示状态 | Boolean | - | true |
| editDisplay | 编辑模式显示状态 | Boolean | - | true |
| viewDisplay | 查看模式模式显示状态 | Boolean | - | true |
| disabled | 禁用状态 | Boolean | - | false |
| addDisabled | 新增模式禁用状态 | Boolean | - | false |
| editDisabled | 查看模式禁用状态 | Boolean | - | false |
| transform | 多选时(如 select 的多列、联动模式和 checkbox)是否将数组转为逗号分隔的字符串 | Boolean | - | false |

## DictOption

| 参数     | 说明                                 | 类型   | 可选值 | 默认值   |
| -------- | ------------------------------------ | ------ | ------ | -------- |
| label    | 字典名称属性值                       | String | -      | label    |
| value    | 字典值属性值                         | String | -      | value    |
| children | 子字典属性值                         | String | -      | children |
| res      | dictData 为 Promise 时返回的数据格式 | String | -      | res.data |

## Events

| 事件名 | 说明                 | 参数                                                                     |
| ------ | -------------------- | ------------------------------------------------------------------------ |
| submit | 点击提交按钮触发事件 | (form:表单数据对象,loading:取消加载按钮的函数,back:返回上一个页面的函数) |

## Methods

| 方法名      | 说明     | 参数                                  |
| ----------- | -------- | ------------------------------------- |
| formSubmit  | 提交表单 | -                                     |
| resetFields | 清空表单 | -                                     |
| validate    | 校验表单 | Function(callback: Function(Boolean)) |

## Slots

| name         | 说明                       | 参数                                   |
| ------------ | -------------------------- | -------------------------------------- |
| 属性名       | 表单项自定义内容           | {row,column,index,label,prop,dictData} |
| 属性名+Right | 表单项右方自定义内容       | {row,column,index,label,prop,dictData} |
| formItem     | app 需要自定义表单项时使用 | {row,column,index,label,prop,dictData} |
