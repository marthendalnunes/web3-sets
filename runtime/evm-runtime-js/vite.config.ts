import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'EVMRuntime',
      formats: ['es', 'umd'],
      fileName: (format) => `evm-runtime.${format}.js`,
    },
    rollupOptions: {
      // external: ['abitype', 'abitype/zod'],
      // output: {
      //   globals: {
      //     abitype: 'abitype',
      //     'abitype/zod': 'abitypeZod',
      //   },
      // },
    },
  },
})
