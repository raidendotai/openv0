import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const SERVER_HOST = process.env.SERVER_HOST || 'http://localhost:3000'
console.log('SERVER_HOST', SERVER_HOST)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `${SERVER_HOST}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
});
