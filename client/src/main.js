import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAt, faLock, faEdit, faCheck, faTimes, faEye, faEyeSlash, faUser, faPhone, faEnvelope, faGraduationCap, faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faAt, faLock, faEdit, faCheck, faTimes, faEye, faEyeSlash, faUser, faPhone, faEnvelope, faGraduationCap, faCamera)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const base = axios.create({
  baseURL: "http://localhost:4000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");