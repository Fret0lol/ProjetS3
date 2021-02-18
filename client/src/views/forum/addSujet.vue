  <template>
  <div class="container">
    <Header />
    <div class="wrapper">
      <h2 class="title">Nouveau sujet</h2>
      <form class="form" @submit.prevent="registerSujet">
        <label class="form_label">Titre :</label>
        <input type="text" class="form_input titre" name="titreForum" required />
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
          <!-- <span @click="resetImage" class="rese t_image">Reset image</span> -->
        </div>

        <input  type="submit" value="Publier sujet" />
        <!-- <router-link class="retour">Retour</router-link> -->
      </form>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import swal from 'sweetalert';
import Header from '../../components/header';

export default {
  components : {
    Header
  },
  props : ["titreForum"],
  data(){
    return {
      userLogin: "",
      forum : {},
      sujet : {
        titreSujet : "",
        dateSujet : "",
        descriptionSujet : "",
        statutSujet : "",
        illustrationSujet : "",
        forumSujet : "",
        auteurSujet : ""
      },
      };
  },
  methods : {
    async getOneForum(){
            const params = {
                titreForum : this.titreForum
            }
            const rep = await this.$http.get('/forum/myForum',{params});
            this.forum = rep.data.forum;    
            console.log(params.titreForum)        
        },


    async registerSujet(){
      
    
      let titreSujet = document.querySelector('.titre').value;
      let description = document.querySelector('.textarea').value;
      
      try{
        this.sujet.titreSujet = titreSujet;
        this.sujet.dateSujet = new Date();
        this.sujet.descriptionSujet = description;
        this.sujet.statutSujet = "actif";
        this.sujet.illustrationSujet = "image.png";
        this.sujet.auteurSujet = this.userLogin;
        this.sujet.forumSujet = this.forum;
        let response = await this.$http.post("/forum/addSujet",this.sujet);
        if(response.status == 201){
          swal("Success","Vous venez de créer votre sujet :) ");
        }
        
        // a finir
      }catch(err){
        console.log(err);
      }

    },

    getUserDetails(){
      let token = localStorage.getItem('jwt');
      if(!token){
        this.userLogin = null;
      }else{
        let decoded = VueJwtDecode.decode(token);
        this.userLogin = decoded.nomUtilisateur;
      }
    }

  },


  created(){
    this.getOneForum();
    this.getUserDetails();
  }

}
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
