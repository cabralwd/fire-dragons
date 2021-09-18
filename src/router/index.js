import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import List from "../views/List.vue";
import Details from "../views/Details.vue";
import Registration from "../views/Registration.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/details",
    name: "Details",
    component: Details,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
