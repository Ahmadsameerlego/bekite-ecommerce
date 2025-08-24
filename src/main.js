import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/tailwind.css'


import api from './api/http' // ← استدعاء ملف الـ axios

import VueGoogleMaps from '@fawmi/vue-google-maps'
const app = createApp(App)




// نخلي الـ api متاح كـ global property
app.config.globalProperties.$api = api

createApp(App).use(router).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCb_o1dSihLAviBJNgBWE5KLGbcxXlDnNU',
        libraries: 'places', // مهم عشان auto complete
    },
}).use(i18n).mount('#app')