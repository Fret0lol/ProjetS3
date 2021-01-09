<template>
  <div>
    <Header />
    <div class="body">
      <h1>Ajouter une nouvelle formation</h1>
      <CustomInput />
    </div>
    
  </div>
</template>
<script>
import Header from "../components/header"
import CustomInput from "../components/CustomInput"
export default {
  components: {
    CustomInput,
    Header
  },
  props: {
    update: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    }
  },
  mounted() {
    console.log(this.email)
    console.log(this.update)
  },
}
</script>
<style lang="scss" scoped>
  
</style>