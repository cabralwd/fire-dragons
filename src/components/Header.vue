<template>
  <header class="container">
    <h1>Fire Dragons</h1>
    <a @click="logout()" class="logout"
      ><font-awesome-icon :icon="['fa', 'sign-out-alt']" /> sair</a
    >
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    async logout() {
      let exitQuestion = confirm("Tem certeza que deseja sair?");

      if (exitQuestion) {
        await sessionStorage.clear();
        await this.$router.push("login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;

  h1 {
    font-family: "DragonForcE", Impact, Haettenschweiler, "Arial Narrow Bold",
      sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: 1.875rem;
    text-align: center;
    color: $three;
  }

  .logout {
    text-transform: uppercase;
    cursor: pointer;
  }
}
</style>
