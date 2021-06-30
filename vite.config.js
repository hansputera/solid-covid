import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import VitePluginWindicss from "vite-plugin-windicss";

export default defineConfig({
  plugins: [solidPlugin(), VitePluginWindicss()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
