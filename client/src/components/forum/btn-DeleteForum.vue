<template>
    <div class="btn" @click="deleteForum(titreForum)">
          <font-awesome-icon icon="times" />
    </div>
</template>

<script>
import swal from 'sweetalert';

export default {
    props: ["titreForum"],
    methods: {
        async deleteForum(titreForum){
            try{
                console.log("cc")
                 await this.$http.post("/forum/deleteForum",{titreForum});
                 swal(`Supression de ${titreForum}`, "", "success");
                
            }catch(err){
                swal("Error",`erreur ${err}`,"error")
            }
            
            
        }


    }
}


</script>

<style lang="scss" scoped>
    .btn{
        cursor: pointer;
    }
</style>