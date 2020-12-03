<template>
  <div id="info">
    <Header />
    <div id="head">
      <div class="img"></div>
      <div class="infoGeneral">
        <h3>{{ user.nom }} {{ user.prenom }}</h3>
        <h4>{{ user.statut }}</h4>
      </div>
    </div>
    <div class="body">
      <label for="email">Email :</label>
      <input
        type="text"
        v-model="user.email"
        placeholder=""
        name="email"
        class="edit"
      />
      <label for="linkedin">Linkedin :</label>
      <input type="text" v-model="user.linkedin" placeholder="" class="edit" />
      <p>Date d'inscription: {{ user.dateInscription }}</p>
    </div>
    <button @click="save">Sauvegarder</button>
  </div>
</template>
<script>
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
    };
  },
  methods: {
    async getInfoUser() {
      const info = await this.$http.get(`/user/${this.email}`);
      this.user = info.data.user;
    },
    async save() {
      try {
        const response = await this.$http.put(`/user/${this.email}`, this.user);
        console.log(response);
        this.$router.replace(`/membre/${this.email}`);
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getInfoUser();
  },
};
</script>
<style lang="scss" scoped>
$color: #26f191;
#info {
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
  align-content: center;
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