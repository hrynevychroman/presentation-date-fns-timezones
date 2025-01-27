import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import vSelect from 'vue-select'

const app = createApp(App)
app.component('v-select', vSelect)
app.use(router)
app.mount('#app')