import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Suppliers from "../views/Suppliers.vue";
import Products from "../views/Products.vue";
import Invoices from "../views/Invoices.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      isAuthRequired: false
    }
  },
  {
    path: "/",
    redirect: "/suppliers"
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    component: Suppliers,
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/invoices",
    name: "Invoices",
    component: Invoices,
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
