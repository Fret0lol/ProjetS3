<template>
  <div class="signal_admin">
      <div class="signal_container">
           <h4 class="motif"> <span>Motif : </span> {{this.motif}}</h4>
      <p class="content"> <span>Contenu :</span> {{this.content}}</p>
      <p class="content"> <span>Sujet :</span> {{this.nom_forum}} > {{this.nom_sujet}}</p>
      <p class="content" v-if="this.postInfo.reponse !== ''"> <span>Réponse au post :</span> {{this.postInfo.reponse}}</p>
      <p class="content"> <span>Auteur :</span> {{this.postInfo.auteurCommentaire}}</p>
      <p class="content"> <span>Date :</span> {{this.postInfo.dateCommentaire}}</p>
      </div>
     
        <div class="valider signal_btn" @click="this.valideSignal">Valider</div>
      <div class="supprimer signal_btn" @click="this.deleteSignal">Supprimer</div>
    
  </div>
</template>

<script>
export default {
    props : ['content','_id','motif','idSignal'],
    data(){
        return {
            postInfo : {},
            nom_forum : '',
            nom_sujet : ''
        }
    },
    methods : {
        async redirectSujet(){
             const idForum = await this.getIdForum()
             let params = {
                 _id : idForum
             }
             let rep_forum = await this.$http.get('/forum/forumID',{params})
             let nom_forum = rep_forum.data.forum.titreForum
             this.nom_forum = nom_forum
        },
        async getIdForum(){
            let params = {
                idSujet : this.postInfo.sujetRef
            }
            let rep_sujet = await this.$http.get('/forum/getSujet',{params})
            this.nom_sujet = rep_sujet.data.sujet.titreSujet
            return rep_sujet.data.sujet.forumSujet
        },
        async deleteSignal(){
             await this.$http.post('/forum/deleteSignal', {id : this.idSignal})
            document.location.reload()
        },

        async valideSignal(){
              const params = {
                id : this._id,
                
            }
             await this.$http.put('/forum/deletePost',params);
             this.deleteSignal()
        },

        async GetPostInfo(){
            let params = {
                _id : this._id
            }
            let rep = await this.$http.get('/forum/getOnePost',{params})
            this.postInfo = rep.data
        },
    },
    async mounted(){
           await this.GetPostInfo()
            console.log(this._id)
            await this.redirectSujet()
        }
}
</script>

<style lang="scss" scoped>
    .signal_container{
        padding: 1em;
        margin-bottom: 1em;
        background: #eeeeee;

        span{
            font-weight: bold;
        }
    }
    .signal_admin{
        padding: 1em;
        width: 80%;
        margin: 1em auto;
        border: solid 3px black;
        border-radius: 5px;
    }

    .signal_btn{
        display: inline-block;
        padding: 1em;
        border-radius: 5px;
        cursor: pointer;

        &:hover{
            opacity: 0.8;
        }
    }

    .supprimer{
        color: rgb(81, 81, 223);
        border: 1.5px solid rgb(81, 81, 223);
    }

    .redirect{
        margin-left: 1em;
    }

    .valider{
        background: rgb(81, 81, 223);
        border: 1.5px solid rgb(81, 81, 223);
        color: white;
        margin-right : 1em;
    }
</style>