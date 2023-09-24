import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import virtual from "./plugins/virtual.plugin";
import axios from "axios";
import restart from "vite-plugin-restart";

const getComponents = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/components`);
    const components = data.map((item) => {
      return {
        name: item.componentId,
        version: item.version,
        sfc: item.code,
      }
    });
    return components
  } catch (error) {
    console.log(error);
  }
};

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const components = await getComponents()
  const virtualComponents = components.reduce(
    (acc, curr) => ({ ...acc, [`virtual:${curr.name}_${curr.version}.tsx`]: curr.sfc }),
    {}
  )
  const exportAllVirtualComponents = components.map(
    (comp) => `export { default as ${comp.name}_${comp.version} } from 'virtual:${comp.name}_${comp.version}.tsx';`
  ).join("\n")

  return {
  plugins: [
    react(),
    virtual({
      ...virtualComponents,
      'virtual:components.tsx': exportAllVirtualComponents
    }),
    restart({
      restart: ["./src/components/**"],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}
});
