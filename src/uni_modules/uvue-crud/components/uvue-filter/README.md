# uvue-filter 过滤器组件

## 使用示例

```html
<template>
  <!-- 单独使用 -->
  <uvue-filter :option="filterOption" :filterForm.sync="filterForm"></uvue-filter>
  <!-- 在uvue-crud中使用 -->
  <uvue-list :filter="filterOption" :filterForm.sync="filterForm"></uvue-list>
</template>

<script>
  export default {
    data() {
      return {
        filterForm: {},
        filterOption: {
          items: [
            {
              title: "排序",
              prop: "sort",
              options: [
                { label: "综合排序", value: "" },
                { label: "销量优先", value: "sales" },
                { label: "距离优先", value: "distance" },
                { label: "速度优先", value: "speed" },
                { label: "评分优先", value: "score" }
              ]
            },
            {
              title: "速度",
              prop: "speed",
              options: [
                { label: "全部", value: "" },
                { label: "30分钟内", value: 30 },
                { label: "40分钟内", value: 40 },
                { label: "50分钟内", value: 50 },
                { label: "60分钟内", value: 60 }
              ]
            }
          ]
        }
      };
    }
  };
</script>
```

## Props

| 参数            | 说明                   | 类型   | 可选值 | 默认值 |
| --------------- | ---------------------- | ------ | ------ | ------ |
| option          | 过滤器配置，见下方说明 | Object | -      | -      |
| filterForm.sync | 过滤器绑定值           | Object | -      | -      |

## Option

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| `u-dropdown` 的所有属性 | [官方文档](https://uviewui.com/components/dropdown.html#dropdown-props) | - | - | - |
| items | 下拉菜单项，即`u-dropdown-item`数组，见下方说明 | Array | - | - |

## Filter-items

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| `u-dropdown-item` 的所有属性 | [官方文档](https://uviewui.com/components/dropdown.html#dropdown-item-props) | - | - | - |
| title | 过滤项标题 | String | - | - |
| prop | 过滤项的属性名 | String | - | - |
| dictData | 选项字典数据 | Array | - | - |
| options | 选项字典数据,同 dictData,两者选其一即可 | Array | - | - |
| dictOption | 字典配置，见下方说明 | Object | - | - |
| multiple | 是否多选选项 | Boolean | true/false | - |
| transform | 多选时是否将数组转为逗号分隔的字符串 | Boolean | true/false | - |
| cascader | 是否级联选项（仅支持二级） | Boolean | true/false | - |

## DictOption

| 参数     | 说明                                 | 类型   | 可选值 | 默认值   |
| -------- | ------------------------------------ | ------ | ------ | -------- |
| label    | 字典名称属性值                       | String | -      | label    |
| value    | 字典值属性值                         | String | -      | value    |
| children | 子字典属性值                         | String | -      | children |
| res      | dictData 为 Promise 时返回的数据格式 | String | -      | res.data |

- 当 cascader:true 时，options 的结构应该如下：

```js
[
  {
    label: "1",
    value: "1",
    children: [
      { label: "1-1", value: "1-1" },
      { label: "1-2", value: "1-2" }
    ]
  },
  {
    label: "2",
    value: "2",
    children: [
      { label: "2-1", value: "2-1" },
      { label: "2-2", value: "2-2" }
    ]
  }
];
```
