import { createApp } from 'vue'
import "nes.css/css/nes.min.css";
import App from './App.vue';
import installRouter from './plugins/router'
import './assets/font/font.css';
import './style/index.scss'

const app = createApp(App)
installRouter(app)
app.mount('#app')