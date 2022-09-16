import type { Config } from "../types";

import { getCurrentInstance } from "vue";

import { CONFIG_KEY, CONFIG_DEFAULT } from "../constants";

export function useConfig(app?: any, userConfig?: Config): Config {
  if (app) {
    const config = { ...CONFIG_DEFAULT, ...(userConfig || {}) };
    app.config.globalProperties[CONFIG_KEY] = config;
    return config;
  } else {
    const instance = getCurrentInstance() as any;
    return instance?.proxy[CONFIG_KEY] || CONFIG_DEFAULT;
  }
}
