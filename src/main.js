import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import agconnect from "@hw-agconnect/api";
import "@hw-agconnect/function";
import "@hw-agconnect/instance";
import {agConnectConfig} from "./resources/config.js";
//初始化agc
agconnect.instance().configInstance(agConnectConfig);

createApp(App)
  .use(router)
  .mount('#app');
