<template>
  <div id="app">
    <Header />
    <div id="info">
      <div id="card">
        <div id="photoProfil">
          <div v-if="!image" class="div-image">
            <input
              type="file"
              name="profile_pic"
              @change="onFileChange"
              class="btn-image"
            />
            <span
              ><i><font-awesome-icon icon="camera" /></i
            ></span>
          </div>
          <div v-else>
            <img :src="image" id="imgProfil" />
            <div class="div-image remove">
              <button @click="removeImage" class="btn-image">
                Remove image
              </button>
              <span>Supprimer</span>
            </div>
          </div>
        </div>
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
            <input
              type="text"
              v-model="user.linkedin"
              placeholder="https://www.linkedin.com/in/XXXXXXXXXXX"
            />
          </div>
          <div id="telephone" class="lien">
            <i><font-awesome-icon icon="phone" /></i>
            <input
              type="tel"
              v-model="user.numeroTelephone"
              id="tel"
              placeholder="+33 XXXXXXXXXX"
            />
          </div>
          <div id="mail" class="lien">
            <i><font-awesome-icon icon="envelope" /></i>
            <input
              type="tel"
              v-model="user.email"
              id="emailInput"
              placeholder="exemple@gmail.com"
            />
          </div>
        </div>
        <button @click="save()" class="button">Sauvegarder</button>
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
                <button class="button">Modifier</button>
              </li>
              <li>
                <router-link to="/addFormation" tag="button" class="button"
                  >Ajouter une expérience professionnelle</router-link
                >
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
                <router-link to="/editFormation" tag="button" class="button"
                  >Modifier</router-link
                >
              </li>
              <li>
                <router-link to="/addFormation" tag="button" class="button"
                  >Ajouter une formation</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import VueJwtDecode from "vue-jwt-decode";
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
      image: "",
      file: null,
    };
  },
  methods: {
    /* Méthodes pour affichage direct du fichier envoyé */
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.file = e.target.files[0];
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        reader = e.target.result;
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.image = "";
    },
    /* Méthode pour obtenir informations sur l'utilisateur via BDD 
       Affichage de l'image de profil
    */
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
    /*
      Méthode pour récupérer les formations de l'utilisateur
    */
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
    /*
      Méthode pour mettre le texte en couleur quand les champs ne sont pas correct
    */
    inputError(id) {
      document.querySelector(id).querySelector("input").style.borderColor =
        "red";
      document.querySelector(id).querySelector("input").style.color = "red";
    },

    /* Méthode pour envoyer les données modifiées par l'utilisateur
       et sa photo de profil si elle ne reste pas inchangée 
    */
    async save() {
      try {
        // Test Linkedin Correct
        if (
          this.user.linkedin !== "" &&
          !Constantes.formatLienLinkedIn.test(this.user.linkedin)
        ) {
          this.inputError("#linkedin");
          swal(
            "Champs incorrect",
            "Le champs 'Lien Linkedin' est incorrect",
            "error"
          );
          return 1;
        }
        // Test Numéro Téléphone Correct
        if (
          this.user.numeroTelephone !== "" &&
          !Constantes.formatNuméroTéléphone.test(this.user.numeroTelephone)
        ) {
          this.inputError("#telephone");
          swal(
            "Champs incorrect",
            "Le champs 'Numéro de téléphone' est incorrect",
            "error"
          );
          return 1;
        }
        if (
          this.user.email !== "" &&
          !Constantes.formatAdresseMél.test(this.user.email)
        ) {
          this.inputError("#mail");
          swal("Champs incorrect", "Le champs 'Email' est incorrect", "error");
          return 1;
        }
        await this.$http.put(`/user/` + this.nomUtilisateur, this.user);
        /* Envoie de l'image et enregistrement dans BDD de l'utilisateur */
        if (this.file != null) {
          let formData = new FormData();
          formData.append("", this.file, this.file.name);
          formData.append("nomUtilisateur", this.user.nomUtilisateur);
          await this.$http.post("/user/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }

        /* Redirection vers page de profil après enregistrement des changements */
        this.$router.replace(`/membre/` + this.nomUtilisateur);
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
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
        .div-image {
          background: $color;
          border-radius: 5px;
          color: #fff;
          font-size: 1em;
          font-weight: bold;
          margin: 0 auto; /*20px/16px 0*/
          overflow: hidden;
          padding: 10px; /*14px/16px*/
          position: relative;
          top: 220px;
          text-align: center;
          width: 120px;
          cursor: pointer;
          &:active,
          &:focus,
          &:hover {
            cursor: pointer;
          }
          .btn-image {
            position: absolute;
            top: 0;
            right: 0;
            margin: 0;
            padding: 0;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            filter: alpha(opacity=0);
            width: 148px;
            height: 46px;
            cursor: pointer;
          }
        }
        img,
        .imgProfil {
          width: 250px;
          height: 250px;
        }
        .remove {
          top: -30px;
        }
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
          img {
            width: 35px;
            //fill: #26f191;
          }
          i {
            width: 35px;
            display: flex;
            justify-content: center;
            font-size: 18px;
            color: $color;
          }
        }
        input {
          background: transparent;
          width: 215px;
          height: 30px;
          outline: none;
          border: 1px solid $color;
          border-radius: 3px;
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