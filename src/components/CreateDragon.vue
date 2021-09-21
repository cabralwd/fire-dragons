<template>
  <router-link to="/registration" id="plus-register">
    <font-awesome-icon
      :icon="['fa', 'plus']"
      title="clique aqui para criar um novo Dragão"
    />
  </router-link>
</template>

<script>
export default {
  name: "CreateDragon",
};
</script>
