import router from "../router";
import store from "../store";

export default () => {
  router.beforeEach((to, from, next) => {
    const auth = to.matched.some(record => record.meta.isAuthRequired);
    const token = store.getters.authToken;
    if (auth && !token) {
      next("/login");
    } else if (!auth && token) {
      next("/");
    } else {
      next();
    }
  });

  // eslint-disable-next-line no-undef
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        store.commit("logout");
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );
};
