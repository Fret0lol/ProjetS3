<template>
  <nav>
    <div id="logo">
      <router-link to="/" id="logoLink"
        ><img src="../assets/Logo.png" alt="Logo" height="60px" />
        <p>Les Anciens D'abord</p>
      </router-link>
    </div>
    <div class="menuMobile" v-if="!desktop">
      <input class="checkbox-toggle" type="checkbox" />
      <div class="hamburger">
        <div></div>
      </div>
      <div class="menu">
        <div>
          <div>
            <ul>
              <li><router-link to="/">Accueil</router-link></li>
              <li><a href="#">Products</a></li>
              <li><router-link to="/annuaire-membres">Annuaire</router-link></li>
              <li><router-link to="/admin/users">Offres</router-link></li>
              <li class="bouton" v-if="this.login === true">
                <button @click="logUserOut">Logout</button>
              </li>
              <li v-if="this.login === true">
                <router-link :to="'/membre/' + user.email">Mon compte</router-link>
              </li>
              <li class="bouton" v-if="login === false">
                <router-link to="/login">Se connecter</router-link>
              </li>
              <li class="bouton" v-if="login === false">
                <router-link to="/register">S'enregistrer</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="navbarNav" v-if="desktop">
      <ul>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li>Forums</li>
          <li><router-link to="/annuaire-membres">Annuaire</router-link></li>
          <li><router-link to="/admin/users">Offres</router-link></li>
        </ul>
        <li class="bouton" v-if="this.login === true">
          <button @click="logUserOut">Logout</button>
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
      desktop: false
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
  mounted() {
    window.onresize = () => {
      if (document.documentElement.clientWidth > 450) {
      this.desktop = true;
    } else {
      this.desktop = false;
    }
    }
    
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap");
$color: #26f191;
nav {
  font-family: Poppins;
  height: 8.5vh;
  display: grid;
  grid-template-columns: 25% 75%;
  margin: 0;
  padding: 0;
  //padding: 1vh 0;
  #logo {
    a {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      color: black;
      &:hover {
        text-decoration: none;
      }
      p {
        display: none;
        margin: 0;
      }
      img {
        margin-top: 1vh;
        margin-right: 1vw;
      }
      @media screen and (min-width: 750px) {
        p {
          display: block;
        }
      }
    }
    // display: flex-start;
    // flex-direction: row;
    // //justify-content: start;
    // align-content: center;
    // font-family: Poppins;
    // font-weight: 700;
    // align-self: center;
    // p {
    //   display: none;
    //   text-align: center;
    //   align-self: center;
    //   margin: 0 0 0 3vw;
    //   @media screen and (min-width: 960px) {
    //     display: block;
    //   }
    // }
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
  .menuMobile {
    position: fixed;
    top: 0.5vh;
    right: 0;
    z-index: 1;
    .checkbox-toggle {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      cursor: pointer;
      width: 60px;
      height: 60px;
      opacity: 0;
      &:checked {
        & + .hamburger {
          > div {
            transform: rotate(135deg);
            &::before,
            &::after {
              top: 0;
              transform: rotate(90deg);
            }
            &::after {
              opacity: 0;
            }
          }
        }
        & ~ .menu {
          pointer-events: auto;
          visibility: visible;
          > div {
            transform: scale(1);
            transition-duration: 0.75s;
            > div {
              opacity: 1;
              transition: opacity 0.4s ease 0.4s;
            }
          }
        }
      }
      &:checked:hover + .hamburger > div {
        transform: rotate(225deg);
      }
    }
    .hamburger {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: 60px;
      height: 60px;
      padding: 0.5em 1em;
      background: $color;
      border-radius: 0 0.12em 0.12em 0;
      cursor: pointer;
      transition: box-shadow 0.4s ease;
      backface-visibility: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        position: relative;
        flex: none;
        width: 100%;
        height: 2px;
        background: white;
        transition: all 0.4s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        &::before,
        &::after {
          content: '';
          position: absolute;
          z-index: 1;
          top: 10px;
          left: 0;
          width: 100%;
          height: 2px;
          background: inherit;
          transition: all 0.4s ease;
        }
        &:after {
          top: 10px;
        }
        &::before {
          top: -10px;
        }
      }
    }
    .menu {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      visibility: hidden;
      overflow: hidden;
      backface-visibility: hidden;
      outline: 1px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        width: 250vw;
        height: 250vw;
        color: white;
        background: $color;
        border-radius: 50%;
        transition: all 0.4s ease;
        flex: none;
        transform: scale(0);
        backface-visibility: hidden;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        > div > ul {
          list-style: none;
          padding: 0 1em;
          margin: 0;
          display: block;
          max-height: 100vh;
          > li {
            padding: 0;
            margin: 1em;
            font-size: 24px;
            display: block;
            > a {
              position: relative;
              display: inline;
              cursor: pointer;
              transition: color 0.4s ease;
              color: white;
              &::after {
                width: 100%;
              }
            }
            &::after {
              content: '';
              position: absolute;
              z-index: 1;
              bottom: -0.15em;
              left: 0;
              width: 0;
              height: 2px;
              background: #1a8b56;
              transition: width 0.4s ease;
            }
          }
        }
      }
    }
  }
}
</style>