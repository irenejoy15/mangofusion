import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'
import router from './router/routes.js'

// 2.1 Import Pinia plugin for persisted state
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 2.4 Import the theme store to initialize the theme on app load
import { useThemeStore } from '@/stores/themeStore.js'

const app = createApp(App)
const pinia = createPinia()

// 2.2 Use the Pinia plugin for persisted state
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// Initialize the theme on app load
const themeStore = useThemeStore()
if (themeStore.theme) {
  document.documentElement.setAttribute('data-bs-theme', themeStore.theme)
}

app.mount('#app')
