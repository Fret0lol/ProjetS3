<template>
<div class="containe">
      <Header/>
      <h1 class="title_signal" style="padding: 2em">Signalements : </h1>
  <div class="signalements" >
     <Signal v-for="signal in this.$data.signalements" v-bind:key="signal._id" :content="signal.content" :motif="signal.motif" :_id="signal.postID" :idSignal="signal._id" />
  </div>
</div>

</template>


<script>

import Signal from '../components/signal_admin'
import Header from '../components/header.vue'
export default {
    components : {
        Header,
        Signal,
        
    },

    data() {
        return {
            signalements : []
        }
    },

    methods : {
        async getSignalements(){
            let rep = await this.$http.get('/forum/admin_signal')
            console.log(rep)
            this.$data.signalements = rep.data.signalements
        },
    },

    created(){
        this.getSignalements()
    }
}
</script>

