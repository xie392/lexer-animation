import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/assets/styles/global.css'
import { Buffer } from 'buffer'
import process from 'process'

if (typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer
}

if (typeof window.process === 'undefined') {
  window.process = process
}


const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
