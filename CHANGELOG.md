## [2.0.2](https://github.com/SoulLyoko/uvue-crud/compare/v2.0.1...v2.0.2) (2022-11-22)


### Bug Fixes

* uvue-list和uvue-form增加padding ([16700fa](https://github.com/SoulLyoko/uvue-crud/commit/16700fa03159aac6c2c9a2a2694c466a358098ba))



## [2.0.1](https://github.com/SoulLyoko/uvue-crud/compare/v2.0.0...v2.0.1) (2022-11-21)


### Features

* **uvue-form:** 表单项支持change事件 ([3375198](https://github.com/SoulLyoko/uvue-crud/commit/3375198dd1b665e687c7d539297a6b10258725c1))



# 2.0.0 (2022-11-16)


### Bug Fixes

* 当select和action匹配不到字典时，默认使用传入的值 ([1322207](https://github.com/SoulLyoko/uvue-crud/commit/1322207cf8bc6896d6058c3454915a1c0aa0df79))
* 导出组件 ([a103db6](https://github.com/SoulLyoko/uvue-crud/commit/a103db66dda3534b081c4293ceba6dd38c977c6e))
* 兼容小程序slot ([d3d903d](https://github.com/SoulLyoko/uvue-crud/commit/d3d903d9020ae8b9e1839e4b384ed1acdcfb5c3a))
* 修复日期选择组件显示0NaN-NaN-NaN的问题 ([bffe2aa](https://github.com/SoulLyoko/uvue-crud/commit/bffe2aa8af10b3274272d912113d28cde02ba88d)), closes [#3](https://github.com/SoulLyoko/uvue-crud/issues/3)
* 修复作为label显示的u-input传入数字报错的问题 ([72b8e22](https://github.com/SoulLyoko/uvue-crud/commit/72b8e226551567f2f0eb2aca01f89c72e5be908e))
* 优化加载状态 ([cac8f36](https://github.com/SoulLyoko/uvue-crud/commit/cac8f362bd08591bd424f479dedc421ddef172e5))
* 优化uvue-filter中dropdown的scroll-view ([0e593e1](https://github.com/SoulLyoko/uvue-crud/commit/0e593e1bd04112710ed420a2c0422f6cebf37e25))
* 支持uvue-list配置option.sticky ([4c21a62](https://github.com/SoulLyoko/uvue-crud/commit/4c21a628dc0836ddbeda2982ea1112367bfbb660))
* export error ([4646165](https://github.com/SoulLyoko/uvue-crud/commit/4646165e3ecd5011ff5f274583c8a3cc95e5f106))
* fix `clearValidate` ([0bde0db](https://github.com/SoulLyoko/uvue-crud/commit/0bde0dbe9c853dcdfbe218bb4f76efba9ee72b37))
* fix and export types ([430025b](https://github.com/SoulLyoko/uvue-crud/commit/430025b39f0bdaf5d709d0952e076a25af332067))
* form item default slot ([57659b9](https://github.com/SoulLyoko/uvue-crud/commit/57659b970578c9f34e135d65e4215e0078c97581))
* remove uvue-scroll-list ([0a6d6c4](https://github.com/SoulLyoko/uvue-crud/commit/0a6d6c4e7ad26e248bfbbfe3ce5fc891129e482c))
* **uvue-datetime-picker:** 默认显示当前日期时间 ([363a716](https://github.com/SoulLyoko/uvue-crud/commit/363a7166017f564253f59263d90554d3645b2f06))
* **uvue-form:** 兼容小程序 ([47271cb](https://github.com/SoulLyoko/uvue-crud/commit/47271cb87dd7cfac3377d693e85b5690e60df0c2))
* **uvue-form:** collapse props ([9f72f14](https://github.com/SoulLyoko/uvue-crud/commit/9f72f1415d8bd627ff851ca0f0f735f72950482c))
* **uvue-form:** dynamic slot ([6bfc674](https://github.com/SoulLyoko/uvue-crud/commit/6bfc6744d869f7575bad90823cd5ab37eb074774))
* **uvue-form:** menuBtn ([2809035](https://github.com/SoulLyoko/uvue-crud/commit/2809035989abaeccaf4c36de15618b911f14cec8))
* **uvue-form:** rules根据display动态设置 ([546d72b](https://github.com/SoulLyoko/uvue-crud/commit/546d72b1f2efbcd9de587718a95e0754455b0087))
* **uvue-form:** types ([d1c78d7](https://github.com/SoulLyoko/uvue-crud/commit/d1c78d7c25d0e96974ef1290a71a107fed0c09a3))
* **uvue-form:** watch rules immediate ([bfc7f40](https://github.com/SoulLyoko/uvue-crud/commit/bfc7f40d7ebcd7f56beab3256627afa3d9fea0a4))
* **uvue-list:** 当row[rowKey]不存在则绑定index ([038b7f6](https://github.com/SoulLyoko/uvue-crud/commit/038b7f6e0864b35ed615a21fee321098818af019))
* **uvue-list:** 兼容小程序 ([c461b7d](https://github.com/SoulLyoko/uvue-crud/commit/c461b7dc3f3b1902dcc9039b722ddc56e8542729))
* uvue-list默认使用u-cell,可通过插槽自定义 ([f35062c](https://github.com/SoulLyoko/uvue-crud/commit/f35062c1f837424bfee753e7724b1d349a5df7e4))
* **uvue-list:** list-item cell slot props ([82b22f7](https://github.com/SoulLyoko/uvue-crud/commit/82b22f7968c4463747039d4c21ec88b61139bd94))


### Features

* 日期时间选择表单组件新增format和valueFormat区分值格式和显示框格式 ([28f3c62](https://github.com/SoulLyoko/uvue-crud/commit/28f3c6266f7574804b1486d42ea78b77378610ec))
* 新增clearValidate函数 ([3cb44c9](https://github.com/SoulLyoko/uvue-crud/commit/3cb44c92557e7d1a83b8b5472993b78c09b6762a))
* uvue-dict ([716afe4](https://github.com/SoulLyoko/uvue-crud/commit/716afe4ca95648fac8b8306fea2d4926080a08a4))
* uvue-dynamic 动态子表单 ([d924e57](https://github.com/SoulLyoko/uvue-crud/commit/d924e57e6f3a0052209508983af1de2dc1103811))
* **uvue-form:** 增加字典缓存，避免重复请求 ([b37cc1c](https://github.com/SoulLyoko/uvue-crud/commit/b37cc1c3196f6c0db3ad1d507c1c273fd2cf0fe7))
* **uvue-form:** 支持value默认值属性 ([67f478e](https://github.com/SoulLyoko/uvue-crud/commit/67f478ee8f5607eade977cbde003de3264627949))
* **uvue-form:** support group ([b8d5fc5](https://github.com/SoulLyoko/uvue-crud/commit/b8d5fc5a843bde025c3cf84321ea121ac5a296e1))
* uvue-list,uvue-scroll-list ([cf11558](https://github.com/SoulLyoko/uvue-crud/commit/cf11558153818fcb1f401d93753cc14a04a761a2))
* **uvue-list:** add item-click event ([67bdc5a](https://github.com/SoulLyoko/uvue-crud/commit/67bdc5a6f510e2c0494648b8c140887f2ea51600))



