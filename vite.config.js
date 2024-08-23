// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     // port: 4000,
//     proxy: {
//       "/api": {
//         target: "http://localhost:8000",
//         // target: "https://portfolio-backend-2nog.onrender.com",
//         changeOrigin: true,
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://portfolio-backend-2nog.onrender.com",
        changeOrigin: true,
        secure: false, // This is to handle HTTPS (if needed, depending on the server's SSL configuration)
        rewrite: (path) => path.replace(/^\/api/, ""), // Adjust the path rewrite if your backend routes start without `/api`
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
