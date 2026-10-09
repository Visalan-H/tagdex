import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tagdex.visalan.me",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
