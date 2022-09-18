import type { Plugin } from "vite";

const componentsEventsToFix = {
  // "u-icon": ["click"],
  // "u-image": ["click"],
  // "u-button": ["click"],
  // "u-text": ["click"],
  // "u-row": ["click"],
  // "u-col": ["click"],
  // "u-cell": ["click"],
  // "u-tag": ["click"],
  // "u-form-item": ["click"],
  // "u-search": ["click"],
  // "u-tooltip": ["click"],
  // "u-alert": ["click"],
  // "u-notice-bar": ["click"],
  // "u-swipe-action": ["click"],
  // "u-swipe-action-item": ["click"],
  // "u-overlay": ["click"],
  // "u-grid": ["click"],
  // "u-grid-item": ["click"],
  // "u-swiper": ["click"],
  // "u-divider": ["click"],
  // "u-tabbar-item": ["click"],
  // "u-tabs": ["click"],
  "u-list": ["scroll", "scrolltolower"]
};

export default function FixUviewEvents(): Plugin {
  return {
    name: "vite-plugin-fix-uview-events",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".vue")) return;
      const match = id.slice(id.lastIndexOf("/")).match(/(u-.*).vue/);
      const component = match?.[1];
      if (!component || !Object.keys(componentsEventsToFix).includes(component)) return;
      const emits = componentsEventsToFix[component];
      code = code.replace(/export default {/, `export default {\nemits:[${emits.map(e => '"' + e + '"')}],`);
      return code;
    }
  };
}
