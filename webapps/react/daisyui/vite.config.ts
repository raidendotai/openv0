import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV
    },
    css: {
      postcss: './config'
    },
    plugins: [
      react(),
      eslint({ failOnError: mode !== 'development' }),
      tsconfigPaths()
    ],
    base: `${process.env.BASE_URL ?? '/'}`
  };
});
