<template>
  <div class="login">
    <Header id="header" />
    <div class="body">
      <div class="login">
        <login />
        <Footer id="footer" />
      </div>
      <div class="img">
        <!-- <img src="../assets/Rectangle_101.png" alt=""> -->
      </div>
    </div>
  </div>
</template>
<script>
import login from "@/components/login";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  data() {
    return {
      responsive: false,
    };
  },
  components: {
    login,
    Header,
    Footer,
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.body {
  display: flex;
  justify-content: center;
  #footer {
    display: none;
    @media screen and (min-width: 750px) {
      display: flex;
    }
  }
  @media screen and (min-width: 750px) {
    display: grid;
    grid-template-columns: 55% 45%;
  }
  .img {
    display: none;
    background-image: url("../../assets/Rectangle_101.png");
    background-repeat: no-repeat;
    background-size: cover;

    @media screen and (min-width: 750px) {
      display: block;
    }
    &::before {
      background-color: rgba(38, 241, 145, 0.3);
    }
  }
}
</style>
