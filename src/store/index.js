import Vue from "vue";
import Vuex from "vuex";

import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    password: null,
    hasLogin: false,
    showError: false,
    isLoading: false,
  },
  mutations: {
    USER_INSERT(state, payload) {
      state.user = payload;
      state.showError = false;
    },
    PASS_INSERT(state, payload) {
      state.password = payload;
      state.showError = false;
    },
    LOGADO(state, payload) {
      if (state.user === "@flygon" && state.password === "flygonfire2021") {
        state.hasLogin = payload;
        window.sessionStorage.hasLogin = true;

        state.user = null;
        state.password = null;

        router.push({ name: "List" });
      } else {
        state.showError = true;
      }
    },
    LOADING(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    validateLogin({ commit }) {
      commit("LOGADO");
    },
  },
});
