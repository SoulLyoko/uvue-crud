# uvue-list 列表组件

## 使用示例

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

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| option | 列表配置，见下方说明 | object | - | - |
| data | 列表数据 | array | - | - |
| searchKey | 默认搜索绑定的字段 | string/number/boolean | - | - |
| status | 加载状态 | string | loadmore / loading / nomore | loadmore |
| scrollTop | 页面的滚动距离，通过 onPageScroll 生命周期获取，传入该值则表示显示“回到顶部”按钮 | string/number | - | 0 |

## Option

| 参数          | 说明                                         | 类型    | 可选值     | 默认值 |
| ------------- | -------------------------------------------- | ------- | ---------- | ------ |
| rowKey        | 每条数据的唯一键                             | string  | -          | -      |
| formPath      | 跳转到表单页的路径，需要先在 pages.json 注册 | string  | -          | -      |
| addForm       | 是否点击操作按钮时跳转到 form 页面           | boolean | true/false | true   |
| editForm      | 是否点击列表项时跳转到 form 页面             | boolean | true/false | true   |
| actionBtn     | 是否显示操作按钮                             | boolean | true/false | true   |
| actionBtnText | 操作按钮文字                                 | string  | -          | 新增   |
| search        | 是否显示搜索栏                               | boolean | true/false | true   |
| loadmore      | 是否显示加载更多                             | boolean | true/false | true   |

## Events

| 事件名       | 说明                                                                 | 参数             |
| ------------ | -------------------------------------------------------------------- | ---------------- |
| search       | 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 | value:输入框的值 |
| loadmore     | 加载状态 status 为 loadmore 时，点击组件会发出此事件                 |                  |
| action-click | 操作按钮点击事件                                                     |                  |
| item-click   | 列表项点击事件                                                       | {row,index}      |

## Methods

| 方法名  | 说明             | 参数       |
| ------- | ---------------- | ---------- |
| rowAdd  | 跳转到新增表单页 | -          |
| rowEdit | 跳转到编辑表单页 | row:行数据 |

## Slots

| name       | 说明       | 参数        |
| ---------- | ---------- | ----------- |
| title      | 上方标题   | {row,index} |
| content    | 下方内容   | {row,index} |
| right      | 右方内容   | {row,index} |
| searchTop  | 搜索栏上方 |             |
| listTop    | 列表上方   |             |
| listBottom | 列表下方   |             |
