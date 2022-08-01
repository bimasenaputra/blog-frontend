import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import './assets/app.css'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://fontstream-api.herokuapp.com'
axios.defaults.withCredentials = true

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
