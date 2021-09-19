<template>
  <section class="container">
    <div>
      <img src="../assets/images/image-dragon.png" alt="Logo" class="logo" />
      <h1>Fire Dragons</h1>
      <form id="form">
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
            type="password"
            name="password"
            id="password"
            placeholder="●●●●●"
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
      <span v-if="showError" class="error">Usuário ou senha Inválidos</span>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
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
  },
  created() {
    document.title = "Login";
  },
  mounted() {
    this.isLogged();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  div {
    width: 100%;
  }
}

.logo {
  display: block;
  margin: 0 auto;
  width: calc(256px / 1.3);
  padding: 20px 0;

  @include tamanho-tela(tablet) {
    width: calc(256px / 1.1);
  }

  @include tamanho-tela(desktop-up) {
    width: 256px;
  }
}

h1 {
  font-family: "DragonForcE", Impact, Haettenschweiler, "Arial Narrow Bold",
    sans-serif;
  font-weight: normal;
  font-style: normal;
  font-size: 3.75rem;
  text-align: center;
  color: $three;
}

.error {
  color: $error;
  display: block;
  text-align: center;
  padding: 20px 0;
}

#form {
  max-width: 350px;
  margin: 30px auto 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .content {
    position: relative;
  }
}
</style>
