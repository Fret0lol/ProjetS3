<template>
  <div id="card">
    <div>
      <div id="photoProfil">
        <!-- <img :src="'http://localhost:4000/images/userImage/'+this.image" alt="" v-if="this.image != null" class="img"/>
        <img src="../assets/Logo.png" alt="" v-else class="img"/>-->
      </div>
      <div id="infoProfil">
        <p id="name">{{ this.nomForum }}</p>
        <p>{{ this.sujets.length }} sujets</p>
        <p class="brief">{{ this.brief}} </p>
      </div>
    </div>
    <div class="button">
      <button @click="redirect">Voir le forum</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sujets", "nomForum", "brief"],
  data() {
    return {
      forum: {},
    };
  },
  methods: {
  async getOneForum(){
            const params = {
                titreForum : this.titreForum
            }
            const rep = await this.$http.get('/forum/myForum',{params});
            this.forum = rep.data.forum;    
            console.log(params.titreForum)        
        },
    redirect() {
      this.$router.push(`/forum/${this.nomForum}`);
    },
  },
  created() {
    this.user = this.getOneForum();
  },
};
</script>
<style lang="scss" scoped>
$color: #26f192;


.brief{
    position: absolute;
    left: 1em;
    font-size: 1em !important;
    z-index: 2;
    opacity: 0;
    transition: all 0.3s ease-out;
}
#card {
    position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  min-width: 350px;
  width: 400px;
  height: 200px;
  border-radius: 5px;
  border: 3px solid white;
  background-color: $color;
  color: white;



  box-shadow: 0px 100px 80px rgba(119, 119, 119, 0.07), 0px 41.7776px 33.4221px rgba(119, 119, 119, 0.0503198), 0px 22.3363px 17.869px rgba(119, 119, 119, 0.0417275), 0px 12.5216px 10.0172px rgba(119, 119, 119, 0.035), 0px 6.6501px 5.32008px rgba(119, 119, 119, 0.0282725), 0px 2.76726px 2.21381px rgba(119, 119, 119, 0.0196802);
    &::after{
        content: '';
        background: rgb(48, 48, 48);
        opacity: 0.8;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        opacity: 0;
        pointer-events: none;
        transition: all  0.3s ease-in;
    }
    &:hover{
        .brief{
            opacity: 1;
        }
    }
    &:hover::after{
        opacity: 0.8;
    }

    div {
    display: grid;
    grid-template-columns: 40% 60%;
    #photoProfil {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 130px;
      width: 130px;
      padding: 0 10px;
      
      .img {
        height: 140px;
        width: 140px;
        object-fit: scale-down;
        border-radius: 7px;
      }
    }
    #infoProfil {
      display: flex;
      flex-direction: column; 
      justify-content: flex-start;
      
      #name {
        font-size: 140%;
        font-weight: 700;
      }
      p {
        font-size: 120%;
      }
    }
  }
  .button {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    padding: 0 2vw;
    
    button {
      background: white;
      border: 2px solid white;
      border-radius: 5px;
      width: 150px;
      padding: 0.75vh 1vw;
      color: $color;
      font-weight: 600;
      z-index: 2;
    }
  }
}
</style>
