<template>
  <footer id="footer">
    <a
      href="https://github.com/cabralwd"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="../assets/images/image-dragon.png" alt="" aria-hidden="true" />
    </a>
    <p>
      Teste Técnico -
      <a href="https://www.cwi.com.br" target="blank">CWi</a> -
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
