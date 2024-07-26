import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr'

import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react(), svgr()],
    test: {
      globals: true,
      environment: 'jsdom',
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, '.') }],
    },
  };
});
