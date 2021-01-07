<template>
  <div id="app">
    <div class="flag-wrapper">
      <span class="flag">
        {{ this.formationComplet }} ( {{ this.formationCourt }} )
      </span>
      <span class="time-wrapper"><span class="time">{{ new Date(this.dateEntree).toLocaleDateString() }} - {{ new Date(this.dateSortie).toLocaleDateString() }}</span></span>
    </div>
    <div class="desc">{{ infoSupp }}</div>
    <div class="localisation">
      <span class="localisation-wrapper"><span class="loca">{{ this.nomEtablissement }} - {{ this.villeEtablissement }} </span></span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["formationComplet", "formationCourt", "dateEntree", "dateSortie", "infoSupp", "nomEtablissement", "villeEtablissement"]
}
</script>
<style lang="scss" scoped>
@import "@/Variable.scss";
  #app {
    position: relative;
    width: 100%;
    
    //float: right;
    &::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    .flag-wrapper {
      position: relative;
      display: inline-block;
      text-align: center;
      .flag {
        position: relative;
        display: inline;
        background: transparent;
        padding: 6px 10px;
        border-radius: 5px;
        font-weight: 600;
        text-align: left;
        box-shadow: 0 14px 50px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.22);
        &::before {
          position: absolute;
          top: 50%;
          left: -44px;
          content: ' ';
          display: block;
          width: 24px;
          height: 24px;
          margin-top: -10px;
          background: white;
          border-radius: 50%;
          border: 6px solid $color;
          z-index: 10;
        }
        &::after {
          content: "";
          position: absolute;
          right: 100%;
          top: 50%;
          height: 0;
          width: 0;
          margin-top: -6px;
          border: solid transparent;
          border-left-color: grey;
          border-width: 8px;
          pointer-events: none;
        }
      }
      .time-wrapper {
        display: inline;
        line-height: 1em;
        font-size: 0.66666em;
        color: white;
        vertical-align: middle; 
        .time {
          display: inline-block;
          padding: 4px 6px;
          background: $color;
        }
      }
    }
    .desc {
      margin: 1.4vh 0 1vh 1.75vw;
      font-size: 1.75vh;
      font-style: italic;
      line-height: 2vh;
    }
    .localisation {
      .localisation-wrapper {
        display: inline;
        line-height: 1em;
        font-size: 0.8em;
        color: white;
        vertical-align: middle;
        .loca {
          display: inline-block;
          padding: 4px 6px;
          background: $color;
        }
      }
    }
  }
</style>