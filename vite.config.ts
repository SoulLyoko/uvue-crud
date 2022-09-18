import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

import fixUviewEvents from "./plugins/fix-uview-events";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), fixUviewEvents()],
  optimizeDeps: {
    include: ["dayjs"]
  }
});
