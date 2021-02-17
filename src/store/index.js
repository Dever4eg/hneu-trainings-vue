import Vue from "vue";
import Vuex from "vuex";
import { getToken, getUser } from "../helpers/auth";

Vue.use(Vuex);

const token = getToken();
const user = getUser();

export default new Vuex.Store({
  state: {
    authToken: token,
    currentUser: user
  },
  getters: {
    authToken: state => state.authToken,
    currentUser: state => state.currentUser
  },
  mutations: {
    login(state, user) {
      state.currentUser = user;
      state.authToken = user.authentication_token;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
      localStorage.setItem("token", state.authToken);
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.authToken = null;
      state.currentUser = null;
    }
  },
  actions: {},
  modules: {}
});
