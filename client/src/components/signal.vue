<template>
  <div class="signal" :id="['signal_' + this._id]">
      <p class="signal_text">Signaler post : {{this._id}}</p>
      <img src="../assets/cancel.svg" alt="close" class="close" @click="this.closeVisibility">
      <form @submit.prevent="createSignal">
          <select  id="select">
          <optgroup>
              <option> Ce post est raciste</option>
              <option >Ce post incite au harcélement</option>
              <option>Ce post ne correspond pas au sujet</option>
          </optgroup>
          </select>
          <input type="submit" value="Envoyer">
      </form>
  </div>
</template>

<script>

export default {
    props : ["content","_id"],
    methods : {
        closeVisibility(){
            const block = document.querySelector('.blocker')
            block.style.opacity = 0
            block.style.pointerEvents = 'none'
            block.style.visibility = 'none'
            document.querySelector(`#signal_${this._id}`).style.visibility = 'hidden'
        },
        async createSignal(){
            console.log('coucou')
            let motif = document.querySelector(`#signal_${this._id} select`).value
            let params = {
                motif : motif,
                postID : this._id,
                content : this.content
            }
            console.log(params)
            let rep = await this.$http.post('/forum/createSignal',params)
            console.log(rep)
        }
    }
}
</script>

<style lang="scss" scoped>
    .signal{
        position: fixed;
        top: 50%;
        left: 50%;
        visibility: hidden;
        background: white;
        padding: 1em 2em;
        z-index: 5;
        border: solid 2px blue;
        border-radius: 5px;
        transform: translate(-50%,-50%);
    }

    .close{
        width: 2em;
        height: auto;
        position: absolute;
        top: 0.5em;
        left: 0.5em;
        cursor: pointer;
    }

    .signal_text{
        padding: 2.5em;
    }

</style>