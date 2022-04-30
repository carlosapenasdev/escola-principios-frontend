import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from '@kyvg/vue3-notification'
import 'animate.css'
let app = createApp(App)
app.config.globalProperties.globalVar = 'globalVar'
    app.use(store)
    .use(router)
    .use(Notifications)
    .mount('#app')