(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-form-form"],{"0efb":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,t("a15b");var o={data:function(){return{option:{labelWidth:100,column:[{label:"标题",prop:"title"},{label:"图片",prop:"img"},{label:"品类",prop:"category"},{label:"起送价",prop:"send"},{label:"配送费",prop:"fee"},{label:"评分",prop:"score"},{label:"销量",prop:"sales"},{label:"距离",prop:"distance"},{label:"速度",prop:"speed"},{label:"标签",prop:"tags",type:"checkbox",dictData:[{label:"热情掌柜",value:"热情掌柜"},{label:"分量充足",value:"分量充足"},{label:"价格便宜",value:"价格便宜"},{label:"销量热门",value:"销量热门"}]},{label:"优惠",prop:"discount"}]},formData:{},formType:""}},onLoad:function(e){if(this.formType=e.formType,"add"!==e.formType){var a,t,o=e.formData?JSON.parse(decodeURIComponent(e.formData)):{};o.discount=null!==(a=null===(t=o.discount)||void 0===t?void 0:t.join(","))&&void 0!==a?a:"",this.formData=o}},methods:{handleSubmit:function(e,a){a()}}};a.default=o},"1dad":function(e,a,t){"use strict";t.r(a);var o=t("26d7"),n=t("c9b6");for(var l in n)["default"].indexOf(l)<0&&function(e){t.d(a,e,(function(){return n[e]}))}(l);var r,u=t("f0c5"),i=Object(u["a"])(n["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);a["default"]=i.exports},"26d7":function(e,a,t){"use strict";t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return l})),t.d(a,"a",(function(){return o}));var o={uvueForm:t("d9e5").default},n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-uni-view",{staticStyle:{padding:"20rpx"}},[t("uvue-form",{attrs:{option:e.option,formType:e.formType},on:{submit:function(a){arguments[0]=a=e.$handleEvent(a),e.handleSubmit.apply(void 0,arguments)}},model:{value:e.formData,callback:function(a){e.formData=a},expression:"formData"}})],1)},l=[]},c9b6:function(e,a,t){"use strict";t.r(a);var o=t("0efb"),n=t.n(o);for(var l in o)["default"].indexOf(l)<0&&function(e){t.d(a,e,(function(){return o[e]}))}(l);a["default"]=n.a}}]);