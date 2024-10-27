import { defineConfig } from 'vite';
import biome from 'vite-plugin-biome';
import deno from '@deno/vite-plugin';
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
  plugins: [biome(), deno(), react()],
});
