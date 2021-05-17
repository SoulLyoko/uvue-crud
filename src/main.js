import Vue from "vue";
import App from "./App";
import uView from "uview-ui";
import uvueCrud from "../uvue-crud";

Vue.use(uView);
Vue.use(uvueCrud);

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();
