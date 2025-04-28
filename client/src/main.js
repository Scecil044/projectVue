import { createApp } from 'vue'
import './style.css'
import { createPinia } from "pinia";
import axios from "axios";
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './routes';

// Base URL for API requests
axios.defaults.baseURL = "http://127.0.0.1:8000/api";

// Get token from localStorage or sessionStorage (if remember me was not checked)
const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token") || null;
};

// Set default authorization header if token exists
const token = getToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Create and configure Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Create and mount app
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');