<template>
  <div id="app">
    <Header />
    <div id="info">
      <!-- TOP -->
      <div id="img-background"></div>
      <div id="head-info">
        <div id="left-head-info">
          <div class="photoProfil"></div>
          <div class="info-resume">
            <input
              type="text"
              v-model="user.prenom"
              class="inputResize"
              onInput="this.style.width = (this.value.length + 1) + 'ch';"
            />
            <input
              type="text"
              v-model="user.nom"
              class="inputResize"
              onInput="this.style.width = (this.value.length + 1) + 'ch';"
            />
            <!-- <p id="name">{{ user.prenom }} {{ user.nom }}</p> -->
            <p>{{ user.statut }}</p>
          </div>
        </div>
        <div id="right-head-info">
          <button @click="save()">Sauvegarder</button>
          <button>Prendre Contact</button>
        </div>
      </div>
      <div id="body-info">
        <!-- FORMATION -->
        <div class="formations">
          <div class="title">
            <p>Formations</p>
            <div class="line"></div>
          </div>
          <div class="body">
            <ul class="timeline">
              <li v-for="line in timeline" :key="line._id">
                <Timeline
                  :formationComplet="line.formationId.intitulé_formation_long"
                  :formationCourt="line.formationId.intitulé_formation_court"
                  :dateEntree="line.date_entrée"
                  :dateSortie="line.date_sortie"
                  :infoSupp="line.infoSupp"
                  :nomEtablissement="line.etablissementId.nom"
                  :villeEtablissement="line.etablissementId.ville"
                />
                <button>Modifier</button>
              </li>
              <li>
                <router-link
                  :to="'/membre/' + user.email + '/edit/' + update"
                  tag="button"
                  >Ajouter</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="rightInfo">
          <div class="infoDiv">
            <div class="title">
              <p>Informations</p>
              <div class="line"></div>
            </div>
            <div class="body">
              <textarea
                v-model="user.infoSupplementaire"
                placeholder="Écrit une message pour ceux qui verront ton profil"
                autocomplete="off"
              ></textarea>
            </div>
          </div>
          <div class="reseauDiv">
            <div class="title">
              <p>Réseaux</p>
              <div class="line"></div>
            </div>
            <div class="body">
              <div id="linkedin">
                <img
                  src="../../assets/LogoLinkedin.png"
                  alt="Logo Linkedin"
                  type="image/svg+xml"
                  title="Voir mon Linkedin"
                />
                <input type="text" v-model="user.linkedin" />
              </div>
              <div id="phone">
                <i><font-awesome-icon icon="phone" /></i>
                <input type="tel" v-model="user.numeroTelephone" id="tel" placeholder="+33 XXXXXXXXXX"/>
              </div>
              <div id="mail">
                <i><font-awesome-icon icon="envelope" /></i>
                <p>{{ user.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import Constantes from "../../constantes"

// Components
import Header from "../../components/header";
import Timeline from "../../components/Timeline";

export default {
  props: ["email"],
  components: {
    Header,
    Timeline,
  },
  data() {
    return {
      userLogin: "",
      user: {},
      timeline: {},
      update: true,
    };
  },
  methods: {
    async getInfoUser() {
      try {
        const params = {
          email: this.email,
        };
        const info = await this.$http.get(`/user/email`, { params });
        this.user = info.data.user;
      } catch (err) {
        console.log(err);
      }
    },
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if (!token) {
        this.userLogin = null;
      } else {
        let decoded = VueJwtDecode.decode(token);
        this.userLogin = decoded.email;
      }
    },
    // En cas d'erreur de frappe utilisateur
    async inputError(id) {
      document.querySelector(id).querySelector("input").style.borderColor = "red";
      document.querySelector(id).querySelector("input").style.color = "red";
    },
    async getTimeline() {
      try {
        const params = {
          email: this.email,
        };
        const data = await this.$http.get(`/inscription/getByUser`, { params });
        this.timeline = data.data.inscription;
      } catch (err) {
        console.log(err);
      }
    },
    async save() {
      try {
        // Test Linkedin Correct
        if ((this.user.linkedin.length !== 0) && (!Constantes.formatLienLinkedIn.test(this.user.linkedin))) {
          await this.inputError("#linkedin");
          return 1
        }
        // Test Numéro Téléphone Correct
        if ((this.user.numeroTelephone.length !== 0) && (!Constantes.formatNuméroTéléphone.test(this.user.numeroTelephone))) {
          await this.inputError("#phone");
          return 1
        }
        await this.$http.put(`/user/` + this.email, this.user);
        this.$router.replace(`/membre/` + this.email);
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getUserDetails();
    this.getInfoUser();
    this.getTimeline();
  }
};
</script>
<style lang="scss" scoped>
@import "@/Variable.scss";

#app {
  #info {
    margin-top: 1vh;
    #img-background {
      position: absolute;
      z-index: -1;
      background-image: url("../../assets/imgBack.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      height: 20vh;
      width: 100%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    #head-info {
      padding: 4vh 7vw;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      #left-head-info {
        display: flex;
        flex-flow: row wrap;
        //width: 80%;
        .photoProfil {
          // Image Profil
          background-color: #26f191;
          height: 250px;
          width: 250px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        }
        .info-resume {
          padding: 3vh 0vw 3vh 3vw;
          color: $color;
          font-size: 3vh;
          width: 600px;
          #name {
            font-weight: 700;
          }
          input {
            background: transparent;
            color: $color;
            font-weight: 700;
            border: none;
            width: 30%;
          }
        }
      }
      #right-head-info {
        display: flex;
        flex-direction: row;
        align-items: center;

        button {
          background-color: $color;
          border: none;
          padding: 10px 22px;
          border-radius: 5px;
          color: white;
          font-weight: 700;
          margin: 0 1em;
        }
      }
    }
    #body-info {
      margin: auto;
      display: flex;
      flex-flow: row wrap;
      width: 90vw;

      .formations {
        width: 100vw;
        min-width: 300px;
        @media screen and (min-width: 660px) {
          width: 45vw;
        }
        .body {
          .timeline {
            position: relative;
            width: 100%;
            margin-top: 20px;
            margin: 20px 2vw 0;
            padding: 1em 0;
            list-style-type: none;
            &::before {
              position: absolute;
              left: 0;
              top: 0;
              content: " ";
              display: block;
              width: 6px;
              height: 100%;
              margin-left: -3px;
              background: black;
              z-index: 5;
            }
            li {
              padding: 1em 2em;
              display: flex;
              flex-direction: row;
              &::after {
                content: "";
                display: block;
                height: 0;
                clear: both;
                visibility: hidden;
              }
              button {
                background-color: $color;
                border: none;
                padding: 10px 22px;
                border-radius: 5px;
                color: white;
                font-weight: 700;
                margin: 0 1em;
              }
              .modifier {
                padding: 5px 11px;
                height: 4vh;
              }
            }
          }
        }
      }
      .rightInfo {
        width: 50%;
        .infoDiv {
          .body {
            textarea {
              width: 100%;
              height: 20vh;
              margin: 2vh 0;
              resize: none;
              border: 2px solid $color;
            }
          }
        }
        .reseauDiv {
          .body {
            padding: 2vh 0;
            img {
              width: 3vw;
            }

            div {
              margin: 0 1vw;
              display: flex;
              align-items: center;
              input {
                background: transparent;
                color: $color;
                font-weight: 700;

                width: 30%;
                border: 1px solid $color;
                border-radius: 5px;
                outline: none;
                padding: 0.5vh 1vw;
              }
              i {
                font-size: 3vh;
                margin: 0 1vw;
                color: $color;
              }
            }
          }
        }
      }
    }
  }
  #edit {
    //height: 5vh;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    margin: 0 2vw;
    a i {
      font-size: 3vh;
      color: $color;
    }
  }
}
</style>