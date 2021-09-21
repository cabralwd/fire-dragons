<template>
  <div v-if="isLoading" class="loading">
    <p>Carregando...</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Loading",
  computed: {
    ...mapState(["isLoading"]),
  },
};
</script>
