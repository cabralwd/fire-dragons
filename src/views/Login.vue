<template>
  <transition-group name="fade" tag="section" class="container-login" appear>
    <img
      src="../assets/images/image-dragon.png"
      alt="Logo"
      class="logo"
      key="image"
    />
    <div key="title">
      <h1 class="title">Fire Dragons</h1>
      <small class="legend">Informe seu Login e Senha</small>
    </div>
    <form id="form" key="form">
      <div class="content">
        <label for="user">Login</label>
        <input
          v-model="user"
          type="user"
          name="user"
          id="user"
          placeholder="@user"
        />
      </div>
      <div class="content">
        <label for="password">Senha</label>
        <input
          v-model="password"
          :type="showPassword"
          name="password"
          id="password"
          placeholder="●●●●●"
        />
        <font-awesome-icon
          v-if="this.$store.state.password"
          @click="showPasswordInput"
          :icon="['fa', `${typeIconPassword}`]"
          class="show"
        />
      </div>
      <button
        @click.prevent="validateLogin"
        class="button"
        :disabled="releaseButton"
      >
        Acessar
      </button>
    </form>
    <span v-if="showError" class="error" key="error"
      >Usuário ou senha Inválidos</span
    >
  </transition-group>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      showPassword: "password",
      typeIconPassword: "eye",
    };
  },
  computed: {
    ...mapState(["showError"]),
    user: {
      get() {
        return this.$store.state.user;
      },
      set(inputUsuario) {
        this.$store.commit("USER_INSERT", inputUsuario);
      },
    },
    password: {
      get() {
        return this.$store.state.password;
      },
      set(inputSenha) {
        this.$store.commit("PASS_INSERT", inputSenha);
      },
    },
    releaseButton() {
      return this.$store.state.user && this.$store.state.password
        ? false
        : true;
    },
  },
  methods: {
    ...mapActions(["validateLogin"]),
    isLogged() {
      if (window.sessionStorage.hasLogin) {
        this.$router.push({ name: "List" });
      }
    },
    showPasswordInput() {
      let hasContentInput = this.$store.state.password;

      if (hasContentInput) {
        if (this.showPassword === "text") {
          this.showPassword = "password";
          this.typeIconPassword = "eye";
        } else {
          this.showPassword = "text";
          this.typeIconPassword = "eye-slash";
        }
      }
    },
  },
  created() {
    document.title = "Login";
  },
  mounted() {
    this.isLogged();
  },
};
</script>

<style lang="scss" scoped></style>
