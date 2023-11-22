<template>
    <Header :link="'Home'" class="header">Photos</Header>

    <div class="photoGrid">
        <div v-for="photo in photos" :key="photo.id" class="relative">
            <img :src="photo.url" class="photo">
            <ion-icon class="delete-button" v-if="admin" @click="deletePhoto(photo.id)" :icon="removeCircleOutline"/>
        </div>
    </div>

    <div class="add-photo">
            +
        </div>
</template>

<script>
    import Header from '@/plugins/screens/components/header.vue'
    import { mapStores, mapState } from 'pinia'
    import { useMainStore } from '@/plugins/stores/store.js'
    import {IonIcon} from '@ionic/vue'
    import {removeCircleOutline} from 'ionicons/icons'

    export default {
        components: {
            Header,
            IonIcon,
        },

        computed:{
            ...mapStores(useMainStore),
            ...mapState(useMainStore, ['admin', 'photos']),
        },

        data(){
            return{
                removeCircleOutline,
            }
        },

        methods:{
            deletePhoto(index){
                var photoIndex = this.photos.findIndex(photo => photo.id == index)

                this.photos.splice(photoIndex, 1)
            }
        }
    }
</script>

<style lang="sass">
    body
        background-color: #1400FF
        margin: 0px

    .header
        position: sticky 
        top: 0

    .photoGrid
        display: grid 
        grid-template-columns: auto auto

    .photo
        width: 87% 
        padding: 20px 
        display: block

    .relative
        position: relative

    .delete-button
        padding-left: 25px 
        font-size: 40px 
        position: absolute
        top: 22px 
        z-index: 2

    .add-photo
        background-color: #FFFFFF 
        border-radius: 100% 
        height: 60px 
        width: 60px 
        font-size: 50px 
        font-weight: 600 
        text-align: center 
        line-height: 60px 
        margin: 25px 20px
        position: fixed
        bottom: 0
        right: 0
</style>