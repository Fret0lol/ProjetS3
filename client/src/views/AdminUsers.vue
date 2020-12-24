<template>
  <div id="app">
    <Header />
    <div id="body">
      <div class="head">
        <table>
          <tr>
            <th @click="valideFunction();tri('valide')">Validé</th>
            <th @click="valideFunction();tri('nom')">Nom</th>
            <th @click="valideFunction();tri('prenom')">Prénom</th>
            <th @click="valideFunction();tri('email')">Email</th>
            <th @click="valideFunction();tri('statut')">Statut</th>
            <th>Supprimer</th>
          </tr>
        </table>
      </div>
      <div class="body">
        <table>
          <tr v-for="user in users" :key="user.email">
            <td v-if="user.valide" @click="changerValide(user)">
              <font-awesome-icon icon="check" />
            </td>
            <td v-if="!user.valide" @click="changerValide(user)">
              <font-awesome-icon icon="cross" />
            </td>
            <td>{{ user.nom }}</td>
            <td>{{ user.prenom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.statut }}</td>
            <td @click="deleteUser(user)">
              <font-awesome-icon icon="cross" />
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
      users: {},
      offset: 0,
      valide: 1,
      nom: 1,

    };
  },
  components: {
    Header,
  },
  methods: {
    async getInfoUser() {
      const params = {
        offset: this.offset,
        limit: 50,
        sort: "",
      };
      const info = await this.$http.get(`/user/users/params`, { params });
      this.users = info.data.rep;
    },
    async changerValide(user) {
      try {
        user.valide = !user.valide;
        await this.$http.put(`/user/valide`, user);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteUser(user) {
      try {
        await this.$http.post(`/user/delete`, user);
        this.getInfoUser();
      } catch (err) {
        console.log(err);
      }
    },
    async tri(valeur) {
      const params = {
        offset: this.offset,
        limit: 0,
        sortType: valeur,
        sortValue: this.valide
      };
      const info = await this.$http.get(`/user/users/params`, { params });
      this.users = info.data.rep;
    },
    valideFunction() {
        if (this.valide === 1) {
            this.valide = -1;
        } else {
            this.valide = 1;
        }
    }
  },
  created() {
    this.getInfoUser();
  },
};
</script>
<style lang="scss">
$color: #26f191;
#app {
  #body {
    margin: 7vh 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
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
</style>