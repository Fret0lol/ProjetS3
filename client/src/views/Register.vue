<template>
  <div id="app">
    <Header />
    <div id="body">
      <h3>Chouette un nouveau copain !</h3>
        <div class="choix" v-if="choice === 0">
        <button @click="choix('Etudiant')">Etudiant</button>
        <button @click="choix('Ancien Etudiant')">Ancien Etudiant</button>
        <button @click="choix('Entreprise')">Entreprise</button>
        <button @click="choix('Professeur')">Professeur</button>
      </div>
      <register v-if="choice !== 0" @retour="retour" :statutUser="this.choice"/>
    </div>
    
  </div>
</template>
<script>
import Header from '@/components/header';
import register from "@/components/register";
export default {
  components: {
    register,
    Header
  },
  data() {
    return {
      choice: 0
    }
  },
  methods: {
    choix(value) {
      switch (value) {
        case 'Etudiant':
          this.choice = value;
          break;
        case 'Ancien Etudiant':
          this.choice = value;
          break;
        case 'Entreprise':
          this.choice = value;
          break;
        case 'Professeur':
          this.choice = value;
          break;
      }
    },
    retour(e) {
      this.choice = e;
    }
  },
};
</script>
<style lang="scss" scoped>
$color: #26f191;
  #app {
    font-family: Poppins;
    #body {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      height: 88.5vh;
      margin-top: 3vh;
      h3 {
        color: $color;
        font-weight: 700;
        text-align: center;
        margin-bottom: 2em;
      }
      .choix {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        height: 70%;
        button {
          background-color: $color;
          border: 1px solid $color;
          border-radius: 10px;
          padding: 2vh 2vw;
          min-width: 200px;
          width: 70vw;
          color: white;
          margin: 4vw;
          font-size: 3vh;
          @media screen and (min-width: 500px){
            width: 30vw;
            font-size: 1.5vw;
          }
        }
      }
    }
  }
</style>
