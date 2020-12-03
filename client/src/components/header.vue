<template>
  <nav>
    <div id="logo">
      <router-link to="/" id="logoLink"
        ><img src="../assets/Logo.png" alt=""
      /></router-link>
      <p>Les Anciens D'abord</p>
    </div>
    <!-- <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> -->
    <div id="navbarNav">
      <ul>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li>Forums</li>
          <li><router-link to="/annuaire-membres">Annuaire</router-link></li>
          <li><router-link to="/admin/users">Offres</router-link></li>
        </ul>
        <li class="bouton" v-if="this.login === true">
          <button @click="logUserOut"> Logout</button>
        </li>
        <li v-if="this.login === true">
          <router-link :to="'/membre/' + user.email">Mon compte</router-link>
        </li>
        <li class="bouton" v-if="login === false">
          <router-link to="/login" tag="button">Se connecter</router-link>
        </li>
        <li class="bouton" v-if="login === false">
          <router-link to="/register" tag="button">S'enregistrer</router-link>
        </li>
        
      </ul>
    </div>
  </nav>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      user: {},
      login: "",
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if (!token) {
        this.login = false;
      } else {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
        this.login = true;
      }
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    },
  },

  created() {
    this.getUserDetails();
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap");
$color: #26f191;
nav {
  font-family: Poppins;
  height: 7vh;
  display: grid;
  grid-template-columns: 25% 75%;
  //padding: 1vh 0;
  #logo {
    display: flex-start ;
    flex-direction: row;
    //justify-content: start;
    align-content: center;
    font-family: Poppins;
    font-weight: 700;
    align-self: center;
    p {
      display: none;
      text-align: center;
      align-self: center;
      margin: 0 0 0 3vw;
      @media screen and (min-width: 960px){
        display: block;
      }
    }
    #logoLink {
      img {
        margin: 0 50%;
      }
    }
  }
  #navbarNav {
    ul {
      height: 100%;
      width: 100%;
      padding-right: 2vw;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      //align-content: center;
      list-style: none;
      li {
        margin: 6px;
        align-self: center;

        button {
          background-color: $color;
          color: white;
          padding: 8px;
          border: none;
          border-radius: 5px;
          white-space: nowrap;
        }
      }
      ul {
        li {
          margin: 0 2vw;
          text-align: center;
          align-self: center;
        }
      }
    }
  }
}
</style>