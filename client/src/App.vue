<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss">
@import "@/Variable.scss";
.title {
  p {
    font-size: 3vh;
    font-weight: 700;
    margin: 0.5vh 0;
  }
  .line {
    height: 0.75vh;
    width: 5vw;
    background-color: $color;
  }
}
.button {
  background-color: $color;
  border: none;
  border-radius: 5px;
  padding: 10px 22px;
  color: $color2;
  font-weight: 700;
}
</style>
