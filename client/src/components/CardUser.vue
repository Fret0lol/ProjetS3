<template>
  <div id="card">
    <div>
      <div id="imgProfil">
        <img src="../assets/Logo.png" alt="" />
      </div>
      <div id="infoProfil">
        <p id="name">{{ this.nom }} {{ this.prenom }}</p>
        <p>{{ this.statut }}</p>
      </div>
    </div>
    <div class="button">
      <button @click="redirect">Voir le profil</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["nomUtilisateur", "nom", "prenom", "statut"],
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async getInfoUser() {
      const params = {
        nomUtilisateur: this.nomUtilisateur,
      };
      const info = await this.$http.get(`/user/nomUtilisateur`, { params }); //${this.email}
      this.user = info.data.user;
    },
    redirect() {
      this.$router.push(`/membre/${this.nomUtilisateur}`);
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
  border-radius: 5px;
  border: 3px solid $color;
  background-color: white;
  color: $color;
  div {
    display: grid;
    grid-template-columns: 40% 60%;
    #imgProfil {
      display: flex;
      justify-content: center;
      img {
        height: 120px;
        width: 120px;
        border-radius: 5px;
      }
    }
    #infoProfil {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      
      #name {
        font-size: 1.5vw;
        font-weight: 700;
      }
      p {
        font-size: 1vw;
      }
    }
  }
  .button {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    padding: 0 2vw;
    
    button {
      background: $color;
      border: 2px solid $color;
      border-radius: 5px;
      width: 150px;
      padding: 0.75vh 1vw;
      color: white;
      font-weight: 600;
    }
  }
}
</style>
