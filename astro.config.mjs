import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://tagdex.visalan.me",

  vite: {
    plugins: [tailwindcss()],
  },
});
