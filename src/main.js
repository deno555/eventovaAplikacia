import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'
import App from './App.vue'
import router from './plugins/router/router.js'

const app = createApp(App)
.use(IonicVue, {animated: window.innerWidth < 800})

.use(createPinia())
.use(router)

app.mount('#app')