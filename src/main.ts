import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from "uview-plus";
import uvue from "./uni_modules/uvue-crud";

const dicMap = {
  single: [
    { label: "1", value: "1" },
    { label: "2", value: "2" }
  ],
  tree: [
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
  ],
  datetime: [
    { label: "date", value: "date" },
    { label: "time", value: "time" },
    { label: "datetime", value: "datetime" }
  ]
};

const request = {
  get: (url: keyof typeof dicMap) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: dicMap[url] });
      }, 1000);
    });
  }
};

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  app.use(uvue, { request });
  return {
    app
  };
}
