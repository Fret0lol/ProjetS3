<template>
  <div id="app">
    <Header />
    <div id="info">
      <div id="img-background"></div>
      <div id="head-info">
        <div id="left-head-info">
          <div class="photoProfil"></div>
          <div class="info-resume">
            <p id="name">{{ user.prenom }} {{ user.nom }}</p>
            <!-- <p>{{ user.statut }}</p> Doit être le dernier poste occupée-->
            <div class="reseau">
              <div id="linkedin" v-if="user.linkedin !== null">
                <a
                  :href="user.linkedin"
                  target="_blank"
                  id="linkedin"
                  class="reseau"
                >
                  <img
                    src="../../assets/LogoLinkedin.png"
                    alt="Logo Linkedin"
                    type="image/svg+xml"
                    title="Voir mon Linkedin"
                  />
                </a>
              </div>
              <div id="phone" v-if="user.numeroTelephone !== null">
                <i><font-awesome-icon icon="phone" /></i>
                <p>{{ user.numeroTelephone }}</p>
              </div>
              <div id="mail">
                <i><font-awesome-icon icon="envelope" /></i>
                <p>{{ user.email }}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="right-head-info">
          <!-- Lien Page Edition -->
          <router-link
            :to="'/membre/' + user.nomUtilisateur + '/edit'"
            tag="button"
            id="edit"
            v-if="userLogin === user.nomUtilisateur"
          >
            <i>
              <font-awesome-icon icon="edit" />
            </i>
          </router-link>
          <!-- Lien Page Messagerie Instantannée -->
          <button>Contacter</button>
          <button>Mon CV</button>
        </div>
      </div>
      <div id="body-info">
        <div class="formations" v-if="timeline.length !== 0">
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
              </li>
            </ul>
          </div>
        </div>
        <div
          class="messageSiPasTimelines"
          v-if="timeline.length === 0 && experiencePro.length === 0"
        >
          <p>Nous n'avons pas plus d'informations sur cet individus :)</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
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
        console.log(this.user.linkedin);
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
  },
  created() {
    this.getUserDetails();
    this.getInfoUser();
    this.getTimeline();
    console.log(this.user)
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
          #name {
            font-weight: 700;
            margin: 0 0 2.2em 0;
            text-align: center;
            @media screen and (min-width: 750px) {
              text-align: left;
            }
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
              p {
                color: $color3;
                margin: 0;
                font-size: 18px;
              }
            }
          }
        }
      }
      #right-head-info {
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          background-color: $color;
          border: none;
          border-radius: 5px;
          padding: 10px 22px;
          color: $color2;
          font-weight: 700;
          margin: 0 5px;
          width: 8em;
          font-size: 1.8vh;
          @media screen and (min-width: 750px) {
            
          }
        }
        #edit {
          width: 4em;
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
              &::after {
                content: "";
                display: block;
                height: 0;
                clear: both;
                visibility: hidden;
              }
            }
          }
        }
      }
      .rightInfo {
        width: 50%;
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