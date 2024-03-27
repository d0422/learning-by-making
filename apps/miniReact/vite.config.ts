import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  esbuild: {
    jsxFactory: 'React.createElement',
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@core',
        replacement: path.resolve(__dirname, 'src/core'),
      },
    ],
  },
});
