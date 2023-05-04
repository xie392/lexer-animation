import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Buffer } from 'buffer'

if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

import App from './App.vue'
import router from './router'

import '@/assets/styles/global.css'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
