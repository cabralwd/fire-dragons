<template>
  <div class="wrapper" id="details">
    <Header />

    <div>
      <div class="container">
        <Back />
        <transition tag="div" name="fade" appear>
          <div>
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
        </transition>
      </div>
      <CreateDragon key="registration" />
    </div>

    <Loading />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Back from "@/components/Back";
import Loading from "@/components/Loading";
import CreateDragon from "@/components/CreateDragon";

import { mapMutations } from "vuex";

export default {
  name: "Details",
  components: {
    Header,
    Footer,
    Loading,
    Back,
    CreateDragon,
  },
  data() {
    return {
      dragon: {
        createdAt: "",
        name: "",
        type: "",
      },
    };
  },
  methods: {
    ...mapMutations(["LOADING"]),
    getItem(id) {
      fetch(`https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.dragon = response;
          this.LOADING(false);
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
    this.LOADING(true);
  },
};
</script>
