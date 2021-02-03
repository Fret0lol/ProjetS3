<template>
  <div>
    <!--  Lister forums    -->
    <Header />
    <div class="forums">
      <h2 class="forums_title">Forums</h2>
      <router-link :to="'/addForum'" class="btn-ajoutForum">Nouveau Forum</router-link>
   
      <div class="forums_table">
        <div class="forums_table_header">
          <li class="forums_table_header_cell">Forums</li>
          <li class="forums_table_header_cell">Type</li>
          <li class="forums_table_header_cell">Nb de sujets</li>
        </div>
     
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/header";
//import BtnAjoutForum from "../../components/forum/btn-AjoutForum";
export default {
  components: {
    Header,
    //BtnAjoutForum,
  },
};
</script>
<style lang="scss" scoped>
.forums {
  width: 80%;
  margin: 0 auto;
  max-width: 1300px;
  margin-top: 1em;


  &_table{
    background: red;
    width: 100%;
  }
}
</style>
