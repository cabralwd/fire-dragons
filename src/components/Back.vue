<template>
  <a @click="$router.go(-1)"
    ><font-awesome-icon :icon="['fa', 'reply-all']" /> voltar</a
  >
</template>

<script>
export default {
  name: "Back",
};
</script>

<style lang="scss" scoped>
a {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  text-transform: uppercase;
  cursor: pointer;

  @include tamanho-tela(tablet) {
    top: 30px;
    left: 15px;
    transform: translateX(0);
  }
}
</style>
