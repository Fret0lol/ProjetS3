<template>
  <section class='c'>
    <div class="blocker"></div>
    <Header />
    <div class="header">
      <div class="header_info">
        <h1 class="header_info_title">{{ this.sujet.titreSujet }}</h1>
        <p class="header_info_text">{{ this.sujet.descriptionSujet }}</p>
      </div>
      <div class="header_creation">
        <h3 class="header_creation_auteur">{{ this.sujet.auteurSujet }}</h3>
        <h3 class="header_creation_auteur">{{ this.sujet.dateSujet }}</h3>
      </div>
    </div>

    <div class="wrapper">
        <div class="btn" @click="this.toggleInput">Nouveau post </div>
        <div class="posts"  v-for="post in this.posts" v-bind:key="post._id">
                  <Signal :_id="post._id" :content="post.contenuCommentaire" />
                  <Post  :reponse="post.reponse" v-on:repondre="reponse($event)"  v-on:signaler="openSignal($event)" :isDelete="post.delete" :idPost="post._id" :_id="post.auteurCommentaire+ post._id" :nomUtilisateur="post.auteurCommentaire" :date="post.dateCommentaire" :commentaire="post.contenuCommentaire" :login="$data.auteur" />
        </div>
    </div>
    <div class="input">
     <textarea  placeholder="votre message ... " id="" cols="30" rows="5"></textarea>
        <input type="submit" value="Publier" @click="this.createPost">
        <input type="submit" value="Fermer" @click="this.closeInput">
    </div>
   
  </section>
  
</template>

<script>
import Post from '../../components/commentaire'
import Header from "../../components/header";
import VueJwtDecode from "vue-jwt-decode";
import swal from 'sweetalert';
import Signal from '../../components/signal'
export default {
  data() {
    return {
      sujet: {},
      posts: [],
      auteur : "",
      repValue : ""
    };
  },
  components: {
    Header,
    Post,
    Signal
  },
  props: ["idSujet"],
  methods: {

    openSignal(id){
      const block = document.querySelector('.blocker')
      block.style.opacity = 0.8
      block.style.pointerEvents = 'all'
      const signal = document.querySelector(`#signal_${id}`)
      signal.style.visibility = 'visible'
    },

    reponse(content){
      let res;
   
      if(content.length > 100){
        res = content.slice(0,100);
        res += " ...\n";
      }else{
        res = content;
      }
      this.repValue = res;
      this.toggleInput(); 
    },
    async getOneSujet() {
      const params = {
        idSujet: this.idSujet,
      };
      const rep = await this.$http.get("/forum/getSujet", { params });
      this.sujet = rep.data.sujet;
    },
    toggleInput(){
        console.log(this.repValue)
        const input = document.querySelector('.input');
        input.classList.add('input-visible')
    },
    closeInput(){
        const input = document.querySelector('.input');
        input.classList.remove('input-visible')
    }
    ,
  
   
    async createPost(){
      if(document.querySelector('textarea').value != ""){
         document.querySelector('textarea').classList.remove('error')
         const params = {
          auteurCommentaire : this.auteur,
          dateCommentaire : new Date(),
          sujetRef : this.idSujet,
          contenuCommentaire : document.querySelector('textarea').value,
          reponse : this.repValue ? this.repValue : ""
        }
        let response = await this.$http.post('/forum/createPost',{params});
        this.getAllPosts();
        this.closeInput();
        if(response.status == 404){
          swal('error','impossible de créer le post','error');
        }
      }else{
        document.querySelector('textarea').classList.add('error')
      }
       
    },
    getUserDetails() {
      
      let token = localStorage.getItem("jwt");
      if (!token) {
        this.auteur = null;
      } else {
        let decoded = VueJwtDecode.decode(token);
        this.auteur = decoded.nomUtilisateur;
      }
    },

    async getAllPosts(){
      let params = {
        sujetRef : this.idSujet
      }
      let rep = await this.$http.get('/forum/getPosts',{params})
      this.posts = rep.data.posts
    }
  },
  
  created() {
    this.getOneSujet();
    this.getUserDetails();
    this.getAllPosts();
    
  },
};
</script>

<style lang="scss" scoped>
.blocker{
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: 2;
    pointer-events: none;
}
.header {
  background: rgb(79, 79, 79);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1em;
  padding: 1em;
  color: white;

  &_info {
    max-width: 500px;
  }
}
.error{
  border: solid 2px red;
}
.wrapper{

    width: 85%;
    margin: 0 auto;
    max-width: 1000px;
    padding: 1em;

    .btn{
        padding: 1em 1.5em;
        color: white;
        background: #2692f1;
        cursor: pointer;
        border-radius: 5px;
    }
}

.input{
    position: fixed;
    bottom: 0;
    color: white;
    padding: 2em;
    background: #2692f1;
    width: 100%;
    transition: all .3s;
    visibility: hidden;

    &-visible{visibility: inherit;}
    textarea{
        width: 100%;
        height: 100%;
        padding: 0.5em;
    }


}
</style>
