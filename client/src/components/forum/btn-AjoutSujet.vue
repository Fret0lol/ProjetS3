<template>
  <router-link :to="{name : 'addSujet' ,params:{titreForum : this.nomForum}}" class="btn-ajoutSujet">Nouveau Sujet</router-link>
</template>

<script>
  export default {
  props: ["nomForum"],
  }
</script>

<style lang="scss" scoped >
.btn-ajoutSujet{
    padding: 1em 1em;
    border: solid 3px #26F191;
    color: #26F191;
    border-radius: 5px;
    display: inline-block;
    margin: 1em 0;
}
</style>