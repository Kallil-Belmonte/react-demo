import { defineConfig } from 'vite';

import deno from '@deno/vite-plugin';
import biome from 'vite-plugin-biome';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [deno(), biome(), react()],
});
