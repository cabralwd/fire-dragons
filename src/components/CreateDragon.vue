<template>
  <router-link to="/registration" class="plus-register">
    <font-awesome-icon
      :icon="['fa', 'plus']"
      class=""
      title="clique aqui para criar um Dragão"
    />
  </router-link>
</template>

<script>
export default {
  name: "CreateDragon",
};
</script>

<style lang="scss" scoped>
.plus-register {
  background-color: $two;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 15px 15px 15px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: fixed;
  right: 0;
  bottom: 0;

  @include tamanho-tela(desktop) {
    right: 10px;
    bottom: 10px;
  }

  svg {
    width: 35px;
    height: 35px;
  }
}
</style>
