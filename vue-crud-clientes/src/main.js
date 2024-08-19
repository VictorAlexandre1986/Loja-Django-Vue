
import './style.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from '../src/router/index.js'; // Importe o router

const app = createApp(App);

app.use(router); // Use o router na aplicação

app.mount('#app');