// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: function (id) {
            // React vendor chunk
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom")
            ) {
              return "react-vendor";
            }

            // Highlight.js and language definitions (largest chunks)
            if (id.includes("highlight.js/lib/languages/")) {
              return "highlight-js";
            }

            // Prism.js language support
            if (
              id.includes("refractor/lang/") ||
              id.includes("prismjs/components/")
            ) {
              return "prism-languages";
            }

            // React syntax highlighter
            if (id.includes("react-syntax-highlighter")) {
              return "syntax-highlighter";
            }

            // Lucide icons
            if (id.includes("lucide-react")) {
              return "icons";
            }

            // Babel runtime helpers
            if (id.includes("@babel/runtime")) {
              return "babel-runtime";
            }

            // Other vendor libraries
            if (id.includes("node_modules/")) {
              return "vendor";
            }
          },
        },
      },
      chunkSizeWarningLimit: 900,
    },
  },

  adapter: vercel(),
});
