import uvueList from "./components/uvue-list/uvue-list.vue";
import uvueForm from "./components/uvue-form/uvue-form.vue";
import uvueFormItem from "./components/uvue-form-item/uvue-form-item.vue";
import uvueCascader from "./components/uvue-cascader/uvue-cascader.vue";
import uvueFilter from "./components/uvue-filter/uvue-filter.vue";
import uvueDict from "./components/uvue-dict/uvue-dict.vue";

const components = [uvueList, uvueForm, uvueFormItem, uvueCascader, uvueFilter, uvueDict];

const install = function (Vue) {
  if (install.installed) return;
  components.forEach(_component => {
    Vue.component(_component.name, _component);
  });
};

export default {
  install
};
