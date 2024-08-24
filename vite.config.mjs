import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Use the ESM version of path resolve
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: "https://portfolio-backend-2nog.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 500,
  },
  define: {
    "process.env": {},
  },
});
