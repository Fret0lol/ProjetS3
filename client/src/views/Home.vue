<template>
  <div id="app">
    <Header />
    <div id="homeFirstView">
      <div id="rightPart">
        <p>Les Anciens d'Abord</p>
      </div>
    </div>
    <section id="annuaire">
      <div class="title">
        <p>Annuaire</p>
        <div class="line"></div>
      </div>
      <div class="body">
        <CardUser v-for="user in this.users" :key="user.nom"
          :email="user.email"
          :nom="user.nom"
          :prenom="user.prenom"
          :statut="user.statut"
        />
      </div>

    </section>
    <section id="forum">
      <div class="title">
        <p>Forums</p>
        <div class="line"></div>
      </div>
        <div class="body">
          <CardForum v-for="forum in this.forums" :key="forum._id"
            :sujets="forum.listeSujets"
            :nomForum="forum.titreForum"
            :brief="forum.descriptionForum" />
        </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import Header from "../components/header";
import CardUser from "../components/CardUser";
import Footer from "../components/footer";
import CardForum from '../components/forum/CardForum';
export default {
  data() {
    return {
      users: [],
      forums : []
    };
  },
  components: {
    Header,
    CardForum,
    CardUser,
    Footer,
  },
  methods: {
    async getUser() {
      const params = {
        offset: 0,
        limit: 3,
        sort: "dateInscription:-1",
      };
      const info = await this.$http.get(`/user/users/params`, { params });
      this.users = info.data.rep;
    },


    async getForums(){
      const params = {
        limit : 3
      }

      const info = await this.$http.get('/forum/forumLimit',{params})
      console.log(info)
      this.forums = info.data.rep

    }
  },
  created() {
    this.getForums();
    this.getUser();
    
  },
};
</script>

<style lang="scss" scoped>
$color: #26f191;
$colorBlur: #26f19140;
* {
  font-family: Poppins;
}
#app {
  background: linear-gradient(0deg, #e2e2e2 50%, #ffffff 0, #ffffff 100%);
 
  #homeFirstView {
    height: 40vh;
    background-image: url("../assets/Rectangle_101.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: flex-end;
    color: white;
    #rightPart {
      background: $colorBlur;
      backdrop-filter: blur(10px);
      width: 50vw;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-weight: 800;
        font-size: 5vw;
        text-align: center;
      }
    }
  }
  section {
    margin: 4vh 5vw;
    .title {
      p {
        font-size: 3vh;
        font-weight: 700;
        margin: 0;
      }
      .line {
        width: 3vw;
        height: 0.75vh;
        background-color: $color;
      }
    }
    .body {
      margin: 7vh 0;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
