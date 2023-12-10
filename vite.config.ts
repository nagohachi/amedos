import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/amedos/",
  build: {
    outDir: "./dist",
  },
  plugins: [react()],
});
