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
     
        <!-- table -->
          <div class="sujets_table">
        <div class="sujets_table_header">
          <li class="sujets_table_header_cell">Sujet</li>
          <li class="sujets_table_header_cell">Type</li>
          <li class="sujets_table_header_cell">Auteur</li>
        </div>
        <div class="sujets_table_body">
          <div class="wrapper"   v-for="sujet in listeSujets" :key="sujet._id" @click="redirect(sujet._id)">
            <div class="sujets_table_body_row">
              <li class="sujets_table_body_row_cell forums_table_body_row_cell-titre">{{sujet.titreSujet}}</li>
              <li class="sujets_table_body_row_cell">{{sujet.statutSujet}}</li>
              <li class="sujets_table_body_row_cell">{{sujet.auteurSujet}}</li>
            </div>
          </div>
        </div>
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
            forum : {},
            listeSujets : {},
            idForum : ""
        }
    },
    components :{
        Header,
        BtnAjoutSujet
    },
    methods : {


        async getAllSujets(){
            const params = {
                titreForum : this.titreForum
            }
            const rep = await this.$http.get('/forum/listeSujet',{params})
            this.forum = rep.data.content.forum;
            this.listeSujets = rep.data.content.sujets;
        },
        redirect(titreSujet){
            this.$router.push(this.$route.fullPath + '/'+ titreSujet)
         }


    },
    created (){
        this.getAllSujets();
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

    .sujets {
  width: 80%;
  margin: 0 auto;
  max-width: 1300px;
  margin-top: 1em;


  &_table{
    background: white;
    
    margin-top: 1em;
    
    width: 100%;
    /// table header
    &_header{
        width: 90%;
        margin: 0 auto;
      border: 2px black solid;
      padding: 1em;
           display: grid;
      grid-template-columns: repeat(3,1fr);
      &_cell{
        display: inline-block;
        list-style: none;
      }
    }

  /// table content
  &_body{

    .wrapper{
      position: relative;
      .btn-delete{
        position: absolute;
        left: -50px;
        top: 10%;
      }
    }
     
    &_row{
      position: relative;
      transition: all .3s ease;
      &:hover{
        opacity: 1;
        background-color: #2692f1  !important;
        cursor: pointer;
      }
      display: grid;
      grid-template-columns: repeat(3,1fr);
      padding: 1em;
      &:nth-child(odd){
        background: rgb(196, 196, 196);
      }
      &:nth-child(even){
        background: rgb(231, 231, 231);
      }

     
      &_cell{
        display: inline-block;
        list-style: none;
        &-titre{
          width: 100px;
        }
      }
    }
  }
  }
}
</style>