<template>
  <div>
    <Header />
    <div class="title">
      <h2>Bem-vindo(a)!</h2>
      <p v-if="listDatas">Está é sua lista de Dragões cadastrados</p>
      <p v-else>Carregando...</p>
    </div>
    <main class="container content" v-if="listDatas">
      <transition-group tag="div" class="dragons-list">
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
      <CreateDragon />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateDragon from "@/components/CreateDragon";

export default {
  name: "List",
  components: {
    Header,
    Footer,
    CreateDragon,
  },
  data() {
    return {
      listDatas: null,
    };
  },
  methods: {
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
        })
        .catch((error) =>
          alert(
            `Houve um problema. Tente novamente mais tarde! \nCódigo do erro: ${error}`
          )
        );
    },
    editItem(id, name, type) {
      let promptName = prompt(`Infome o novo nome, ou deixe como está`, name);
      let promptType = prompt(`Infome o novo tipo, ou deixe como está`, type);
      const formData = {};

      formData.name = promptName;
      formData.type = promptType;

      const encodeFormData = (data) => {
        return Object.keys(data)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
          )
          .join("&");
      };

      if (promptName !== name || promptType !== type) {
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
            if (formData.name !== null || formData.type !== null) {
              this.getDatas();
              alert(`Dragão atualizado com sucesso 🐲!`);
            }
          })
          .catch((error) =>
            alert(
              `Houve um problema. \nTente novamente mais tarde! \nCódigo do erro: ${error}`
            )
          );
      }
    },
    removeItem(id, name) {
      let confirmRemove = confirm(
        `Tem certeza que deseja remover o dragão "${name}"?`
      );

      if (confirmRemove) {
        fetch(
          `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`,
          { method: "DELETE" }
        )
          .then(() => {
            this.getDatas();
            alert(`${name} excluido com sucesso`);
          })
          .catch((error) =>
            alert(
              `Houve um problema. \nTente novamente mais tarde! \nCódigo do erro: ${error}`
            )
          );
      }
    },
  },
  created() {
    document.title = "List";
  },
  mounted() {
    this.getDatas();
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 15rem;
}

.title {
  text-align: center;
  h2 {
    font-family: "DragonForcE", Impact, Haettenschweiler, "Arial Narrow Bold",
      sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: 3.75rem;
    text-align: center;
    color: $three;
  }
  p {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
    margin-top: 10px;
    color: $two;
  }
}

.dragons-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 140px));
  gap: 90px 20px;
  justify-content: center;
  text-align: center;
  margin-top: 60px;

  @include tamanho-tela(tablet) {
    gap: 90px 30px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 150px));
  }

  @include tamanho-tela(desktop) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 160px));
  }

  .dragon {
    background-color: rgba($four, 0.8);
    height: 140px;
    border-radius: 100%;
    border: 4px solid $three;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: transform 0.2s ease-out;

    @include tamanho-tela(tablet) {
      height: 150px;
    }

    @include tamanho-tela(desktop) {
      height: 160px;
    }

    &:hover {
      transform: scale(1.1);

      &::after {
        position: absolute;
        content: "mais detalhes";
        background-color: rgba($three, 0.9);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        font-weight: 700;
      }
    }

    svg {
      width: 60px;
      height: 60px;
    }

    h3 {
      font-weight: 700;
    }

    p {
      font-size: 0.85rem;
    }
  }

  .icon-options {
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin: 15px 5px 0px 5px;

    &:hover {
      path {
        fill: $error;
      }
    }
  }
}
</style>
