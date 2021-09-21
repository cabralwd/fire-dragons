<template>
  <a id="back" @click="$router.go(-1)">
    <font-awesome-icon :icon="['fa', 'reply-all']" />
    voltar
  </a>
</template>

<script>
export default {
  name: "Back",
};
</script>
