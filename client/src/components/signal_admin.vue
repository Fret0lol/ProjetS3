<template>
  <div class="signal_admin">
      <h4 class="motif"> {{this.motif}}</h4>
      <p class="content">{{this.content}}</p>
        <div class="valider signal_btn" @click="this.valideSignal">Valider</div>
      <div class="supprimer signal_btn" @click="this.deleteSignal">Supprimer</div>
    
  </div>
</template>

<script>
export default {
    props : ['content','_id','motif','idSignal'],

    methods : {
        async deleteSignal(){
            console.log(this.idSignal)
             await this.$http.post('/forum/deleteSignal', {id : this.idSignal})
            document.location.reload()
        },

        async valideSignal(){
              const params = {
                id : this._id,
                
            }
             await this.$http.put('/forum/deletePost',params);
             this.deleteSignal()
        }

    }
}
</script>

<style lang="scss" scoped>
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

    .valider{
        background: rgb(81, 81, 223);
        border: 1.5px solid rgb(81, 81, 223);
        color: white;
        margin-right : 1em;
    }
</style>