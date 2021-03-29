<template>
  <div id="app">
    <Header />
    <div id="body">
      <div id="recherche">
        <div class="title">
          <p>Liste des membres</p>
          <div class="line"></div>
        </div>
        <div id="recherche_par">
          <p>Recherche :</p>
          <input type="text" placeholder="Nom" v-model="name" />

          <div class="input" @click="recherche = 1">
            <input type="radio" name="choixRechercheNom" />
            <label
              for="choixRechercheNom"
              class="radio"
              :class="{ checked: recherche === 1 }"
              >Nom</label
            >
          </div>
          <div class="input" @click="recherche = 2">
            <input type="radio" name="choixRecherchePrenom" />
            <label
              for="choixRecherchePrenom"
              class="radio"
              :class="{ checked: recherche === 2 }"
              >Prénom</label
            >
          </div>
          <div class="input" @click="recherche = 3">
            <input type="radio" name="choixRechercheEmail" />
            <label
              for="choixRechercheEmail"
              class="radio"
              :class="{ checked: recherche === 3 }"
              >Email</label
            >
          </div>
        </div>
        <button
          class="button"
          @click="changeList"
          v-if="this.listeEntiereUsersTri !== this.listeEntiereUsers"
        >
          Afficher tous les membres
        </button>
        <button class="button" @click="changeList" v-else>
          Cacher les membres validés
        </button>
      </div>
      <div class="head">
        <table>
          <tr>
            <th
              @click="
                valideFunction();
                tri(1);
              "
            >
              Validé
            </th>
            <th
              @click="
                valideFunction();
                tri(2);
              "
            >
              Nom
            </th>
            <th
              @click="
                valideFunction();
                tri(3);
              "
            >
              Prénom
            </th>
            <th
              @click="
                valideFunction();
                tri(4);
              "
            >
              Email
            </th>
            <th>Statut</th>
            <th>Supprimer</th>
          </tr>
        </table>
      </div>
      <div class="body">
        <table>
          <tr v-for="user in filteredList" :key="user.email">
            <td v-if="user.valide" @click="changerValide(user)" class="pointer">
              <font-awesome-icon icon="check" />
            </td>
            <td v-if="!user.valide" @click="changerValide(user)">
              <font-awesome-icon icon="times" />
            </td>
            <td>{{ user.nom }}</td>
            <td>{{ user.prenom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.statut }}</td>
            <td @click="deleteUser(user)" class="pointer">
              <font-awesome-icon icon="times" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/header";

export default {
  data() {
    return {
      listeEntiereUsers: [],
      listeEntiereUsersTri: [],
      valide: 1,
      valeurTri: -1,
      recherche: 1,
      name: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    valideFunction() {
      if (this.valide === 1) {
        this.valide = -1;
      } else {
        this.valide = 1;
      }
    },
    /**
     * Change la validité de l'utilisateur
     */
    async changerValide(user) {
      try {
        user.valide = !user.valide;
        await this.$http.put(`/user/valide`, user);
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Supprime l'utilisateur
     */
    async deleteUser(user) {
      try {
        await this.$http.post(`/user/delete`, user);
        this.getInfoUser();
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * @returns La liste de tous les utilisateurs depuis la BDD
     */
    async getAllUsers() {
      const data = await this.$http.get(`/user/users`);
      data.data.users.forEach((user) => {
        this.listeEntiereUsers.push(user);
      });
      this.listeEntiereUsersTri = this.listeEntiereUsers.filter((user) => {
        if (user.valide === false) {
          return user;
        }
      });
    },
    /**
     * Change soit vers la liste entière des membres soit vers la liste des membres non validé
     */
    changeList() {
      if (this.listeEntiereUsersTri === this.listeEntiereUsers) {
        this.listeEntiereUsersTri = this.listeEntiereUsers.filter((user) => {
          if (user.valide === false) {
            return user;
          }
        });
      } else {
        this.listeEntiereUsersTri = this.listeEntiereUsers;
      }
    },
    /**
     * @param Valeur Diffère selon choix utilisateur
     */
    async tri(valeur) {
      switch (valeur) {
        case 1:
          if (this.valide === 1) {
            this.listeEntiereUsersTri = this.listeEntiereUsersTri.sort((a, b) =>
              a.valide < b.valide ? 1 : -1
            );
          } else if (this.valide === -1) {
            this.listeEntiereUsersTri = this.listeEntiereUsersTri.sort((a, b) =>
              a.valide > b.valide ? 1 : -1
            );
          }
          break;
        case 2:
          if (this.valide === 1) {
            this.listeEntiereUsersTri = this.listeEntiereUsersTri.sort((a, b) =>
              a.nom < b.nom ? 1 : -1
            );
          } else if (this.valide === -1) {
            this.listeEntiereUsersTri = this.listeEntiereUsersTri.sort((a, b) =>
              a.nom > b.nom ? 1 : -1
            );
          }
          break;
        case 3:
          if (this.valide === 1) {
            this.listeEntiereUsersTri = this.listeEntiereUsersTri.sort((a, b) =>
              a.prenom < b.prenom ? 1 : -1
            );
          } else if (this.valide === -1) {
            this.listeEntiereUsersTri = this.listeEntiereUsersTri.sort((a, b) =>
              a.prenom > b.prenom ? 1 : -1
            );
          }
          break;
        case 4:
          if (this.valide === 1) {
            this.listeEntiereUsersTri = this.listeEntiereUsersTri.sort((a, b) =>
              a.email < b.email ? 1 : -1
            );
          } else if (this.valide === -1) {
            this.listeEntiereUsersTri = this.listeEntiereUsersTri.sort((a, b) =>
              a.email > b.email ? 1 : -1
            );
          }
          break;
      }
    },
  },
  created() {
    this.getAllUsers();
  },
  computed: {
    filteredList() {
      return this.listeEntiereUsersTri.filter((user) => {
        if (this.recherche === 1) {
          return user.nom.toLowerCase().includes(this.name.toLowerCase());
        } else if (this.recherche === 2) {
          return user.prenom.toLowerCase().includes(this.name.toLowerCase());
        } else if (this.recherche === 3) {
          return user.email.toLowerCase().includes(this.name.toLowerCase());
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/Variable.scss";
#app {
  #body {
    margin: 7vh 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    #recherche {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 0 30px;
        p {
          font-size: 40px;
        }
        .line {
          width: 200px;
        }
      }
      #recherche_par {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        vertical-align: center;
        p {
          margin: 0;
        }
        .input {
          margin: 0 10px;
          label {
            margin: auto 0;
          }
        }
        input {
          padding: 3px 6px;
          outline: none;
          border: 2px $color solid;
          border-radius: 5px;
          margin: 0 15px;
        }
      }
        button {
          
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
    div table {
      width: 90vw;
      table-layout: fixed;
      border: 1px solid $color;
    }
    .head {
      background-color: #26f191a0;
      tr {
        th {
          padding: 1vh 1vw;
          text-align: left;
          font-weight: 700;
          font-size: 1.2vw;
          cursor: pointer;
        }
      }
    }
    .body {
      height: 70vh;
      overflow-y: scroll;
      overflow-x: hidden;
      width: 89.9vw;
      border: none;
      tr {
        td {
          padding: 1vh 1vw;
          text-align: left;
          vertical-align: middle;
          font-weight: 300;
          font-size: 1.2vw;
          border-bottom: 3px solid gray;
        }
        .pointer {
          cursor: pointer;
        }
      }
    }
  }
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1vw rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 1vw #26f191c5;
}
.checked {
  background-color: $color;
  color: $color2 !important ;
}
</style>