<template>
    <div class="commentaire"  :id="[this._id + '_commentaire']" :class="(this.isDelete)?'commentaire-delete':'notdelete'" >
        <div class="commentaire_header">
            <div class="commentaire_header_info">
                <img src="../assets/Logo.png" class="commentaire_header_info_photo">
                <div class="commentaire_header_info_content">
                    <h2 class="commentaire_header_info_content_name"> {{ this.nomUtilisateur }} </h2>
                    <p class=" commentaire_header_info_content_date"> {{ this.date }} </p>
                </div>
            </div>
            <img src="../assets/menu.png" class="commentaire_header_menu" @click="this.openMenu"  v-if="this.isDelete === false">
        </div>
         <p class="commentaire_content commentaire-rep"  v-if="!this.isMofidied">
            {{ this.reponse }}
        </p>
        <p class="commentaire_content"  v-if="!this.isMofidied">
            {{ this.commentaire }}
        </p>

        <div class="modif-wrapper" v-if="this.isMofidied">
             <textarea class="textarea-modif"  v-model="this.comVal"> </textarea>
             <input type="submit" value="valider" @click="this.updatePost">
             <input type="submit" value="annuler" @click="this.closeModified">
        </div>
       
        <img src="../assets/arrow.png" class="commentaire_rep" v-if="this.isDelete === false" v-on:click="$emit('repondre', commentaire)"/>
        <div class="menu menu-close" :id="[this._id + '_menu']">
            <ul class="menu_list">
                <li class="menu_list_item" v-on:click="$emit('repondre', commentaire)" @click="this.closeMenu" >Répondre</li>
                <li class="menu_list_item" v-if="this.login == this.nomUtilisateur" @click="modified">Modifier</li>
                <li class="menu_list_item"  v-if="this.login == this.nomUtilisateur" @click="this.delete">Supprimer</li>
                <li class="menu_list_item">Signaler</li>
            </ul>
            <img  alt="" src="../assets/menu.png" class="menu_close" @click="this.closeMenu">
        </div>
    </div>
</template>
<script>
export default {
    props : ["reponse","isDelete","idPost" ,"_id","nomUtilisateur","date","imageProfil","commentaire","login"],
    data() {
        return {
            isMofidied : false,
            comVal : "",
        }
    },
    methods: {
        openMenu(){
            const menu = document.querySelector(`#${this._id}_menu`); 
            menu.classList.add('menu-expanded');
            menu.classList.remove('menu-close');
        },  
        closeMenu(){
            const menu = document.querySelector(`#${this._id}_menu`);
            menu.classList.remove('menu-expanded');
            menu.classList.add('menu-close');
        },
        async delete(){
            this.closeMenu();
            const params = {
                id : this.idPost,
                
            }
             await this.$http.put('/forum/deletePost',params);
            location.reload();
        },

        modified(){
            this.isMofidied = true;   
            this.comVal = document.querySelector(`#${this._id}_commentaire > p`).innerText; 
            this.closeMenu();        
        },
        closeModified(){
            this.isMofidied = false;
        },
        
        async updatePost(){
            const params = {
                id : this.idPost,
                contenuCommentaire : document.querySelector('.textarea-modif').value
            }
            await this.$http.put('/forum/updatePost',{params}); 
            this.closeModified();
            this.$router.go()
        }
       
    }
}
</script>
<style lang="scss" scoped>

.textarea-modif{
    width: 100%;
    height: 100%;
    padding: 1em;
}
.commentaire{
    position: relative;
    font-size: 0.9em;
    width: 100%;
    max-width: 1000px;
    border: solid 1px #B0B0B0;
    background: white;
    border-radius:5px;
    padding: 1em 1em 4em 1em;
    margin: 1.5em 0;
    
    &-rep{
        font-style: italic;
    }
    &-delete{
    background: rgb(252, 152, 152)  !important;
    }
    &_header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1em;
        &_info{
            display: flex;
            &_photo{
                border-radius: 50%;
                width: 4em;
                height: 4em;
                object-fit: cover;
            }
            &_content{
                margin: 0 1em;
            }
        }
    }

    &_content{
        padding-left: 5.5em;
    }
    &_rep{
        position: absolute;
        right: 1em;
        bottom: 1em;
    }
}

.menu{
    position: absolute;
    top: 0em;
    right: 1em;
    border-radius: 5px;
    border: solid 3px #26F191;
    padding: 3em 1em 1em 1em;
    width: 150px;
    background: white;

    &_list{
        &_item{
            margin: 0.5em 0;
            cursor: pointer;
        }
    }
    &_close{
        position: absolute;
        top: 1em;
        right: 1em;
        cursor: pointer;
    }
    &-close{
        visibility: hidden;
    }
    &-extended{
        visibility: visible;
    }
}
</style>