<template>
  <div id="app">
    <Header />
    <div id="homeFirstView">
      <h1>Les Anciens d'Abord</h1>
    </div>
    <section id="annuaire">
      <router-link to="/annuaire-membres"><h2>Annuaire</h2></router-link>
      <Annuaire
        :userEmail="users[users.length - 1].email"
      />
    </section>
  </div>
</template>
<script>
import Header from "../components/header";
import Annuaire from "../components/userAnnuaire";
export default {
  data() {
    return {
      users: {}
    };
  },
  components: {
    Header,
    Annuaire,
  },
  methods: {
    async getInfoUser() {
      const info = await this.$http.get(`/user/users`);
      this.users = info.data.users;
      //console.log(this.users[1]);
    },
  },
  created() {
    this.getInfoUser();
    //console.log(this.users[2]);
  },
};
</script>

<style lang="scss" scoped>
  #app {
    #homeFirstView {
      height: 60vh;
      background-image: url("../assets/iutLannion.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    #annuaire {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
