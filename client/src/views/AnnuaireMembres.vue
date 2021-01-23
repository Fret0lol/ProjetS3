<template>
  <div id="app">
    <Header />
    <div id="recherche">
      <h1>RECHERCHE</h1>
      <div id="tri">
        <div class="input">
          <input
            type="radio"
            id="alpha"
            name="tri"
            value="alphabetique"
            @change="alphabetique"
          />
          <label for="alpha">Tri alphabétique</label>
        </div>
        <div class="input">
          <input
            type="radio"
            id="anti_alpha"
            name="tri"
            value="anti_alphabetique"
            @change="antiAlphabetique"
          />
          <label for="anti_alpha">Tri anti-alphabétique</label>
        </div>
      </div>
    </div>
    <div id="cards">
      <CardAnnuaire
        :nomUtilisateur="user.nomUtilisateur"
        :key="user.nomUtilisateur"
        :nom="user.nom"
        :prenom="user.prenom"
        :statut="user.statut"
        v-for="user in users"
        class="card"
      />
    </div>
    <div id="button">
      <button @click="getLessUsers" v-if="boutonPrecedent">Précédente</button>
      <button @click="getMoreUsers" v-if="boutonSuivant">Suivante</button>
    </div>
  </div>
</template>
<script>
import Header from "../components/header";
import CardAnnuaire from "../components/CardUser";
export default {
  components: {
    Header,
    CardAnnuaire,
  },
  data() {
    return {
      users: {},
      userCount: 0,
      offset: 0,
      boutonSuivant: true,
      boutonPrecedent: false,
    };
  },
  methods: {
    async getAllUsers() {
      const params = {
        offset: this.offset,
        limit: 10,
        sort: "",
      };
      const info = await this.$http.get(`/user/users/params`, { params });
      this.users = info.data.rep;
      this.userCount = info.data.count;
    },
    async getMoreUsers() {
      this.offset++;
      this.getAllUsers();
      if (this.userCount - (this.offset + 1) * 10 < 1) {
        this.boutonSuivant = false;
      }
      this.boutonPrecedent = true;
    },
    async getLessUsers() {
      this.offset--;
      this.getAllUsers();
      if (this.offset === 0) {
        this.boutonPrecedent = false;
      }
      this.boutonSuivant = true;
    },
    async alphabetique() {
      const params = {
        offset: this.offset,
        limit: 10,
        sortType: "nom",
        sortValue: 1,
      };
      const info = await this.$http.get(`/user/users/params`, { params });
      this.users = info.data.rep;
      this.userCount = info.data.count;
    },
    async antiAlphabetique() {
      const params = {
        offset: this.offset,
        limit: 10,
        sortType: "nom",
        sortValue: -1,
      };
      const info = await this.$http.get(`/user/users/params`, { params });
      this.users = info.data.rep;
      this.userCount = info.data.count;
    },
  },
  created() {
    this.getAllUsers();
  },
};
</script>
<style lang="scss" scoped>
$color: #26f191;
#app {
  padding-bottom: 2em;
  user-select: none;
  #recherche {
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    h1 {
      text-align: center;
    }
    #tri {
      display: flex;
      justify-content: center;
      .input {
        margin: 0 2em;
      }
    }
  }
  #cards {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    .card {
      margin: 1vh 0;
    }
  }
  #button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2em 0;
    button {
      background-color: $color;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 0.75em 1em;
      font-weight: 700;
    }
  }
}
</style>