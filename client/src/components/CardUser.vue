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
$color: #26f192;
#card {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  min-width: 350px;
  width: 400px;
  height: 200px;
  border-radius: 5px;
  border: 3px solid white;
  background-color: $color;
  color: white;

  box-shadow: 0px 100px 80px rgba(119, 119, 119, 0.07), 0px 41.7776px 33.4221px rgba(119, 119, 119, 0.0503198), 0px 22.3363px 17.869px rgba(119, 119, 119, 0.0417275), 0px 12.5216px 10.0172px rgba(119, 119, 119, 0.035), 0px 6.6501px 5.32008px rgba(119, 119, 119, 0.0282725), 0px 2.76726px 2.21381px rgba(119, 119, 119, 0.0196802);
  div {
    display: grid;
    grid-template-columns: 40% 60%;
    #imgProfil {
      display: flex;
      justify-content: center;
      
      img {
        height: 140px;
        width: 140px;
        object-fit: scale-down;
        border-radius: 7px;
      }
    }
    #infoProfil {
      display: flex;
      flex-direction: column; 
      justify-content: flex-start;
      
      #name {
        font-size: 140%;
        font-weight: 700;
      }
      p {
        font-size: 120%;
      }
    }
  }
  .button {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    padding: 0 2vw;
    
    button {
      background: white;
      border: 2px solid white;
      border-radius: 5px;
      width: 150px;
      padding: 0.75vh 1vw;
      color: $color;
      font-weight: 600;
    }
  }
}
</style>
