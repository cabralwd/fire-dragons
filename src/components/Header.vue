<template>
  <header class="container" id="header">
    <router-link to="/home" class="brand">
      <h1>Fire Dragons</h1>
    </router-link>
    <a @click="logout()" class="logout">
      <font-awesome-icon :icon="['fa', 'sign-out-alt']" /> sair
    </a>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    async logout() {
      let exitQuestion = confirm("Tem certeza que deseja sair❓");

      if (exitQuestion) {
        sessionStorage.clear();
        await this.$router.push("/login");
      }
    },
  },
};
</script>
