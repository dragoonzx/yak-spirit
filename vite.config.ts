/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import cjs from 'rollup-plugin-cjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      http: 'http-browserify',
      https: 'https-browserify',
    },
  },
  test: {
    global: true,
  },
  build: {
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      // @ts-expect-error
      plugins: [cjs()],
    },
    minify: false,
  },
  commonjsOptions: {
    exclude: [/./],
  },
});
