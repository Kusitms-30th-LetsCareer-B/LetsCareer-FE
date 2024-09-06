import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    logOverride: { "ts(6133)": "silent" }, // TS6133 에러 무시 (사용되지 않는 변수)
  },
});
