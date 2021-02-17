import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VeeValidate from "vee-validate";
import auth from "./middleware/auth";

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(require("vue-moment"));

window.axios = require("axios");
window.axios.defaults.headers.common = { "X-Requested-With": "XMLHttpRequest" };
window.axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

auth();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
