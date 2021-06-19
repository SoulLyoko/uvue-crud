# uvue-cascader 级联组件

## 使用示例

```html
<template>
  <uvue-cascader v-model="value" :options="options"></uvue-cascader>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        options: [
          { label: "全部品类", value: "" },
          {
            label: "美食",
            value: "美食",
            children: [
              { label: "快餐便当", value: "快餐便当" },
              { label: "龙虾烧烤", value: "龙虾烧烤" },
              { label: "米粉面馆", value: "米粉面馆" },
              { label: "特色小吃", value: "特色小吃" },
              { label: "地方菜系", value: "地方菜系" },
              { label: "炸鸡炸串", value: "炸鸡炸串" }
            ]
          },
          {
            label: "甜点饮品",
            value: "甜点饮品",
            children: [
              { label: "面包蛋糕", value: "面包蛋糕" },
              { label: "可口甜品", value: "可口甜品" },
              { label: "奶茶果汁", value: "奶茶果汁" },
              { label: "醒脑咖啡", value: "醒脑咖啡" },
              { label: "凉茶冰淇淋", value: "凉茶冰淇淋" }
            ]
          }
        ]
      };
    }
  };
</script>
```

## Props

| 参数    | 说明                 | 类型          | 可选值 | 默认值 |
| ------- | -------------------- | ------------- | ------ | ------ |
| v-model | 绑定值               | String/Number | -      | -      |
| options | 级联数据，见下方说明 | Array         | -      | -      |

## Options

| 参数     | 说明                             | 类型          | 可选值 | 默认值 |
| -------- | -------------------------------- | ------------- | ------ | ------ |
| label    | 标题                             | String        | -      | -      |
| value    | 值                               | String/Number | -      | -      |
| children | 子项，包含 label 和 value 的数组 | Array         | -      | -      |

- 目前 options 只支持两级
