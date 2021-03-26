<template>
  <div id="app">
    <Header />
    <div id="info">
      <div id="card">
        <div id="photoProfil"></div>
        <div id="infoResume">
          <h3>{{ user.prenom }} {{ user.nom }}</h3>
          <h5>{{ user.statut }}</h5>
        </div>
        <div id="bouton">
          <button class="button">Contacter</button>
          <button class="button">CV</button>
        </div>
        <div id="lien">
          <div id="linkedin" class="lien">
            <img
              src="../../assets/LogoLinkedin.png"
              alt="Logo Linkedin"
              width="50px"
              title="Voir mon Linkedin"
            />
            <a :href="user.linkedin">Linkedin</a>
          </div>
          <div id="telephone" class="lien">
            <i><font-awesome-icon icon="phone" /></i>
            <p>{{ user.numeroTelephone }}</p>
          </div>
          <div id="mail" class="lien">
            <i><font-awesome-icon icon="envelope" /></i>
            <p>{{ user.email }}</p>
          </div>
        </div>
        <div id="edit" v-if="userLogin === nomUtilisateur">
          <router-link
            :to="'/membre/' + nomUtilisateur + '/edit'"
            tag="button"
            class="button"
            >Modifier</router-link
          >
        </div>
      </div>
      <div id="timeline">
        <div id="experiencePro" v-if="experiencePro.length !== 0">
          <div class="title">
            <p>Parcours professionnel</p>
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
        <!-- FORMATION -->
        <div id="formations">
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
        if (this.user.imgProfil != null) {
          document.querySelector("#photoProfil").style.backgroundImage =
            "url(" +
            "http://localhost:4000/images/userImage/" +
            this.user.imgProfil +
            ")";
        }
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
        this.timeline;
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    #card {
      height: 80vh;
      min-width: 350px;
      width: 350px;
      margin: 50px 7vw;
      border: 2px solid $color;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 20px;
      position: sticky;
      @media screen and (min-width: 750px) {
        margin: auto 7vw auto 0;
      }
      #photoProfil {
        background-color: #26f191;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 250px;
        width: 250px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      }
      #infoResume {
        margin: 20px 0 0 0;
        width: 250px;
        h3 {
          font-weight: 700;
        }
      }
      #bouton {
        display: flex;
        flex-direction: column;
      }
      button {
        width: 250px;
        margin: 5px 0;
      }
      #lien {
        width: 250px;
        .lien {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: 7px 0;
          height: 30px;
          img {
            width: 35px;
          }
          i {
            width: 35px;
            display: flex;
            justify-content: center;
            font-size: 18px;
            color: $color;
          }
          p {
            margin: 0;
          }
        }
      }
    }
    #timeline {
      display: flex;
      flex-direction: column;
      #formations,
      #experiencePro {
        min-width: 300px;
        .body {
          .timeline {
            width: 100%;
            margin: 20px 2vw 0;
            position: relative;
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
              padding: 1em 0;
              padding-left: 31px;
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
                height: 45px;
              }
            }
          }
        }
      }
    }
    #body-info {
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
          }
        }
      }
    }
  }
}
</style>