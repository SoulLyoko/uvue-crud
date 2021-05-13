# uvue-list 列表组件

## Props

| 参数		| 说明											| 类型					| 可选值					| 默认值	|
| ---------	| ----------------------------------------------| ---------------------	| ----------------			| --------	|
| option	| 列表配置，见下方说明							| object				| -							| -			|
| data		| 列表数据										| array					| -							| -			|
| searchKey	| 默认搜索绑定的字段							| string/number/boolean	| -							| -			|
| status	| 加载状态										| string				| loadmore / loading / nomore	| loadmore	|
| scrollTop	| 页面的滚动距离，通过 onPageScroll 生命周期获取| string/number			| -							| 0			|

## Option

| 参数		| 说明											| 类型		| 可选值	| 默认值|
| ----------| --------------------------------------------	| -------	| ----------| ------|
| rowKey	| 每条数据的唯一键								| string	| -			| -		|
| formPath	| 跳转到表单页的路径，需要先在 pages.json 注册	| string	| -			| -		|
| addBtn	| 是否显示新增按钮								| boolean	| true/false| true	|
| addBtnText| 新增按钮文字									| string	| -			| 新增	|
| search	| 是否显示搜索栏								| boolean	| true/false| true	|

## Events

| 事件名   | 说明                                                                 | 参数             |
| -------- | -------------------------------------------------------------------- | ---------------- |
| search   | 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 | value:输入框的值 |
| loadmore | 加载状态 status 为 loadmore 时，点击组件会发出此事件                 |                  |

## Methods

| 方法名  | 说明             | 参数       |
| ------- | ---------------- | ---------- |
| rowAdd  | 跳转到新增表单页 | -          |
| rowEdit | 跳转到编辑表单页 | row:行数据 |

## Slots

| name    | 说明     | 参数        |
| ------- | -------- | ----------- |
| title   | 上方标题 | {row,index} |
| content | 下方内容 | {row,index} |
| right   | 右方内容 | {row,index} |
