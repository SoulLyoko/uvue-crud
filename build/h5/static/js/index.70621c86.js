(function(t){function e(e){for(var a,r,u=e[0],l=e[1],c=e[2],s=0,f=[];s<u.length;s++)r=u[s],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&f.push(o[r][0]),o[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,r=1;r<n.length;r++){var l=n[r];0!==o[l]&&(a=!1)}a&&(i.splice(e--,1),t=u(u.s=n[0]))}return t}var a={},o={index:0},i=[];function r(t){return u.p+"static/js/"+({"pages-form-form":"pages-form-form","pages-list-list":"pages-list-list"}[t]||t)+"."+{"pages-form-form":"7f5454a6","pages-list-list":"56bbabe1"}[t]+".js"}function u(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var a=new Promise((function(e,a){n=o[t]=[e,a]}));e.push(n[2]=a);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=r(t);var c=new Error;i=function(e){l.onerror=l.onload=null,clearTimeout(s);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,n[1](c)}o[t]=void 0}};var s=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(e)},u.m=t,u.c=a,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)u.d(n,a,function(e){return t[e]}.bind(null,a));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/uvue-crud/build/h5/",u.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var s=0;s<l.length;s++)e(l[s]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0196":function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__("ee27").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("d81d"),__webpack_require__("d3b7"),__webpack_require__("caad"),__webpack_require__("2532");var _defineProperty2=_interopRequireDefault(__webpack_require__("fc11")),_objectSpread4=_interopRequireDefault(__webpack_require__("f3f3")),_option=__webpack_require__("0cf6"),_default2={name:"uvue-form",props:{value:{type:Object,default:function(){return{}}},option:{type:Object,default:function(){return{}}}},data:function(){return{formOption:{},rules:{},formDict:{},submitLoading:!1}},watch:{option:{handler:function handler(val){var _val$column,_this=this;this.formOption=(0,_objectSpread4.default)((0,_objectSpread4.default)((0,_objectSpread4.default)({},_option.defaultOption),val||{}),{},{column:null===val||void 0===val||null===(_val$column=val.column)||void 0===_val$column?void 0:_val$column.map((function(col){if(col.rules&&(_this.rules[col.prop]=col.rules),col.dictData){_this.formDict[col.prop]=[];var dictOption=(0,_objectSpread4.default)((0,_objectSpread4.default)({},_option.defaultDictOption),col.dictOption||{}),dictDataType=Object.prototype.toString.call(col.dictData);if(dictDataType.includes("Function"))_this.setFormDict(col.prop,col.dictData(),dictOption);else if(dictDataType.includes("Promise")){var _col$dictData$then,_col$dictData;null===(_col$dictData$then=(_col$dictData=col.dictData).then)||void 0===_col$dictData$then||_col$dictData$then.call(_col$dictData,(function(res){var data=eval(dictOption.res);_this.setFormDict(col.prop,data,dictOption)})).catch((function(t){console.error("请求字典错误:"+t)}))}else dictDataType.includes("Array")&&_this.setFormDict(col.prop,col.dictData,dictOption)}var operation=["select","action","date","time","datetime"].includes(col.type)?"选择":"输入";return(0,_objectSpread4.default)({type:"text",placeholder:"请"+operation+col.label},col)}))}),this.setRules(this.rules)},immediate:!0,deep:!0}},mounted:function(){this.setRules(this.rules)},methods:{setRules:function(t){var e;null===(e=this.$refs.uForm)||void 0===e||e.setRules(t)},resetFields:function(){var t;null===(t=this.$refs.uForm)||void 0===t||t.resetFields()},validate:function(t){var e;null===(e=this.$refs.uForm)||void 0===e||e.validate(t)},updateProp:function(t,e){var n=(0,_objectSpread4.default)((0,_objectSpread4.default)({},this.value),{},(0,_defineProperty2.default)({},t,e));this.$emit("input",n)},formSubmit:function(){var t=this;this.validate((function(e){e&&(t.submitLoading=!0,t.$emit("submit",t.value,(function(){t.submitLoading=!1,uni.navigateBack()})))}))},getFormItemValue:function(t){var e,n;return null!==(e=null!==(n=this.value[t.prop])&&void 0!==n?n:t.value)&&void 0!==e?e:""},setFormDict:function(t,e,n){this.formDict=(0,_objectSpread4.default)((0,_objectSpread4.default)({},this.formDict),{},(0,_defineProperty2.default)({},t,e.map((function(t){return{label:t[n.label],value:t[n.value],text:t[n.label],children:t[n.children]}}))))}}};exports.default=_default2},"034f":function(t,e,n){"use strict";var a=n("ef9e"),o=n.n(a);o.a},"0cf6":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.defaultDictOption=e.defaultOption=void 0;var a={submitBtn:!0,submitBtnText:"提交"};e.defaultOption=a;var o={label:"label",value:"value",children:"children",res:"res.data"};e.defaultDictOption=o},"0f5f":function(t,e,n){"use strict";n.r(e);var a=n("0196"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"23be":function(t,e,n){"use strict";n.r(e);var a=n("3b4e"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},2734:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={uInput:n("d5da").default,uSelect:n("4c05").default,uPicker:n("665d").default,uCheckboxGroup:n("e620").default,uCheckbox:n("1e79").default,uRadioGroup:n("bb8e").default,uRadio:n("1e88").default,uRate:n("1426").default,uSwitch:n("89f2").default,uActionSheet:n("99aa").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uvue-form-item__content"},[t.$scopedSlots.default?t._t("default"):[t.inputTypes.includes(t.$attrs.type)?n("u-input",t._b({on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.updateValue.apply(void 0,arguments)}}},"u-input",t.$attrs,!1)):t._e(),"select"===t.$attrs.type?[n("u-input",t._b({attrs:{type:"select",value:t.selectLabel},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.selectShow=!0}}},"u-input",t.$attrs,!1)),n("u-select",t._b({attrs:{"default-value":t.selectDefaultValue,list:t.$attrs.dictData},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.selectConfirm.apply(void 0,arguments)}},model:{value:t.selectShow,callback:function(e){t.selectShow=e},expression:"selectShow"}},"u-select",t.$attrs,!1))]:t._e(),t.pickerTypes.includes(t.$attrs.type)?[n("u-input",t._b({attrs:{type:"select"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pickerShow=!0}}},"u-input",t.$attrs,!1)),n("u-picker",t._b({attrs:{mode:"time",params:t.pickerParams,"default-time":t.$attrs.value},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.pickerConfirm.apply(void 0,arguments)}},model:{value:t.pickerShow,callback:function(e){t.pickerShow=e},expression:"pickerShow"}},"u-picker",t.$attrs,!1))]:t._e(),"checkbox"===t.$attrs.type?n("u-checkbox-group",t._b({},"u-checkbox-group",t.$attrs,!1),t._l(t.$attrs.dictData,(function(e){return n("u-checkbox",t._b({key:e.value,attrs:{value:t.$attrs.value.includes(e.value),name:e.value},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.checkboxChange.apply(void 0,arguments)}}},"u-checkbox",e,!1),[t._v(t._s(e.label))])})),1):t._e(),"radio"===t.$attrs.type?n("u-radio-group",t._b({on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.updateValue.apply(void 0,arguments)}}},"u-radio-group",t.$attrs,!1),t._l(t.$attrs.dictData,(function(e){return n("u-radio",t._b({key:e.value,attrs:{value:t.$attrs.value,name:e.value}},"u-radio",e,!1),[t._v(t._s(e.label))])})),1):t._e(),"rate"===t.$attrs.type?n("u-rate",t._b({},"u-rate",t.$attrs,!1)):t._e(),"switch"===t.$attrs.type?n("u-switch",t._b({on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.updateValue.apply(void 0,arguments)}},model:{value:t.switchValue,callback:function(e){t.switchValue=e},expression:"switchValue"}},"u-switch",t.$attrs,!1)):t._e(),"action"===t.$attrs.type?[n("u-input",t._b({attrs:{type:"select",value:t.actionLabel},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.actionShow=!0}}},"u-input",t.$attrs,!1)),n("u-action-sheet",t._b({attrs:{list:t.$attrs.dictData},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.actionClick.apply(void 0,arguments)}},model:{value:t.actionShow,callback:function(e){t.actionShow=e},expression:"actionShow"}},"u-action-sheet",t.$attrs,!1))]:t._e()]],2)},i=[]},"3b4e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=a},"3dfd":function(t,e,n){"use strict";n.r(e);var a=n("61f1"),o=n("23be");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("034f");var r,u=n("f0c5"),l=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=l.exports},4758:function(t,e,n){"use strict";n.r(e);var a=n("8ed9"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},4831:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.defaultOption=void 0;var a={rowKey:"",formPath:"",addBtn:!0,addBtnText:"新增",search:!0,loadmore:!0};e.defaultOption=a},"4ec5":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={uSearch:n("9cf5").default,uCellGroup:n("c149").default,uCellItem:n("065d").default,uEmpty:n("7516").default,uLoadmore:n("eb64").default,uBackTop:n("e3c9").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uvue-list"},[t._t("searchTop"),n("u-search",{directives:[{name:"show",rawName:"v-show",value:t.listOption.search,expression:"listOption.search"}],attrs:{placeholder:"请输入关键字","action-text":t.listOption.addBtnText,value:t.searchKey,"show-action":t.listOption.addBtn},on:{search:function(e){arguments[0]=e=t.$handleEvent(e),t.$emit("search",e)},custom:function(e){arguments[0]=e=t.$handleEvent(e),t.rowAdd.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.$emit("update:searchKey",e)}}}),t._t("listTop"),n("u-cell-group",{directives:[{name:"show",rawName:"v-show",value:t.data.length,expression:"data.length"}],attrs:{border:!1}},t._l(t.data,(function(e,a){return n("u-cell-item",{key:t.listOption.rowKey?e[t.listOption.rowKey]:a,attrs:{arrow:!1,"use-label-slot":!1},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.rowEdit(e)}}},[n("template",{slot:"title"},[t._t("title",null,{row:e,index:a})],2),n("template",{slot:"label"},[t._t("content",null,{row:e,index:a})],2),n("template",{slot:"right-icon"},[t._t("right",null,{row:e,index:a})],2)],2)})),1),t._t("listBottom"),n("u-empty",{directives:[{name:"show",rawName:"v-show",value:!t.data.length,expression:"!data.length"}]}),n("u-loadmore",{directives:[{name:"show",rawName:"v-show",value:t.listOption.loadmore&&t.data.length,expression:"listOption.loadmore && data.length"}],attrs:{status:t.status},on:{loadmore:function(e){arguments[0]=e=t.$handleEvent(e),t.$emit("loadmore",e)}}}),n("u-back-top",{directives:[{name:"show",rawName:"v-show",value:t.scrollTop,expression:"scrollTop"}],attrs:{"scroll-top":t.scrollTop}})],2)},i=[]},"54cd":function(t,e,n){"use strict";n.r(e);var a=n("2734"),o=n("4758");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("559a");var r,u=n("f0c5"),l=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"0393271a",null,!1,a["a"],r);e["default"]=l.exports},"559a":function(t,e,n){"use strict";var a=n("ca82"),o=n.n(a);o.a},"56d7":function(t,e,n){"use strict";var a=n("ee27").default,o=a(n("f3f3"));n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("6cdc"),n("1c31");var i=a(n("e143")),r=a(n("3dfd")),u=a(n("6b52")),l=a(n("fda2"));i.default.use(u.default),i.default.use(l.default),i.default.config.productionTip=!1,r.default.mpType="app";var c=new i.default((0,o.default)({},r.default));c.$mount()},"61f1":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("App",{attrs:{keepAliveInclude:t.keepAliveInclude}})},i=[]},6412:function(t,e,n){"use strict";n.r(e);var a=n("9c1f"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"6cdc":function(t,e,n){"use strict";(function(t){var e=n("ee27").default,a=e(n("e143"));t["________"]=!0,delete t["________"],t.__uniConfig={easycom:{"^u-(.*)":"uview-ui/components/u-$1/u-$1.vue","^uvue-(.*)":"@/../uvue-crud/components/uvue-$1/index.vue","^unicloud-db$":"@dcloudio/uni-cli-shared/components/unicloud-db.vue","^page-meta$":"@dcloudio/uni-cli-shared/components/page-meta.vue","^navigation-bar$":"@dcloudio/uni-cli-shared/components/navigation-bar.vue","^uni-match-media$":"@dcloudio/uni-cli-shared/components/uni-match-media.vue"},globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"uni-app",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8"}},t.__uniConfig.compilerVersion="3.1.13",t.__uniConfig.router={mode:"hash",base:"/uvue-crud/build/h5/"},t.__uniConfig.publicPath="/uvue-crud/build/h5/",t.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4},t.__uniConfig.debug=!1,t.__uniConfig.networkTimeout={request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},t.__uniConfig.sdkConfigs={},t.__uniConfig.qqMapKey="XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2",t.__uniConfig.nvue={"flex-direction":"column"},t.__uniConfig.__webpack_chunk_load__=n.e,a.default.component("pages-list-list",(function(t){var e={component:n.e("pages-list-list").then(function(){return t(n("7325"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(e.loading={name:"SystemAsyncLoading",render:function(t){return t(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(e.error={name:"SystemAsyncError",render:function(t){return t(__uniConfig["async"]["error"])}}),e})),a.default.component("pages-form-form",(function(t){var e={component:n.e("pages-form-form").then(function(){return t(n("1dad"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(e.loading={name:"SystemAsyncLoading",render:function(t){return t(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(e.error={name:"SystemAsyncError",render:function(t){return t(__uniConfig["async"]["error"])}}),e})),t.__uniRoutes=[{path:"/",alias:"/pages/list/list",component:{render:function(t){return t("Page",{props:Object.assign({isQuit:!0,isEntry:!0},__uniConfig.globalStyle,{navigationBarTitleText:"uvue-list"})},[t("pages-list-list",{slot:"page"})])}},meta:{id:1,name:"pages-list-list",isNVue:!1,maxWidth:0,pagePath:"pages/list/list",isQuit:!0,isEntry:!0,windowTop:44}},{path:"/pages/form/form",component:{render:function(t){return t("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"uvue-form"})},[t("pages-form-form",{slot:"page"})])}},meta:{name:"pages-form-form",isNVue:!1,maxWidth:0,pagePath:"pages/form/form",windowTop:44}},{path:"/preview-image",component:{render:function(t){return t("Page",{props:{navigationStyle:"custom"}},[t("system-preview-image",{slot:"page"})])}},meta:{name:"preview-image",pagePath:"/preview-image"}},{path:"/choose-location",component:{render:function(t){return t("Page",{props:{navigationStyle:"custom"}},[t("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(t){return t("Page",{props:{navigationStyle:"custom"}},[t("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}],t.UniApp&&new t.UniApp}).call(this,n("c8ba"))},7254:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={uForm:n("aa8f").default,uFormItem:n("e0a3").default,uvueFormItem:n("54cd").default,uButton:n("d9ad").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uvue-form"},[n("u-form",t._b({ref:"uForm",attrs:{model:t.value,rules:t.rules}},"u-form",t.formOption,!1),t._l(t.formOption.column,(function(e,a){return n("u-form-item",t._b({key:e.prop||a},"u-form-item",e,!1),[t.$scopedSlots.formItem?t._t("formItem",null,{row:t.value,column:e,index:a,label:e.label,prop:e.prop,dictData:t.formDict[e.prop]}):t.$scopedSlots[e.prop]?t._t(e.prop,null,{row:t.value,column:e,index:a,label:e.label,prop:e.prop,dictData:t.formDict[e.prop]}):n("uvue-form-item",t._b({attrs:{value:t.getFormItemValue(e),dictData:t.formDict[e.prop]},on:{input:function(n){arguments[0]=n=t.$handleEvent(n),t.updateProp(e.prop,n)}}},"uvue-form-item",e,!1)),n("template",{slot:"right"},[t._t(e.prop+"Right",null,{row:t.value,column:e,index:a,label:e.label,prop:e.prop,dictData:t.formDict[e.prop]})],2)],2)})),1),t.formOption.submitBtn?n("u-button",{attrs:{type:"primary",loading:t.submitLoading},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.formSubmit.apply(void 0,arguments)}}},[t._v(t._s(t.formOption.submitBtnText))]):t._e()],1)},i=[]},"8ed9":function(t,e,n){"use strict";var a=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("d0ff"));n("c740"),n("7db0"),n("99af"),n("4de4");var i={name:"uvue-form-item",data:function(){return{inputTypes:["text","password","textarea","number"],pickerTypes:["date","time","datetime"],selectShow:!1,pickerShow:!1,actionShow:!1,switchValue:this.$attrs.activeValue===this.$attrs.value}},computed:{selectDefaultValue:function(){var t=this.$attrs,e=t.dictData,n=t.value,a=e.findIndex((function(t){return t.value===n}));return[a]},selectLabel:function(){var t=this.$attrs,e=t.dictData,n=t.value,a=e.find((function(t){return t.value===n}))||{};return a.label||""},actionLabel:function(){var t=this.$attrs,e=t.dictData,n=t.value,a=e.find((function(t){return t.value===n}))||{};return a.label||""},pickerParams:function(){switch(this.$attrs.type){case"date":return{year:!0,month:!0,day:!0,timestamp:!0};case"time":return{hour:!0,minute:!0,second:!0,timestamp:!0};case"datetime":return{year:!0,month:!0,day:!0,hour:!0,minute:!0,second:!0,timestamp:!0};default:return}}},methods:{updateValue:function(t){this.$emit("input",t)},selectConfirm:function(t){this.updateValue(t[0].value)},pickerConfirm:function(t){var e=this.$attrs,n=e.format,a=e.type,o={date:"yyyy-mm-dd",time:"hh:MM:ss",datetime:"yyyy-mm-dd hh:MM:ss"},i=this.$u.timeFormat(t.timestamp,n||o[a]);this.updateValue(i)},checkboxChange:function(t){var e=t.value,n=t.name,a=[];a=e?[].concat((0,o.default)(this.$attrs.value),[n]):this.$attrs.value.filter((function(t){return t!==n})),this.updateValue(a)},actionClick:function(t){var e=this.$attrs.dictData[t].value;this.updateValue(e)}}};e.default=i},9714:function(t,e,n){"use strict";n.r(e);var a=n("4ec5"),o=n("6412");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);var r,u=n("f0c5"),l=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=l.exports},"9c1f":function(t,e,n){"use strict";var a=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("f3f3"));n("a9e3"),n("99af");var i=n("4831"),r={name:"uvue-list",props:{option:{type:Object,default:function(){return{}}},data:{type:Array,default:function(){return[]}},searchKey:{type:String,default:""},status:{type:String,default:"nomore"},scrollTop:{type:Number,default:0}},data:function(){return{listOption:{}}},watch:{option:{handler:function(t){this.listOption=(0,o.default)((0,o.default)({},i.defaultOption),t)},immediate:!0,deep:!0}},methods:{rowAdd:function(){var t=this.listOption.formPath;t&&uni.navigateTo({url:t+"?formType=add"})},rowEdit:function(t){var e=this.listOption.formPath;e&&uni.navigateTo({url:"".concat(e,"?formType=edit&&formData=").concat(encodeURIComponent(JSON.stringify(t)))})}}};e.default=r},b487:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".uvue-form-item__content[data-v-0393271a]{width:100%;margin-left:%?20?%}",""]),t.exports=e},c28a:function(t,e,n){"use strict";n.r(e);var a=n("7254"),o=n("0f5f");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);var r,u=n("f0c5"),l=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=l.exports},ca82:function(t,e,n){var a=n("b487");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("70076c72",a,!0,{sourceMap:!1,shadowMode:!1})},ea0b:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*每个页面公共css */",""]),t.exports=e},ef9e:function(t,e,n){var a=n("ea0b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("e20da9d0",a,!0,{sourceMap:!1,shadowMode:!1})},fda2:function(t,e,n){"use strict";var a=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("4160"),n("159b");var o=a(n("9714")),i=a(n("c28a")),r=a(n("54cd")),u=[o.default,i.default,r.default],l=function t(e){t.installed||u.forEach((function(t){e.component(t.name,t)}))},c={install:l};e.default=c}});