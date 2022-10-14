/// <reference types="vite/client" />
/// <reference types="@yusui/types/avue/index" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "uview-plus" {
  const uviewPlus: any;
  export default uviewPlus;
}
