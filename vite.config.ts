import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolvePath('./src/index.ts'),
      name: 'vue-toast',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        sourcemap: true,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@/': resolvePath('./src') + '/',
    },
  },
  plugins: [
    vue(),
    dts({
      outputDir: 'types',
      include: ['./src/**/*'],
    }),
  ],
  server: {
    port: 3333,
    open: '/docs/index.html',
  },
});
