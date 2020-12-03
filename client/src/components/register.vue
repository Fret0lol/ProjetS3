<template>
  <div id="register">
    <h3>Chouette un nouveau copain !</h3>
    <form @submit.prevent="registerUser">
      <div class="sex">
        <h5>Civilité</h5>
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
      <div id="prenomEtNom">
        <div class="input">
          <h5>Prénom</h5>
          <CustomInput type="text" label="Prénom" v-model="register.prenom" icon="user" required/>
        </div>
        <div class="input">
          <h5>Nom</h5>
          <CustomInput type="text" label="Nom" v-model="register.nom" icon="user"/>
        </div>
      </div>
      
      
      
      <input
        type="date"
        id="dateNaissance"
        class="date"
        v-model="register.dateNaissance"
        required
      /><!--
      <select v-model="register.statut">
        <option disabled value="">Choisissez</option>
        <option>Etudiant</option>
        <option>Professeur</option>
        <option>Entreprise</option>
        <option>Administrateur</option>
      </select>-->
      <CustomInput type="text" label="Nom d'utilisateur" v-model="register.nomUtilisateur" icon="user" required/>

      
      <CustomInput type="email" label="Email" v-model="register.email" icon="at" required />
      <CustomInput type="password" label="Mot de passe" v-model="register.password" icon="lock" required/>
      <p>
        Déjà un compte ?<router-link to="/login"
          >Se connecter</router-link
        > 
      </p>
        <!-- Sign in button -->
          <button type="submit">
            S'enregistrer
          </button>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert";
import CustomInput from "@/components/CustomInput"
export default {
  components: {
    CustomInput
  },
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
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post("/user/register", this.register);
        console.log(response);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$router.push("/");
          swal("Success", "Registration Was successful", "success");
        } else {
          swal("Error", "Something Went Wrong", "Error");
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
};
</script>
<style lang="scss" scoped>
$color: #26F191;
#register {
  min-width: 400px;
  //width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3em;
  h3 {
    color: $color;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2em;
  }
  form {
    width: 500px;
    .sex {
      .input {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
      }
    }
    #prenomEtNom {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .input {
        width: 50%;
      }
    }
    button {
      background-color: $color;
      height: 56px;
      font-size: 17px;
      border-radius: 5px;
      border: none;
      color: white;
    }
    .date {
      min-width: 10vw;
      
      padding: 0.9vh 2.2rem 0.9vh 1.2rem;
      outline: none;
      border: 2px solid $color;
      border-radius: 5px;
    }
  }
}
</style>
