<template>
  <div class="container">
    <h3>Bienvenue !</h3>
    <form
      @submit.prevent="loginUser"
    >
    <div class="champ">
      <p>Email</p>
      <CustomInput type="email" label="Email" placeholder="Email" icon="at" v-model="login.email" required/>
      
    </div>
    <div class="champ">
      <p>Mot de passe</p>
      <CustomInput type="password" label="Mot de passe" placeholder="Mot de passe" icon="lock" v-model="login.password" required/>
    </div> 

      <p>
        Pas encore de compte ? <router-link to="/register"
          >S'enregistrer</router-link
        >
      </p>

      <!-- Sign in button -->
        <button type="submit">
          Se connecter
        </button>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert";
import CustomInput from "@/components/CustomInput"
export default {
  components: {
    CustomInput
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/user/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Connection réussie", "", "success");
          this.$router.replace("/");
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
      }
    },
  },
};
</script>
<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');

$color: #26F191;
* {
  padding: 0;
  margin: 0;
  font-family: Poppins;
}
.container {
  width: 400px;
  height: 88.5vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  h3 {
    color: $color;
    font-size: 8vw;
    font-weight: 700;
    line-height: 54px;
    text-align: center;
    height: 10%;
    @media screen and (min-width: 750px){
      font-size: 36px;
    }
  }
  form {
    height: 90%;
    margin-top: 7vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //align-content: center;
    @media screen and (min-height: 750px){
      height: 50%;
    }
    .champ {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      //justify-content: space-between;
      height: 7vh;
      margin: 0 auto;
      p {
      font-size: 18px;
      line-height: 27px;
      margin-bottom: 5px;
      }
      .input {
        display: flex;
        flex-direction: row;
        align-content: center;
        border: 2px solid $color;
        border-radius: 5px;
        width: 70vw;
        height: 50px;
        @media screen and (min-width: 750px){
          width: 400px;
        }
        
        i {
          color: $color;
          font-size: 18px;
          margin: auto 15px;
        }
        input {
          border: none;
          width: 100%;
          &:active,
          &:hover,
          &:focus{
            border: none;
            outline: none;
          }
        }
      }
    }
    p {
      a {
        color: $color;
      }
    }
    button {
      background-color: $color;
      height: 56px;
      font-size: 17px;
      border-radius: 5px;
      border: none;
      color: white;
    }
  }
}
</style>
