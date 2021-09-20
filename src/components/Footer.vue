<template>
  <footer>
    <a
      href="https://github.com/cabralwd"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="../assets/images/image-dragon.png" alt="" aria-hidden="true" />
    </a>
    <p>
      Teste Técnico - <a href="https://www.cwi.com.br">CWi</a> -
      {{ dateY }}
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    dateY() {
      let date = new Date();
      return date.getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  clear: both;
  padding: 30px 0;
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 80px;

    @include tamanho-tela(tablet) {
      width: 180px;
    }
  }

  p {
    margin-top: 10px;
  }
}
</style>
