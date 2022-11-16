# uvue-list 列表组件

## 使用示例

```html
<template>
  <uvue-list :option="option" :data="data" @item-click="onItemClick"></uvue-list>
</template>

<script setup>
  const option = {
    rowKey: "id",
    formatter(row) {
      return {
        title: row.title,
        label: row.bar,
        value: row.foo
      };
    }
  };
  const data = [
    {
      id: "1",
      title: "title1",
      bar: "bar1",
      foo: "foo1"
    },
    {
      id: "2",
      title: "title2",
      bar: "bar2",
      foo: "foo2"
    }
  ];
  function onItemClick(row, index) {
    console.log(row, index);
  }
</script>
```

## Props

| 参数                | 说明                                                                                          | 类型   | 可选值                  | 默认值   |
| ------------------- | --------------------------------------------------------------------------------------------- | ------ | ----------------------- | -------- |
| data                | 列表数据，`u-cell`的传入属性优先级为`{ ...option.cell, ...(option.formatter?.(row) ?? row) }` | Array  | -                       | []       |
| option              | 列表配置，见下方说明                                                                          | Object | -                       | {}       |
| v-model:searchValue | 搜索栏绑定值                                                                                  | String | -                       | -        |
| status              | 加载状态                                                                                      | String | loadmore/loading/nomore | loadmore |
| scrollTop           | 页面的滚动距离，通过 onPageScroll 生命周期获取                                                | Number | -                       | 0        |

## Option

| 参数      | 说明                                                                                             | 类型                           | 可选值 | 默认值 |
| --------- | ------------------------------------------------------------------------------------------------ | ------------------------------ | ------ | ------ |
| rowKey    | 唯一键                                                                                           | string                         | -      | id     |
| sticky    | 吸顶属性 [文档](https://uiadmin.net/uview-plus/components/sticky.html#props)                     | object                         | -      | {}     |
| search    | 搜索栏属性，false 不显示 [文档](https://uiadmin.net/uview-plus/components/search.html#props)     | Object/false                   | -      | {}     |
| empty     | 空内容属性，false 不显示 [文档](https://uiadmin.net/uview-plus/components/empty.html#props)      | Object/false                   | -      | {}     |
| loadmore  | 加载更多属性，false 不显示 [文档](https://uiadmin.net/uview-plus/components/loadmore.html#props) | Object/false                   | -      | {}     |
| backTop   | 回到顶部属性，false 不显示 [文档](https://uiadmin.net/uview-plus/components/backTop.html#props)  | Object/false                   | -      | {}     |
| cellGroup | 单元格组属性 [文档](https://uiadmin.net/uview-plus/components/cell.html#cellgroup-props)         | Object/false                   | -      | {}     |
| cell      | 单元格属性 [文档](https://uiadmin.net/uview-plus/components/cell.html#cell-props)                | Object/false                   | -      | {}     |
| formatter | 动态单元格属性                                                                                   | (row:数据项)=>需返回单元格属性 | -      | -      |

## Events

| 事件名           | 说明                                                                                 | 参数             |
| ---------------- | ------------------------------------------------------------------------------------ | ---------------- |
| loadmore         | 加载更多组件事件，加载状态 status 为 loadmore 时，点击组件会发出此事件               | -                |
| search           | 搜索栏组件事件，用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 | value:输入框的值 |
| search-change    | 搜索栏组件事件，输入框内容发生变化时触发                                             | value:输入框的值 |
| search-custom    | 搜索栏组件事件，用户点击右侧控件时触发                                               | value:输入框的值 |
| search-blur      | 搜索栏组件事件，输入框失去焦点时触发                                                 | value:输入框的值 |
| search-focus     | 搜索栏组件事件，输入框获得焦点时触发                                                 | value:输入框的值 |
| search-clear     | 搜索栏组件事件，配置了 clearabled 后，清空内容时会发出此事件                         | -                |
| search-click     | 搜索栏组件事件，disabled 为 true 时，点击输入框，发出此事件，用于跳转搜索页          | -                |
| search-clickIcon | 搜索栏组件事件，左侧 icon 点击时候时触发                                             | -                |
| item-click       | 列表项单元格点击时触发                                                               | (row,index)      |

## Slots

| name            | 说明         | 参数        |
| --------------- | ------------ | ----------- |
| title           | 单元格插槽   | {row,index} |
| label           | 单元格插槽   | {row,index} |
| value           | 单元格插槽   | {row,index} |
| icon            | 单元格插槽   | {row,index} |
| right-icon      | 单元格插槽   | {row,index} |
| search-top      | 搜索栏上方   | -           |
| search-bottom   | 搜索栏下方   | -           |
| list-top        | 列表上方     | -           |
| list-bottom     | 列表下方     | -           |
| list-item       | 列表项       | {row,index} |
| loadmore-top    | 加载更多上方 | -           |
| loadmore-bottom | 加载更多下方 | -           |
