import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import babel from 'vite-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default () => {
  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()]
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-imports.d.ts'
      }),
      // babel(),
      // commonjs()
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        externalHelpers: true
      }),
      nodeResolve({
        browser: true
      }),
      commonjs()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
        $: fileURLToPath(new URL('./src/canvas', import.meta.url))
      }
    },
    define: {
      'process.env': {}
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      },
      sourcemap: true
    }
  })
}
