<template>
<section>
      <Header />
  <div class="header">
            <div class="header_info">
                <h1 class="header_info_title">{{this.sujet.titreSujet}}</h1>
                <p class="header_info_text">{{this.sujet.descriptionSujet}}</p>
            </div>
            <div class="header_creation">
                <h3 class="header_creation_auteur">{{this.sujet.auteurSujet}}</h3>
                <h3 class="header_creation_auteur">{{this.sujet.dateSujet}}</h3>
            </div>
        </div>
</section>

</template>

<script>
import Header from '../../components/header';

export default {
    data(){
        return {
            sujet: {}
        }
    },
    components : {
        Header
    },
    props : ["idSujet"],
    methods : {
        async getOneSujet(){
            const params = {
                idSujet : this.idSujet
            };
            console.log(params)
            const rep = await this.$http.get('/forum/getSujet',{params});
            this.sujet = rep.data.sujet;
            console.log(this.sujet)
        }
    },

    created (){
        console.log(this.idSujet)
        this.getOneSujet()
    }
}
</script>

<style lang="scss" scoped>

.header{
        background: rgb(79, 79, 79);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 1em;
        padding: 1em;
        color: white;

        &_info{
            max-width: 500px;
        }
        
    }
</style>