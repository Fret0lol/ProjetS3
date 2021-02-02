<template>
    <div class="commentaire">
        <div class="commentaire_header">
            <div class="commentaire_header_info">
                <img :src="require(`@/assets/${{imageProfil}}`)" class="commentaire_header_info_photo">
                <div class="commentaire_header_info_content">
                    <h2 class="commentaire_header_info_content_name"> {{ this.nomUtilisateur }} </h2>
                    <p class="commentaire_header_info_content_date"> {{ this.date }} </p>
                </div>
            </div>
            <img src="menu.png" class="commentaire_header_menu" @click="changeVisibility">
        </div>
        <p class="commentaire_content">
            {{ this.commentaire }}
        </p>
        <img src="src/assets/arrow.png" class="commentaire_rep"/>
        <div class="menu">
            <ul class="menu_list">
                <li class="menu_list_item">Répondre</li>
                <li class="menu_list_item">Modifier</li>
                <li class="menu_list_item">Supprimer</li>
                <li class="menu_list_item">Signaler</li>
            </ul>
            <img src="iwwa_delete.png" alt="" class="menu_close" @click="changeVisibility">
        </div>
    </div>
</template>
<script>
export default {
    props : ["nomUtilisateur","date","imageProfil","commentaire"],

    methods: {
        changeVisibility(){
            const menu = document.querySelector('.menu');
            menu.classList.toggle('menu-expanded');
        }
    }
}
</script>
<style lang="scss" scoped>
.commentaire{
    position: relative;
    font-size: 0.9em;
    width: 100%;
    max-width: 1000px;
    border: solid 1px #B0B0B0;
    background: white;
    border-radius:5px;
    padding: 1em 1em 4em 1em;

    
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
    top: 1em;
    right: 1em;
    border-radius: 5px;
    border: solid 3px #26F191;
    padding: 3em 1em 1em 1em;
    width: 150px;
    background: white;
    visibility: hidden;

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

    &-extended{
        visibility: visible;
    }
}
</style>