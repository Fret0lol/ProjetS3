<template>
  <div id="form">
    <Header />
    <form > 
      <!-- @submit.prevent="registerUser" -->
        <div id="partOne">
          <div class="input">
            <p class="title">Intitulé Formation Long</p>
            <CustomInput
              class="input"
              type="text"
              label="Ex: Bac"
              v-model="register.IntFormCourt"
              icon="user"
              required
            />
          </div>
          </div>
          <div id="date">
            <p class="title">Date de la formation début</p>
            <input
              type="date"
              id="dateFormDeb"
              class="date input"
              v-model="register.dateFormDeb"
              required
            />
          </div>
          <div class="input">
            <p class="title">Nom de l'établissement</p>
            <CustomInput
              class="input"
              type="text"
              label="Ex : IUT Lannion"
              v-model="register.nomEtablissement"
              icon="user"
            />
          
          </div>
          <div class="input">
            <p class="title">Ville de l'établissement</p>
            <CustomInput
              class="input"
              type="text"
              label="Ex : IUT Lannion"
              v-model="register.nomEtablissement"
              icon="user"
            />
          
          </div>
        <div id="partTwo">
          <div class="input">
            <p class="title">Intitulé Formation Long</p>
            <CustomInput
              class="input"
              type="text"
              label="Ex: Bac"
              v-model="register.IntFormCourt"
              icon="user"
              required
            />
          </div>
          <div id="date">
            <p class="title">Date de la formation fin</p>
            <input
              type="date"
              id="dateFormFin"
              class="date input"
              v-model="register.dateFormFin"
              required
            />
          </div>
          <div id="nomUser">
            <p class="title">Pays de l'établissement</p>
            <CustomInput
              class="input"
              type="text"
              label="Nom d'utilisateur"
              v-model="register.nomUtilisateur"
              icon="user"
              required
            />
          </div>
          <div id="nomUser">
            <p class="title">Code Postal</p>
            <CustomInput
              class="input"
              type="text"
              label="Nom d'utilisateur"
              v-model="register.nomUtilisateur"
              icon="user"
              required
            />
          </div>
        </div>
      <button type="submit">S'enregistrer</button>
    </form>
  </div>
</template>
<script>
import Header from "../../components/header";
import CustomInput from "../../components/CustomInput"

export default {
  components: {
    Header,
    CustomInput
  },
  data() {
    return {
      register: {
        nomUtilisateur: "",
        dateFormFin: "",
        IntFormCourt: "",
        nomEtablissement: "",
        dateFormDeb: "",
      }
    }
  },
}
</script>