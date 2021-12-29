/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), commonjs()],
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
  },
  // @ts-expect-error
  commonjsOptions: {
    exclude: [/./],
  },
});
