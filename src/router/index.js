import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Login" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    name: "List",
    component: () => import("../views/List.vue"),
    meta: {
      login: true,
    },
  },
  {
    path: "/details/:id",
    name: "Details",
    component: () => import("../views/Details.vue"),
    meta: {
      login: true,
    },
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/Registration.vue"),
    meta: {
      login: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
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
