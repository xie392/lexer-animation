import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default () => {
  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()]
      })
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
      // chunkSizeWarningLimit: 1000,
      // rollupOptions: {
      //   output: {
      //     manualChunks(id) {
      //       if (id.includes('node_modules')) {
      //         return id.toString().split('node_modules/')[1].split('/')[0].toString()
      //       }
      //     }
      //   }
      // },
      sourcemap: true
    }
  })
}
