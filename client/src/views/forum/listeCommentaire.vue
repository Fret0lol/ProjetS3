<template>
  <section class='c'>
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
    </div>
    <div class="input">
        <h3>Nouveau post</h3>
     <textarea placeholder="votre message ... " id="" cols="30" rows="5"></textarea>
        <input type="submit" value="Publier">
        <input type="submit" value="Fermer" @click="this.closeInput">
    </div>
  </section>
</template>

<script>
import Header from "../../components/header";

export default {
  data() {
    return {
      sujet: {},
    };
  },
  components: {
    Header,
  },
  props: ["idSujet"],
  methods: {
    async getOneSujet() {
      const params = {
        idSujet: this.idSujet,
      };
      const rep = await this.$http.get("/forum/getSujet", { params });
      this.sujet = rep.data.sujet;
    },
    toggleInput(){
        const input = document.querySelector('.input');
        input.classList.add('input-visible')
    },
    closeInput(){
        const input = document.querySelector('.input');
        input.classList.remove('input-visible')
    }
  },
  
  created() {
    console.log(this.idSujet);
    this.getOneSujet();
  },
};
</script>

<style lang="scss" scoped>

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
    position: absolute;
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
