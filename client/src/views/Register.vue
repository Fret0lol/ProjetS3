<template>
  <div id="app">
    <Header />
    <div id="body">
      <h3>Chouette un nouveau copain !</h3>
        <div class="choix" v-if="choice === 0">
        <button @click="choix('etudiant')">Etudiant</button>
        <button @click="choix('ancienEtudiant')">Ancien Etudiant</button>
        <button @click="choix('entreprise')">Entreprise</button>
        <button @click="choix('professeur')">Professeur</button>
      </div>
      <register v-if="choice === 1" @retour="retour"/>
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
        case 'etudiant':
          this.choice = 1;
          break;
        case 'ancienEtudiant':
          this.choice = 2;
          break;
        case 'entreprise':
          this.choice = 3;
          break;
        case 'professeur':
          this.choice = 4;
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
