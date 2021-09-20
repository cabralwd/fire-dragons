<template>
  <div class="wrapper">
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
                <div class="input">
                  <label for="name">Nome</label>
                  <input
                    v-model="name"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Flygon"
                  />
                </div>
                <div class="input">
                  <label for="type">Tipo</label>
                  <input
                    v-model="type"
                    type="text"
                    name="type"
                    id="type"
                    placeholder="Forte e Astuto"
                  />
                </div>
                <button @click.prevent="registerNew" class="button">
                  Finalizar cadastro
                </button>
              </form>
            </main>
          </div>
        </transition>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Back from "@/components/Back";

export default {
  name: "Registration",
  components: {
    Header,
    Footer,
    Back,
  },
  data() {
    return {
      name: null,
      type: null,
    };
  },
  methods: {
    registerNew() {
      const formData = {};

      formData.name = this.name;
      formData.type = this.type;

      const encodeFormData = (data) => {
        return Object.keys(data)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
          )
          .join("&");
      };

      fetch(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/`, {
        method: "POST",
        body: encodeFormData(formData),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then(() => {
          alert(`Dragão cadastrado com sucesso 🐲!`);
          if (formData.name !== null || formData.type !== null) {
            this.name = null;
            this.type = null;
          }
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
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding-top: 40px;
  font-family: "DragonForcE", Impact, Haettenschweiler, "Arial Narrow Bold",
    sans-serif;
  font-weight: normal;
  font-style: normal;
  font-size: 3rem;
  text-align: center;
  color: $three;

  @include tamanho-tela(tablet) {
    font-size: 3.75rem;
    padding-top: 0;
  }
}

.content {
  margin-top: 60px;
  margin-bottom: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .dragon {
    width: 178px;
    height: 142px;
    margin: 0 auto;
    display: block;

    path {
      fill: rgba($two, 0.7);
    }
  }

  #form {
    max-width: 330px;
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    .input {
      position: relative;
    }
  }
}
</style>
