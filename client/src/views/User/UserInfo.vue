<template>
  <div id="info">
    <Header />
    <div id="edit" v-if="userLogin === user.email && disabled == 1">
      <router-link :to="'/membre/' + user.email + '/edit'">
        <i>
          <font-awesome-icon icon="edit" />
        </i>
      </router-link>
    </div>
    <div id="head">
      <div class="img"></div>
      <div class="infoGeneral">
        <h3>{{ user.nom }} {{ user.prenom }}</h3>
        <h4>{{ user.statut }}</h4>
      </div>
    </div>
    <div class="body">
      <p>Email : {{ user.email }}</p>
      <p>Linkedin : {{ user.linkedin }}</p>
      <p>Date d'inscription: {{ user.dateInscription }}</p>
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
          email: this.email
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
$color: #26f191;
#info {
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
  #head {
    height: 25vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .img {
      background-color: $color;
      height: 200px;
      width: 200px;
      border-radius: 50%;
      margin: 0 4vw;
    }
    .infoGeneral {
      h3 {
        margin-bottom: 2vh;
      }
    }
  }
}
</style>