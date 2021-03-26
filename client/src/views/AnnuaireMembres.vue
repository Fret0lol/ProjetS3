<template>
  <div id="app">
    <Header />
    <div id="recherche">
      <h1>Annuaire</h1>
      <div id="tri">
        <p>Tri :</p>
        <div class="input">
          <input
            type="radio"
            id="alpha"
            name="tri"
            value="alphabetique"
            @change="alphabetique"
            checked
          />
          <label for="alpha" class="radio" :class="{ checked: triAlpha }"
            >Alphabétique</label
          >
        </div>
        <div class="input">
          <input
            type="radio"
            id="anti_alpha"
            name="tri"
            value="anti_alphabetique"
            @change="antiAlphabetique"
          />
          <label for="anti_alpha" class="radio" :class="{ checked: !triAlpha }"
            >Anti-alphabétique</label
          >
        </div>
      </div>
      <div id="recherche_par_nom_et_prenom">
        <input type="text" placeholder="Nom" v-model="name" />
        <input type="radio" name="choixRechercheNom" @change="recherche = 1" />
        <label for="choixRechercheNom" class="radio">Nom</label>
        <input
          type="radio"
          name="choixRecherchePrenom"
          @change="recherche = 2"
        />
        <label for="choixRecherchePrenom" class="radio">Prénom</label>
      </div>
      <button class="button">Rechercher</button>
    </div>
    <div id="cards">
      <CardAnnuaire
        v-for="user in filteredList"
        :nomUtilisateur="user.nomUtilisateur"
        :key="user.nomUtilisateur"
        :nom="user.nom"
        :prenom="user.prenom"
        :statut="user.statut"
        :image="user.imgProfil"
        class="card"
      />
    </div>
    <div id="button">
      <button @click="getLessUsers" v-if="boutonPrecedent">Précédente</button>
      <button @click="getMoreUsers" v-if="boutonSuivant">Suivante</button>
    </div>
  </div>
</template>
<script>
import Header from "../components/header";
import CardAnnuaire from "../components/CardUser";

export default {
  components: {
    Header,
    CardAnnuaire,
  },
  data() {
    return {
      utilisateurAffiche: [],
      listeEntiereUsers: [],
      listeEntiereUsersTrier: [],
      nbPage: 0,
      boutonSuivant: true,
      boutonPrecedent: false,
      triAlpha: true,
      name: "",
      prenom: "",
      recherche: 0,
    };
  },
  methods: {
    /**
     * @returns La liste de tous les utilisateurs depuis la BDD
     */
    async getAllUsers() {
      const data = await this.$http.get(`/user/users`);
      data.data.users.forEach((user) => {
        this.listeEntiereUsers.push(user);
      });
      this.alphabetique();
    },
    /**
     * @returns d'afficher les 10 prochains utilisateurs qui suivent ceux affichés
     */
    async getMoreUsers() {
      this.nbPage++;
      this.utilisateurAffiche = this.listeEntiereUsersTrier.slice(
        10 * this.nbPage,
        10 * this.nbPage + 10
      );
      if (this.listeEntiereUsersTrier.length - (this.nbPage + 1) * 10 < 1) {
        this.boutonSuivant = false;
      }
      this.boutonPrecedent = true;
    },
    /**
     * @returns les 10 précédents utilisateurs qui précèdent ceux affichés
     */
    async getLessUsers() {
      this.nbPage--;
      this.utilisateurAffiche = this.listeEntiereUsersTrier.slice(
        10 * this.nbPage,
        10 * this.nbPage + 10
      );
      if (this.nbPage === 0) {
        this.boutonPrecedent = false;
      }
      this.boutonSuivant = true;
    },
    /**
     * @returns la liste trié alphabétiquement des utilsiateurs
     */
    async alphabetique() {
      this.listeEntiereUsersTrier = this.listeEntiereUsers.sort((a, b) =>
        a.nom > b.nom ? 1 : -1
      );
      this.utilisateurAffiche = this.listeEntiereUsersTrier.slice(0, 10);
      this.boutonSuivant = true;
      this.boutonPrecedent = false;
      this.triAlpha = true;
    },
    /**
     * @returns la liste trié anti-alphabétiquement des utilisateurs
     */
    async antiAlphabetique() {
      this.listeEntiereUsersTrier = this.listeEntiereUsers.sort((a, b) =>
        a.nom < b.nom ? 1 : -1
      );
      this.utilisateurAffiche = this.listeEntiereUsersTrier.slice(0, 10);
      this.boutonSuivant = true;
      this.boutonPrecedent = false;
      this.triAlpha = false;
    },

    async searchName() {
      if (this.name.length > 0) {
        let tabUserName = [];
        this.listeEntiereUsers.forEach((element) => {
          if (element.nom.search(this.name) != -1) {
            tabUserName.push(element);
          }
        });
        this.users = tabUserName;
      }
    },
  },
  created() {
    this.getAllUsers();
  },
  computed: {
    filteredList() {
      return this.listeEntiereUsers.filter((user) => {
        return user.nom.toLowerCase().includes(this.name.toLowerCase());
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/Variable.scss";
#app {
  padding-bottom: 2em;
  user-select: none;
  #recherche {
    height: 40vh;
    width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    font-weight: 700;
    h1 {
      text-align: center;
    }
    #tri {
      display: flex;
      justify-content: center;
      .input {
        margin: 0 2em;
      }
    }
    #recherche_par_nom_et_prenom {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 20px;
      input {
        padding: 3px 6px;
        outline: none;
        border: 2px $color solid;
        border-radius: 5px;
        margin: 0 15px;
      }
    }
    button {
      width: 150px;
      margin: 20px auto 0;
    }
    input[type="radio"] {
      display: none;
    }
    label {
      border: 2px $color solid;
      border-radius: 5px;
      padding: 3px 6px;
      cursor: pointer;
      font-weight: 700;
      color: $color3;
      &:hover,
      .checked {
        background-color: $color;
        color: $color2;
      }
    }
  }
  #cards {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    .card {
      margin: 1vh 0;
    }
  }
  #button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2em 0;
    button {
      background-color: $color;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 0.75em 1em;
      font-weight: 700;
    }
  }
}
// Classe pour actualiser l'état des boutons de tri
.checked {
  background-color: $color;
  color: $color2 !important ;
}
</style>