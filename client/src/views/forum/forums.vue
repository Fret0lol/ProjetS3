<template>
  <div>
    <!--  Lister forums    -->
    <Header />
    <div class="forums">
      <h2 class="forums_title">Forums</h2>
      <BtnAjoutForum />   
      <div class="forums_table">
        <div class="forums_table_header">
          <li class="forums_table_header_cell">Forums</li>
          <li class="forums_table_header_cell">Type</li>
          <li class="forums_table_header_cell">Auteur</li>
          <li class="forums_table_header_cell">Nb sujet</li>
        </div>
        <div class="forums_table_body">
          <div class="wrapper"   v-for="forum in forums" :key="forum.titreForum">
            <div class="forums_table_body_row" @click="redirect(forum.titreForum)">
              <li class="forums_table_body_row_cell forums_table_body_row_cell-titre">{{forum.titreForum}}</li>
              <li class="forums_table_body_row_cell">{{forum.typeForum}}</li>
              <li class="forums_table_body_row_cell">{{forum.auteurForum}}</li>
              <li class="forums_table_body_row_cell">{{forum.listeSujets.length}}</li>
            </div>
            <BtnDelete :titreForum="forum.titreForum" v-if="forum.auteurForum === userName" class="btn-delete" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/header";
import BtnAjoutForum from "../../components/forum/btn-AjoutForum";
import BtnDelete from "../../components/forum/btn-DeleteForum";
export default {
  components: {
    Header,
    BtnAjoutForum,
    BtnDelete
  },
  props:[ "userName"],
  data(){
    return {
      forums : {},
      forum : {}
    }
  },
  methods : {
    redirect(titreForum){
      this.$router.push(`/forum/${titreForum}`)
    },

    async getForums(){
      const rep = await this.$http.get('/forum');
      this.forums = rep.data.forums;
    }
  },
  created(){
    this.getForums();
    console.log(this.userName);
  }
};
</script>
<style lang="scss" scoped>
.forums {
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
      border: 2px black solid;
      padding: 1em;
           display: grid;
      grid-template-columns: repeat(4,1fr);
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
      grid-template-columns: repeat(4,1fr);
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
