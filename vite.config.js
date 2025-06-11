import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    optimizeDeps: {
        // Forcer la pré-bundling de react-markdown
        include: ["marked"],
    },

    build: {
        outDir: "../../web/dist",
        emptyOutDir: false,
        minify: "terser",
        sourcemap: false,

        // Cibler un environnement compatible
        target: "es2015",

        rollupOptions: {
            output: {
                format: "iife", // Format compatible navigateur
                entryFileNames: "ia-dialog.js",
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith(".css")) {
                        return "ia-dialog.css";
                    }
                    return "assets/[name]-[hash].[ext]";
                },
            },
        },
    },
});
