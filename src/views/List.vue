<template>
  <div class="wrapper" id="list">
    <Header />

    <main>
      <transition-group class="title" name="fade" tag="div" appear>
        <h2 key="title">Bem-vindo(a)!</h2>
        <p key="subtitle">
          <span v-if="listDatas.length">
            Esta é sua lista de Dragões cadastrados
          </span>
          <span v-else>
            Não há dragões Cadastrados no momento
          </span>
        </p>
      </transition-group>

      <section class="container" v-if="listDatas">
        <transition-group class="dragons-list" name="fade" tag="div" appear>
          <div v-for="data in listDatas" :key="data.id">
            <router-link
              tag="div"
              :to="{ name: 'Details', params: { id: data.id } }"
              class="dragon"
            >
              <font-awesome-icon :icon="['fas', 'dragon']" />
              <h3>{{ data.name }}</h3>
              <p>{{ data.type }}</p>
            </router-link>

            <font-awesome-icon
              @click="editItem(data.id, data.name, data.type)"
              :icon="['fas', 'pencil-ruler']"
              class="icon-options"
              :title="`Editar '${data.name}'`"
            />
            <font-awesome-icon
              @click="removeItem(data.id, data.name)"
              :icon="['fas', 'trash']"
              class="icon-options"
              :title="`Excluir '${data.name}'`"
            />
          </div>
        </transition-group>
      </section>
    </main>

    <CreateDragon />
    <Loading />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import CreateDragon from "@/components/CreateDragon";

import { mapMutations } from "vuex";
import { encodeFormData } from "../helpers";

export default {
  name: "List",
  components: {
    Header,
    Footer,
    Loading,
    CreateDragon,
  },
  data() {
    return {
      listDatas: [],
    };
  },
  methods: {
    ...mapMutations(["LOADING"]),
    getDatas() {
      fetch("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          // sorting in alphabetical order Unicode
          response.sort(function(keyOne, keyTwo) {
            if (keyOne.name < keyTwo.name) {
              return -1;
            } else {
              return true;
            }
          });

          this.listDatas = response;
          this.LOADING(false);
        })
        .catch((error) => {
          alert(
            `❌ Houve um problema. Tente novamente mais tarde! \nCódigo do erro: ${error}`
          );
        });
    },
    editItem(id, name, type) {
      let promptName = prompt(`Infome o novo nome:`, name);
      let promptType = prompt(`Infome o novo tipo:`, type);
      const formData = {};

      formData.name = promptName;
      formData.type = promptType;

      if (promptName !== name || promptType !== type) {
        if (!!promptName && !!promptType) {
          this.LOADING(true);
          fetch(
            `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`,
            {
              method: "PUT",
              body: encodeFormData(formData),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
            .then(() => {
              alert(`Dragão atualizado com sucesso 🐲!`);
              this.LOADING(false);
              this.getDatas();
            })
            .catch((error) => {
              alert(
                `❌ Houve um problema. \nTente novamente mais tarde! \nCódigo do erro: ${error}`
              );
              this.LOADING(false);
            });
        } else if (promptName === "" || promptType === "") {
          alert(`❌ Cuidado, os dados não podem estar em branco!`);
        }
      }
    },
    removeItem(id, name) {
      let confirmRemove = confirm(
        `Tem certeza que deseja remover o dragão "${name}"❓`
      );

      if (confirmRemove) {
        this.LOADING(true);

        fetch(
          `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`,
          { method: "DELETE" }
        )
          .then(() => {
            this.getDatas();

            this.LOADING(false);
          })
          .catch((error) => {
            alert(
              `❌ Houve um problema. \nTente novamente mais tarde! \nCódigo do erro: ${error}`
            );
            this.LOADING(false);
          });
      }
    },
  },
  created() {
    document.title = "List";
    this.LOADING(true);
  },
  mounted() {
    this.getDatas();
  },
};
</script>
