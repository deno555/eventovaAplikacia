<template>
    <Header :link="'Home'" class="header">About</Header>
    <div v-if="admin">
        <p class="infoText">Tap to edit</p>
        <ion-textarea placeholder="placeholder" :auto-grow="true" v-model="editAboutText" class="aboutText" @ion-input="editStoreText()"/>
    </div>

    <div v-else class="aboutText">{{ this.editAboutText }}</div>

</template>

<script>
    import Header from '@/plugins/screens/components/header.vue'
    import { mapStores, mapState } from 'pinia'
    import { useMainStore } from '@/plugins/stores/store.js'
    import { IonTextarea, IonButton } from '@ionic/vue'

    export default {
        components: {
            Header,
            IonTextarea,
            IonButton
        },

        computed:{
            ...mapStores(useMainStore),
            ...mapState(useMainStore, ['admin']),
        },
        
        data(){
            return {
                editAboutText: localStorage.getItem('aboutText'),
            }
        },

        methods:{
            editStoreText(){
                this.store.editAboutText(this.editAboutText)            
            },
        },

        setup(){
            const store = useMainStore()
            return {store}
        }
    }
</script>

<style lang="sass">
    .header
        position: sticky 
        top: 0

    .aboutText
        font-size: 30px 
        color: white 
        text-transform: capitalize 
        padding-left: 21px
        padding-top: 18px
        --highlight-color-focused: none
        text-transform: capitalize

    .infoText
        margin-top: 10px 
        margin-bottom: -20px 
        font-size: 25px 
        margin-left: 10px
</style>