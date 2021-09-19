<template>
  <footer>
    <a href="http://www.cwd.dev.br" target="_blank" rel="noopener noreferrer">
      <img src="../assets/images/image-dragon.png" alt="" />
    </a>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
footer {
  padding: 30px 0;
  display: flex;
  justify-content: center;

  img {
    width: 80px;

    @include tamanho-tela(tablet) {
      width: 180px;
    }
  }
}
</style>
