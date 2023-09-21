import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, writeFileSync } from "node:fs";

const jsonDumpPath = "src/components/generated_components_dump.json";
if (!existsSync(jsonDumpPath)) {
  writeFileSync(jsonDumpPath, "{}");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
