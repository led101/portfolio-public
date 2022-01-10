import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase/app";
import {myKey} from "./config.js";
// import {getAnalytics} from "firebase/analytics";


const firebaseConfig = myKey;
firebase.initializeApp(firebaseConfig);
// const anal = getAnalytics(firebaseApp);

createApp(App).use(store).use(router).mount('#app')
