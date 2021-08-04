# uvue-list 列表组件

## 使用示例

```html
<template>
  <view>
    <uvue-list :option="option" :data="listData">
      <template #body="{ row }">
        <view>{{ row.content }}</view>
      </template>
      <template #foot="{ row }">
        <view>{{ row.footer }}</view>
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
            subTitle: new Date().toLocaleDateString(),
            content: "content1",
            footer: "footer1"
          },
          {
            title: "title2",
            subTitle: new Date().toLocaleDateString(),
            content: "content2",
            footer: "footer2"
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
| option | 列表配置，见下方说明 | Object | - | - |
| search | 搜索栏配置，见下方说明，传入 false 则不显示 | Object/Boolean | - | {} |
| filter | 过滤器配置，见下方说明，传入 false 则不显示 | Object/Boolean | - | {} |
| loadmore | 加载更多配置，见下方说明，传入 false 则不显示 | Object/Boolean | - | {} |
| data | 列表数据，见下方说明 | Array | - | - |
| searchValue.sync | 搜索栏绑定值 | String/Number/Boolean | - | - |
| filterForm.sync | 过滤器绑定值 | Object | - | - |
| status | 加载状态 | String | loadmore / loading / nomore | loadmore |
| scrollTop | 页面的滚动距离，通过 onPageScroll 生命周期获取，传入该值则表示显示“回到顶部”按钮 | String/Number | - | 0 |

## Option

| 参数                | 说明                                                       | 类型    | 可选值     | 默认值 |
| ------------------- | ---------------------------------------------------------- | ------- | ---------- | ------ |
| `u-card` 的所有属性 | [官方文档](https://uviewui.com/components/card.html#props) | -       | -          | -      |
| rowKey              | 每条数据的唯一键                                           | String  | -          | -      |
| formPath            | 跳转到表单页的路径，需要先在 pages.json 注册               | String  | -          | -      |
| formKeys            | 跳转到表单携带的参数，以避免 url 过长，默认是整条数据      | Array   | -          | []     |
| sticky              | 搜索栏和过滤栏是否吸顶                                     | Boolean | true/false | true   |

## Search

| 参数                  | 说明                                                         | 类型 | 可选值 | 默认值 |
| --------------------- | ------------------------------------------------------------ | ---- | ------ | ------ |
| `u-search` 的所有属性 | [官方文档](https://uviewui.com/components/search.html#props) | -    | -      | -      |

## Filter

查看[uvue-filter 文档](https://github.com/SoulLyoko/uvue-crud/blob/master/uvue-crud/components/uvue-filter/README.md)

## Loadmore

| 参数                    | 说明                                                         | 类型 | 可选值 | 默认值 |
| ----------------------- | ------------------------------------------------------------ | ---- | ------ | ------ |
| `u-loadmore` 的所有属性 | [官方文档](https://uviewui.com/components/search.html#props) | -    | -      | -      |

## Data

| 参数                     | 说明                                                    | 类型 | 可选值 | 默认值 |
| ------------------------ | ------------------------------------------------------- | ---- | ------ | ------ |
| 支持 `u-card` 的所有属性 | 与`u-card` props 属性相同的字段会覆盖为`u-card`上的属性 | -    | -      | -      |

## Events

| 事件名        | 说明                                                                 | 参数                  |
| ------------- | -------------------------------------------------------------------- | --------------------- |
| search        | 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 | value:输入框的值      |
| loadmore      | 加载状态 status 为 loadmore 时，点击组件会发出此事件                 | -                     |
| filter-change | 用户选定过滤器中的项时触发                                           | filterForm:过滤器的值 |
| action-click  | 点击搜索栏的操作按钮时触发                                           | -                     |
| item-click    | 列表项卡片任意位置被点击时触发                                       | {row,index}           |
| head-click    | 列表项卡片头部被点击时触发                                           | {row,index}           |
| body-click    | 列表项卡片主体部分被点击时触发                                       | {row,index}           |
| foot-click    | 列表项卡片底部部分被点击时触发                                       | {row,index}           |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| rowAdd | 跳转到新增表单页，url：`${formPath}?formType=add&formData=${encodeURIComponent(JSON.Stringify(row))}` | row:默认表单数据 |
| rowEdit | 跳转到编辑表单页，url：`${formPath}?formType=edit&formData=${encodeURIComponent(JSON.Stringify(row))}` | row:行数据 |
| rowView | 跳转到查看表单页，url：`${formPath}?formType=view&formData=${encodeURIComponent(JSON.Stringify(row))}` | row:行数据 |

## Slots

| name       | 说明                      | 参数        |
| ---------- | ------------------------- | ----------- |
| head       | 列表项卡片头部内容        | {row,index} |
| body       | 列表项卡片主体内容        | {row,index} |
| foot       | 列表项卡片底部部分内容    | {row,index} |
| searchTop  | 搜索栏上方                | -           |
| filterTop  | 过滤器上方                | -           |
| listTop    | 列表上方                  | -           |
| listBottom | 列表下方(loadmore 的下方) | -           |
