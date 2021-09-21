<template>
  <div class="wrapper" id="registration">
    <Header />
    <div>
      <section class="container">
        <Back />
        <transition tag="div" name="fade" appear="">
          <div>
            <h2 class="title">Crie o seu novo Dragão</h2>
            <main class="content">
              <font-awesome-icon :icon="['fas', 'dragon']" class="dragon" />
              <form id="form" key="form">
                <div class="input content">
                  <label for="name">Nome</label>
                  <input
                    v-model="nameFormat"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Flygon"
                  />
                </div>
                <div class="input content">
                  <label for="type">Tipo</label>
                  <input
                    v-model="type"
                    type="text"
                    name="type"
                    id="type"
                    placeholder="Forte e Astuto"
                  />
                </div>
                <button
                  @click.prevent="registerNew"
                  class="button"
                  :disabled="!releaseButton"
                >
                  Finalizar cadastro
                </button>
              </form>
            </main>
          </div>
        </transition>
      </section>
    </div>

    <Loading />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Back from "@/components/Back";

import { mapMutations } from "vuex";
import { encodeFormData } from "../helpers";

export default {
  name: "Registration",
  components: {
    Header,
    Footer,
    Loading,
    Back,
  },
  data() {
    return {
      name: "",
      type: null,
    };
  },
  computed: {
    nameFormat: {
      get() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
      },
      set(newName) {
        this.name = newName;
      },
    },
    releaseButton() {
      if (!!this.name && !!this.type) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapMutations(["LOADING"]),
    registerNew() {
      const formData = {};

      formData.name = this.name;
      formData.type = this.type;

      this.LOADING(true);

      fetch(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/`, {
        method: "POST",
        body: encodeFormData(formData),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then(() => {
          alert(`Dragão cadastrado com sucesso 🐲!`);
          let responseToHome = confirm(`gostaria de voltar para a home❓`);

          if (responseToHome) {
            this.$router.push("/home");
          } else {
            if (formData.name !== null || formData.type !== null) {
              this.name = "";
              this.type = null;
            }
          }

          this.LOADING(false);
        })
        .catch((error) =>
          alert(
            `Houve um problema. \nTente novamente mais tarde! \nCódigo do erro: ${error}`
          )
        );
    },
  },
  created() {
    document.title = "Registration";
    this.LOADING(false);
  },
};
</script>
