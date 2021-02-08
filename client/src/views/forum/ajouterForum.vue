<template>
  <div class="container">
    <Header />
    <div class="wrapper">
      <h2 class="title">Nouveau forum</h2>
      <form class="form" @submit.prevent="registerForum">
        <label class="form_label">Titre :</label>
        <input type="text" class="form_input titre" name="titreForum" required />
        <label class="form_label">Type :</label>
        <select name="type" class="form_input type">
          <option value="publique">Publique</option>
          <option value="privée">Privée</option>
        </select>
        <label class="form_label">Description :</label>
        <textarea
          required
          name="description"
          class="form_input textarea"
          cols="30"
          rows="10"
        ></textarea>
        <label class="form_label">Ajouter une photo : </label>
        <div class="inputImage_wrapper">
          <input type="file" class="form_input input_image" />
          <span @click="resetImage" class="reset_image">Reset image</span>
        </div>

        <input  type="submit" value="Publier forum" />
        <!-- <router-link class="retour">Retour</router-link> -->
      </form>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

import VueJwtDecode from "vue-jwt-decode";
import Header from "../../components/header";
export default {
  props: ["nomUtilisateur"],
  components: {
    Header,
  },
  data() {
    return {
      userLogin: "",
      forum: {
        nomForum: "",
        typeForum: "",
        descriptionForum: "",
        illustrationForum: "",
        dateForum: "",
        auteurForum: "",
      },
    };
  },
  methods: {
    resetImage() {
      let inputImage = document.querySelector(".input_image");
      inputImage.value = "";
    },
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
        console.log(this.userLogin)
      }
    },
  
  
    
    async registerForum(){
      
      let titre = document.querySelector('.titre').value;
      let description = document.querySelector('.textarea').value;
      let type = document.querySelector('.type').value;
    
      try{
        this.forum.nomForum = titre;
        this.forum.dateForum = new Date();
        this.forum.auteurForum = this.userLogin;
        this.forum.illustrationForum = "/client/src/assets/pattern.png";
        this.forum.descriptionForum = description;
        this.forum.typeForum = type;
        console.log(this.forum)
        let response = await this.$http.post("/forum/addForum",this.forum);
    
        if(response.status == 201){
          this.$router.push("/forum");
          swal("Success","Création forum réussie" ,"success");
        }else if(response.status == 400){
          swal("Error","Ce forum existe déja ! :(")
        }
        else{
          swal("Error","La création du forum a échoué ");
        }
      }catch(err){
       console.log(err);
      }
    }
    ,
  
  },
  created() {
    this.getUserDetails();
  }
};
</script>














<style lang="scss" scoped>
.container {
  width: 80%;
  max-width: 1300px;
}

.form {
  display: flex;
  flex-direction: column;

  &_input {
    border: solid 1px #26f191;
    border-radius: 5px;
    padding: 0.5em;
  }
  .textarea {
    resize: none;
  }

  .inputImage_wrapper {
    .reset_image {
      cursor: pointer;
      display: inline-block;
      margin-left: 1em;
      color: #2692f1;
    }
  }

  &_input:focus {
    outline: none;
    border: solid 2px #2692f1;
    border-radius: 5px;
  }
}
</style>
