<template>
  <div class="wrapper">
    <Header />
    <div>
      <div class="container">
        <Back />
        <transition-group tag="div" name="fade">
          <div v-if="dragon" key="infos">
            <h2 class="name">{{ dragon.name }}</h2>
            <main class="content">
              <font-awesome-icon :icon="['fas', 'dragon']" class="dragon" />
              <ul class="details">
                <li>
                  <p>Data de criação:</p>
                  <h4>{{ dragon.createdAt | formatDate }}</h4>
                </li>
                <li>
                  <p>Tipo do dragão:</p>
                  <h4>{{ dragon.type }}</h4>
                </li>
              </ul>
            </main>
          </div>
          <p v-else key="loading" class="loading">
            Carregando...
          </p>
        </transition-group>
      </div>
      <CreateDragon key="registration" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Back from "@/components/Back";
import CreateDragon from "@/components/CreateDragon";

import moment from "moment";

export default {
  name: "Details",
  components: {
    Header,
    Footer,
    Back,
    CreateDragon,
  },
  data() {
    return {
      dragon: null,
    };
  },
  filters: {
    formatDate(data) {
      let date = moment(
        new Date(data),
        ["MM DD YYYY HH:mm:ss Z+HHmm"],
        "pt-br",
        true
      );

      return `${date.format("DD/MM/YYYY")} - ${moment(date).fromNow()}`;
    },
  },
  methods: {
    getItem(id) {
      fetch(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.dragon = response;
        })
        .catch((error) =>
          alert(
            `Houve um problema. Tente novamente mais tarde! \nCódigo do erro: ${error}`
          )
        );
    },
  },
  created() {
    document.title = "Details";
    this.getItem(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.loading {
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 10px;
  color: $two;
}

.name {
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
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @include tamanho-tela(tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  .dragon {
    width: 178px;
    height: 142px;
    margin: 0 auto;

    @include tamanho-tela(tablet) {
      margin: 0;
      width: 445px;
      height: 356px;
    }

    path {
      fill: rgba($two, 0.7);
    }
  }

  .details {
    text-align: center;

    @include tamanho-tela(tablet) {
      text-align: initial;
    }

    li {
      &:first-child {
        margin-bottom: 40px;
      }

      p {
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: 5px;
      }

      h4 {
        font-family: "DragonForcE", Impact, Haettenschweiler,
          "Arial Narrow Bold", sans-serif;
        font-weight: normal;
        font-style: normal;
        font-size: 2.5rem;
        color: $three;
        line-height: 1.2;
        text-transform: capitalize;
      }
    }
  }
}
</style>
