<template>
  <div id="card">
    <div id="card_row">
      <div id="imgProfil">
        <img src="../assets/Logo.png" alt="" />
      </div>
      <div id="infoProfil">
        <h4>{{ user.nom }} {{ user.prenom }}</h4>
        <h5>{{ user.statut }}</h5>
      </div>
    </div>
    <button @click="redirect">Plus d'info</button>
  </div>
</template>
<script>
export default {
  props: ["email"],
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async getInfoUser() {
      const info = await this.$http.get(`/user/${this.email}`);
      this.user = info.data.user;
    },
    async redirect() {
      this.$router.push(`/membre/${this.email}`);
    },
  },
  created() {
    this.user = this.getInfoUser();
  },
};
</script>
<style lang="scss" scoped>
$color: #26f191;
#card {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-width: 350px;
  width: 400px;
  height: 200px;
  border: 3px solid $color;
  border-radius: 5px;
  #card_row {
    display: grid;
    grid-template-columns: 40% 60%;
    #imgProfil {
        display: flex;
        justify-content: center;
        //align-content: center;
        img {
            height: 120px;
            margin: auto;
            //border-radius: 50%;
        }
    }
    #infoProfil {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h4,
      h5 {
        text-align: center;
      }
    }
  }
  button {
    border: 2px solid $color;
    border-radius: 5px;
    width: 150px;
    align-self: center;
    padding: 1vh 1vw;
  }
}
</style>
