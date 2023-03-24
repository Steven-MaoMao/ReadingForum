import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import md5 from 'js-md5'
import axios from 'axios'
import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(router)

app.use(ElementPlus)

app.config.globalProperties.$md5 = md5

app.config.globalProperties.$http = axios
axios.defaults.baseURL = 'http://localhost:8080'


app.config.globalProperties.$cookies = VueCookies

app.mount('#app')
