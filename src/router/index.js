import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import List from "../views/List.vue";
import Details from "../views/Details.vue";
import Registration from "../views/Registration.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Login" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "List",
    component: List,
    meta: {
      login: true,
    },
  },
  {
    path: "/details",
    name: "Details",
    component: Details,
    meta: {
      login: true,
    },
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: {
      login: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.login)) {
    if (!window.sessionStorage.hasLogin) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
