<template>
    <div>
        <Header />
        <div class="header">
            <div class="header_info">
                <h1 class="header_info_title">{{this.forum.titreForum}}</h1>
                <p class="header_info_text">{{this.forum.descriptionForum}}</p>
            </div>
            <div class="header_creation">
                <h3 class="header_creation_auteur">{{this.forum.auteurForum}}</h3>
                <h3 class="header_creation_auteur">{{this.forum.dateForum}}</h3>
            </div>
        </div>
        <div class="wrapper">
              <BtnAjoutSujet :nomForum = "this.forum.titreForum" />
        </div>
     
        
    </div>
</template>

<script>

import Header from '../../components/header';
import BtnAjoutSujet from '../../components/forum/btn-AjoutSujet';
export default {
    props : ["titreForum"],

    data(){
        return {
            forum : {}
        }
    },
    components :{
        Header,
        BtnAjoutSujet
    },
    methods : {
        async getOneForum(){
            const params = {
                titreForum : this.titreForum
            }
            const rep = await this.$http.get('/forum/:titreForum',{params});
            this.forum = rep.data.forum;
            console.log(this.forum.titreForum);
        }
    },
    created (){
        
        this.getOneForum();
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

    .wrapper{
        width: 90%;
        margin: 0 auto;

        
    }
</style>