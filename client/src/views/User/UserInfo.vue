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
            <p>{{ user.statut }}</p>
          </div>
        </div>
        <div id="right-head-info">
          <router-link
            :to="'/membre/' + user.email + '/edit'"
            tag="button"
            id="edit"
            v-if="userLogin === user.email"
          >
            <i>
              <font-awesome-icon icon="edit" />
            </i>
          </router-link>
          <button>Prendre Contact</button>
        </div>
      </div>
      <div id="body-info">
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
              <p>{{ user.infoSupplementaire }} </p>
            </div>
          </div>
          <div class="reseauDiv">
            <div class="title">
              <p>Réseaux</p>
              <div class="line"></div>
            </div>
            <div class="body">
              <a :href="'//' + user.linkedin" id="linkedin" class="reseau">
                <img src="../../assets/LogoLinkedin.svg" alt="Logo Linkedin" type="image/svg+xml" title="Voir mon Linkedin">
                Mon Linkedin
              </a>
            </div>
          </div>
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
  props: ["email"],
  components: {
    Header,
    Timeline,
  },
  data() {
    return {
      userLogin: "",
      user: {},
      timeline: {}
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

    async getTimeline() {
      try {
        const params = {
          email: this.email,
        };
        const data = await this.$http.get(`/inscription/getByUser`, { params });
        console.log(data.data.inscription);
        this.timeline = data.data.inscription;
      } catch (err) {
        console.log(err);
      }
    }
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
      position: absolute;
      z-index: -1;
      background-image: url("../../assets/imgBack.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      height: 25vh;
      width: 100%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    #head-info {
      padding: 7vh 7vw;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      #left-head-info {
        display: flex;
        flex-flow: row wrap;
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
          color: $color;
          font-size: 3vh;
          #name {
            font-weight: 700;
          }
        }
      }
      #right-head-info {
        display: flex;
        align-items: center;
        button {
          background-color: $color;
          border: none;
          padding: 10px 22px;
          border-radius: 5px;
          color: white;
          font-weight: 700;
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