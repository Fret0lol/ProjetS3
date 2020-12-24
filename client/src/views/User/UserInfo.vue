<template>
  <div id="app">
    <Header />
    <div id="edit" v-if="userLogin === user.email && disabled == 1">
      <router-link :to="'/membre/' + user.email + '/edit'">
        <i>
          <font-awesome-icon icon="edit" />
        </i>
      </router-link>
    </div>

    <div id="info">
      <div id="img-background"></div>
      <div id="head-info">
        <div id="left-head-info">
          <div class="photoProfil"></div>
          <div class="info-resume">
            <p id="name">{{ user.prenom }} {{ user.nom }}</p>
            <p>{{ user.statut }}</p>
          </div>
        </div>
        <div id="right-head-info">
          <button>Prendre Contact</button>
        </div>
      </div>
      <div id="body-info">
        <div class="formations">
          <div class="title">
              <p>Formations</p>
              <div class="line"></div>
            </div>
        </div>
        <div class="rightInfo">
          <div class="infoDiv">
            <div class="title">
              <p>Informations</p>
              <div class="line"></div>
            </div>
          </div>
          <div class="reseauDiv"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import Header from "../../components/header";

export default {
  props: ["email"],
  components: {
    Header,
  },
  data() {
    return {
      userLogin: "",
      user: {},
      disabled: 1,
    };
  },
  methods: {
    async getInfoUser() {
      try {
        const params = {
          email: this.email,
        };
        const info = await this.$http.get(`/user/email`, { params });
        console.log(info);
        this.user = info.data.user;
      } catch (err) {
        console.log(err);
      }
    },
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if (!token) {
        this.userLogin = null;
      } else {
        let decoded = VueJwtDecode.decode(token);
        this.userLogin = decoded.email;
      }
    },
  },
  created() {
    //this.getUserDetails();
    this.getInfoUser();
  },
};
</script>
<style lang="scss" scoped>
@import '@/Variable.scss';

#app {
  #info {
    margin-top: 5vh;
    #img-background {
      position: absolute;
      z-index: -1;
      background-image: url("../../assets/imgBack.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      height: 25vh;
      width: 100%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    #head-info {
      padding: 7vh 7vw;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      #left-head-info {
        display: flex;
        flex-flow: row wrap;
        .photoProfil {
          // Image Profil
          background-color: #26f191;
          height: 250px;
          width: 250px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        }
        .info-resume {
          padding: 3vh 3vw;
          color: $color;
          font-size: 3vh;
          #name {
            font-weight: 700;
          }
        }
      }
      #right-head-info {
        display: flex;
        align-items: center;
        button {
          background-color: $color;
          border: none;
          padding: 10px 22px;
          border-radius: 5px;
          color: white;
          font-weight: 700;
        }
      }
    }
    #body-info {
      display: flex;
      flex-flow: row;

      .formations {
        width: 50%;
      }
      .rightInfo {
        width: 50%;
      }
    }
  }
  #edit {
    height: 5vh;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    margin: 1vh 5vw 0;
    a i {
      font-size: 3vh;
      color: $color;
    }
  }
}
</style>