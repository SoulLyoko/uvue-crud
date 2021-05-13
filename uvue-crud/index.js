import uvueList from "./components/uvue-list/index.vue"
import uvueForm from "./components/uvue-form/index.vue"
import uvueFormItem from "./components/uvue-form-item/index.vue"

const components = [
	uvueList,
	uvueForm,
	uvueFormItem
]

const install = function(Vue, options = {}) {
	if (install.installed) return;
	components.forEach(_component => {
		Vue.component(_component.name, _component);
	});
};

export default {
	install
}
