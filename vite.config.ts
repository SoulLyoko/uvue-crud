import path from "path";

import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { uviewPatch } from "@yusui/plugins";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), uviewPatch()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
  // optimizeDeps: {
  //   include: ["dayjs"]
  // }
});
