import Vue from "vue";
import VueRouter from "vue-router";
import Suppliers from "../views/Suppliers.vue";
import Products from "../views/Products.vue";
import Invoices from "../views/Invoices.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/suppliers"
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    component: Suppliers
  },
  {
    path: "/products",
    name: "Products",
    component: Products
  },
  {
    path: "/invoices",
    name: "Invoices",
    component: Invoices
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
