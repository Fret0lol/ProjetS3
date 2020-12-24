<template>
  <div id="register">
    <form @submit.prevent="registerUser">
      <div class="align">
        <div id="partOne">
          <div class="sex">
            <p class="title">Civilité</p>
            <div class="input">
              <div class="inputSex">
                <input
                  type="radio"
                  id="sexeH"
                  name="sexe"
                  value="H"
                  v-model="register.civilite"
                  required
                />
                <label for="sexeH">Monsieur</label>
              </div>
              <div class="inputSex">
                <input
                  type="radio"
                  id="sexeF"
                  name="sexe"
                  value="F"
                  v-model="register.civilite"
                  required
                />
                <label for="sexeF">Madame</label>
              </div>
            </div>
          </div>
          <div class="input">
            <p class="title">Prénom</p>
            <CustomInput
              class="input"
              type="text"
              label="Prénom"
              v-model="register.prenom"
              icon="user"
              required
            />
          </div>
          <div class="input">
            <p class="title">Nom</p>
            <CustomInput
              class="input"
              type="text"
              label="Nom"
              v-model="register.nom"
              icon="user"
            />
          </div>
          <div id="date">
            <p class="title">Date de naissance</p>
            <input
              type="date"
              id="dateNaissance"
              class="date input"
              v-model="register.dateNaissance"
              required
            />
          </div>
        </div>
        <div id="partTwo">
          <div id="nomUser">
            <p class="title">Nom d'utilisateur</p>
            <CustomInput
              class="input"
              type="text"
              label="Nom d'utilisateur"
              v-model="register.nomUtilisateur"
              icon="user"
              required
            />
          </div>
          <div id="email">
            <p class="title">Email</p>
            <CustomInput
              class="input"
              type="email"
              label="Email"
              v-model="register.email"
              icon="at"
              required
            />
          </div>
          <div id="password">
            <p class="title">Mot de passe</p>
            <CustomInput
              class="input"
              type="password"
              label="Mot de passe"
              v-model="register.password"
              icon="lock"
              required
            />
          </div>
        </div>
      </div>

      <div id="bottom">
        <div id="lien">
          <p>
            Déjà un compte ? <router-link to="/login">Se connecter</router-link>
          </p>
          <p>
            Je ne suis pas
            <a href="" @click="this.$emit('retour', 0)">
              {{ this.statutUser }}</a
            >
          </p>
        </div>
        <button type="submit">S'enregistrer</button>
      </div>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert";
import CustomInput from "@/components/CustomInput";
export default {
  components: {
    CustomInput,
  },
  props: ["statutUser"],
  data() {
    return {
      register: {
        civilite: "",
        prenom: "",
        nom: "",
        dateNaissance: "",
        statut: "",
        nomUtilisateur: "",
        email: "",
        password: "",
      },
      desktop: false
    };
  },
  methods: {
    async registerUser() {
      try {
        this.register.statut = this.statutUser;
        let response = await this.$http.post("/user/register", this.register);
        let token = response.data.token;
        if (token) {
          this.$router.push("/");
          swal(
            "Success",
            "Inscription Réussie \n Veuillez attendre d'être validé par l'administrateur",
            "success"
          );
        } else {
          swal("Error", "Inscription échouée", "Error");
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    },
  },
  mounted() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyyMax = today.getFullYear() - 15;
    var yyyyMin = today.getFullYear() - 100;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyyMax + "-" + mm + "-" + dd;
    document.querySelector("#dateNaissance").setAttribute("max", today);
    today = yyyyMin + "-" + mm + "-" + dd;
    document.querySelector("#dateNaissance").setAttribute("min", today);
  },
};
</script>
<style lang="scss" scoped>
$color: #26f191;
#register {
  user-select: none;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;

    .align {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: center;
    }

    .title {
      font-size: 2vh;
      font-weight: 700;
    }
    .input {
      min-width: 300px;
      width: 30vw;
    }
    .sex {
      .input {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
      }
    }
    .date {
      padding: 0.9vh 2.2rem 0.9vh 1.2rem;
      outline: none;
      border: 2px solid $color;
      border-radius: 5px;
      margin-bottom: 0.5rem;
    }
    #partTwo {
      margin-top: 7.5vh;
    }
    #bottom {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;
      #lien {
        margin-top: 2vh;
        a {
          color: $color;
        }
      }
      button {
        background-color: $color;
        font-size: 1.75vh;
        padding: 1.5vh;
        border-radius: 5px;
        border: none;
        color: white;
        width: 200px;
      }
    }
  }
}
</style>
