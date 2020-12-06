<template>
  <div id="app">
    <Header />
    <div id="homeFirstView">
      <div id="rightPart">
        <h1>Les Anciens d'Abord</h1>
      </div>
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
import Annuaire from "../components/CardUser";
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
$color: #26F191;
$colorBlur: #26F19140;
  #app {
    #homeFirstView {
      height: 80vh;
      background-image: url("../assets/Rectangle_101.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: flex-end;
      color: white;
      #rightPart {
        background: $colorBlur;
        backdrop-filter: blur(10px);
        width: 50vw;
        height: 100%;
        
      }
    }
    #annuaire {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
