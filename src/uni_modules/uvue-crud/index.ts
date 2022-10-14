import type { App } from "vue";
import type { Config } from "./types";

import components from "./components";
import { useConfig } from "./composables";

export * from "./components";
export * from "./composables";

export default {
  install(app: App, options: Config = {}) {
    useConfig(app, options);
    Object.entries(components).forEach(([key, value]) => {
      app.component(key, value);
    });
  }
};
