<template>
  <header class="container">
    <h1>Fire Dragons</h1>
    <router-link to="/login">deslogar</router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
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
}
</style>
