import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import Unocss from "unocss/vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Unocss(), Pages()],
  server: {
    port: 9527,
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
