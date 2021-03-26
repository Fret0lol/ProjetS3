<template>
  <div id="card">
    <div id="top">
      <div id="photoProfil" v-bind:style="imageNonNull"></div>
      <div id="infoProfil">
        <p id="name">{{ this.nom }} {{ this.prenom }}</p>
        <p>{{ this.statut }}</p>
      </div>
    </div>
    <div class="link">
      <router-link :to="'/membre/' + nomUtilisateur" tag="button" class="button"
        >Voir le profil</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ["nomUtilisateur", "nom", "prenom", "statut", "image"],
  data() {
    return {
      imageNonNull: {},
    };
  },
  methods: {
    /**
     * Permet d'afficher une image par défaut si l'utilisateur n'a pas d'image de profil
     */
    displayImage() {
      if (this.image !== null) {
        this.imageNonNull = {
          backgroundImage:
            "url(" +
            "http://localhost:4000/images/userImage/" +
            this.image +
            ")",
        };
      } else {
        this.imageNonNull = {
          backgroundImage:
            "url(http://localhost:4000/images/imgDefault/Logotype.png)",
        };
      }
    },
    /**
     * Redirige l'utilisateur sur le profil de cet utilisateur
     */
    redirect() {
      this.$router.push(`/membre/${this.nomUtilisateur}`);
    },
  },
  created() {
    this.displayImage();
  },
};
</script>
<style lang="scss" scoped>
@import "@/Variable.scss";
#card {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-width: 350px;
  width: 400px;
  height: 200px;
  border-radius: 5px;
  border: 3px solid $color;
  background-color: $color2;
  color: $color3;
  box-shadow: 0px 100px 80px rgba(119, 119, 119, 0.07),
    0px 41.7776px 33.4221px rgba(119, 119, 119, 0.0503198),
    0px 22.3363px 17.869px rgba(119, 119, 119, 0.0417275),
    0px 12.5216px 10.0172px rgba(119, 119, 119, 0.035),
    0px 6.6501px 5.32008px rgba(119, 119, 119, 0.0282725),
    0px 2.76726px 2.21381px rgba(119, 119, 119, 0.0196802);
  #top {
    display: flex;
    flex-direction: row;
    justify-content: center;

    #photoProfil {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 5px;
      height: 130px;
      width: 130px;
      margin: 0 20px;
    }
    #infoProfil {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 200px;

      #name {
        font-size: 140%;
        font-weight: 700;
      }
      p {
        font-size: 120%;
      }
    }
  }
  .link {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    button {
      width: 150px;
    }
  }
}
</style>
