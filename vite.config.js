import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: resolve(__dirname, "./src/components"),
      assets: resolve(__dirname, "./src/assets"),
      common: resolve(__dirname, "./src/common"),
      constant: resolve(__dirname, "./src/constant"),
      hook: resolve(__dirname, "./src/hook"),
      utils: resolve(__dirname, "./src/utils"),
      service: resolve(__dirname, "./src/service"),
      store: resolve(__dirname, "./src/store"),
    },
  },
});
