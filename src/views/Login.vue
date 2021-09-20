<template>
  <section class="container">
    <transition-group name="fade" tag="div" appear>
      <img
        src="../assets/images/image-dragon.png"
        alt="Logo"
        class="logo"
        key="image"
      />
      <h1 key="title">Fire Dragons</h1>
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
            size="40px"
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
  </section>
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

  .show {
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
    right: 15px;
    cursor: pointer;
    width: 32px;
    height: 32px;

    @include tamanho-tela(tablet) {
      width: 24px;
      height: 24px;
    }

    path {
      fill: $three;
    }
  }
}
</style>
