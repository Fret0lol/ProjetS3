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
              class="inputResize name"
              onInput="this.style.width = (this.value.length + 1) + 'ch';"
            />
            <input
              type="text"
              v-model="user.nom"
              class="inputResize name"
              onInput="this.style.width = (this.value.length + 1) + 'ch';"
            />
            <div class="reseau">
              <div id="linkedin">
                <img
                  src="../../assets/LogoLinkedin.png"
                  alt="Logo Linkedin"
                  width="50px"
                  title="Voir mon Linkedin"
                />
                <input
                  type="text"
                  v-model="user.linkedin"
                  placeholder="https://www.linkedin.com/in/XXXXXXXXXXX"
                />
              </div>
              <div id="phone">
                <i><font-awesome-icon icon="phone" /></i>
                <input
                  type="tel"
                  v-model="user.numeroTelephone"
                  id="tel"
                  placeholder="+33 XXXXXXXXXX"
                />
              </div>
              <div id="mail">
                <i><font-awesome-icon icon="envelope" /></i>
                <input
                  type="tel"
                  v-model="user.email"
                  id="email"
                  placeholder="exemple@gmail.com"
                />
              </div>
            </div>
            <!-- <p>{{ user.statut }}</p> -->
          </div>
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
                  :to="'/membre/' + user.nomUtilisateur + '/edit/' + update"
                  tag="button"
                  >Ajouter</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="experiencePro" v-if="experiencePro.length !== 0">
          <div class="title">
            <p>Expérience Professionnel</p>
            <div class="line"></div>
          </div>
          <div class="body">
            <ul class="timeline">
              <li v-for="line in experiencePro" :key="line._id">
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
                  to="/addFormation"
                  tag="button"
                  >Ajouter</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <button @click="save()">Sauvegarder</button>
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import Constantes from "../../constantes";
import swal from "sweetalert";
// Components
import Header from "../../components/header";
import Timeline from "../../components/Timeline";

export default {
  props: ["nomUtilisateur"],
  components: {
    Header,
    Timeline,
  },
  data() {
    return {
      userLogin: "",
      user: {},
      timeline: {},
      experiencePro: {},
      update: true,
    };
  },
  methods: {
    async getInfoUser() {
      try {
        const params = {
          nomUtilisateur: this.nomUtilisateur,
        };
        const info = await this.$http.get(`/user/nomUtilisateur`, { params });
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
        this.userLogin = decoded.nomUtilisateur;
      }
    },
    // En cas d'erreur de frappe utilisateur
    async inputError(id) {
      document.querySelector(id).querySelector("input").style.borderColor =
        "red";
      document.querySelector(id).querySelector("input").style.color = "red";
    },
    async getTimeline() {
      try {
        const params = {
          nomUtilisateur: this.nomUtilisateur,
        };
        const data = await this.$http.get(`/inscription/getByUser`, { params });
        this.timeline = data.data.inscription;
      } catch (err) {
        console.log(err);
      }
    },
    async save() {
      try {
        console.log(this.user);
        // Test Linkedin Correct
        if (
          this.user.linkedin !== "" &&
          !Constantes.formatLienLinkedIn.test(this.user.linkedin)
        ) {
          this.inputError("#linkedin");
          swal("Error", "Champs incorrects", "Error");
          return 1;
        }
        // Test Numéro Téléphone Correct
        if (
          this.user.numeroTelephone.length !== 0 &&
          !Constantes.formatNuméroTéléphone.test(this.user.numeroTelephone)
        ) {
          await this.inputError("#phone");
          return 1;
        }
        await this.$http.put(`/user/` + this.nomUtilisateur, this.user);
        this.$router.replace(`/membre/` + this.nomUtilisateur);
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getUserDetails();
    this.getInfoUser();
    this.getTimeline();
  },
};
</script>
<style lang="scss" scoped>
@import "@/Variable.scss";

#app {
  #info {
    margin-top: 1vh;
    #img-background {
      display: none;
      @media screen and (min-width: 750px) {
        display: block;
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
    }
    #head-info {
      padding: 4vh 7vw;
      display: flex;
      flex-direction: column;
      align-content: center;
      @media screen and (min-width: 750px) {
        flex-flow: row wrap;
        justify-content: space-between;
      }
      #left-head-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media screen and (min-width: 750px) {
          flex-flow: row wrap;
        }
        .photoProfil {
          // Image Profil
          background-color: #26f191;
          height: 250px;
          width: 250px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        }
        .info-resume {
          padding: 3vh 3vw;
          color: $color3;
          font-size: 4vh;
          @media screen and (min-width: 750px) {
            color: $color2;
            font-size: 3vh;
          }
          .name {
            font-weight: 700;
            margin: 0 0 2.2em 0;
            text-align: center;
            @media screen and (min-width: 750px) {
              text-align: left;
            }
          }
          input {
              background: transparent;
              width: 6em;
              outline: none;
              color: $color2;
              font-weight: 700;
              border: 1px solid $color;
              border-radius: 5px;
            }
          .reseau {
            display: flex;
            flex-direction: row;
            //padding: 2vh 0;
            a {
              img {
                height: 50px;
              }
            }
            div {
              margin: 0 1vw 0 0;
              display: flex;
              align-items: center;
              font-weight: 700;
              i {
                font-size: 3vh;
                margin: 0 1vw;
                color: $color;
              }
              input {
                color: $color3;
                font-size: 2vh;
                width: 14em;
              }
            }
          }
        }
      }
    }
    #body-info {
      margin: auto;
      display: flex;
      flex-flow: row wrap;
      width: 90vw;

      .formations,
      .experiencePro {
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
      button {
          background-color: $color;
          border: none;
          border-radius: 5px;
          padding: 10px 22px;
          color: $color2;
          font-weight: 700;
          margin: 20px 5px;
          width: 11em;
        }
    }
  }
}
</style>