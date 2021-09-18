<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
// reset CSS
@import "~reset-css/sass/reset";

* {
  box-sizing: border-box;
  transition: color 0.05s, background-color 0.1s;
}

html,
body {
  font-family: "Nunito", sans-serif;
  font-weight: 300;
}

body {
  background: rgba($one, 0.87);
  color: $two;
}

img {
  max-width: 100%;
}

p {
  line-height: 1.2;
}

a {
  color: rgba($four, 0.8);

  &:hover {
    color: $four;
  }
}

input {
  width: 100%;
  background-color: transparent;
  border: 1px solid $four;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 30px;
  color: $two;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
}

::-webkit-input-placeholder,
:-ms-input-placeholder,
::placeholder {
  color: rgba($three, 0.7);
}

label {
  position: absolute;
  top: -15px;
  left: 5px;
  background-color: $three;
  padding: 3px 6px;
  cursor: pointer;
  border-radius: 5px;
}

.button {
  background-color: $four;
  color: $two;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  padding: 10px 0;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    background-color: $three;
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.container {
  max-width: 1140px;
  position: relative;
  padding: 0 30px;
  margin-right: auto;
  margin-left: auto;

  @include tamanho-tela(desktop) {
    padding: 0 15px;
  }
}
</style>
