<template>
    <Header :link="'Home'">About</Header>
    <div v-if="admin">
        <p class="infoText">Tap to edit</p>
        <ion-textarea placeholder="cock" :auto-grow="true" v-model="editAboutText" class="aboutText" @ion-input="editStoreText()"/>
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
            ...mapState(useMainStore, ['aboutText', 'admin']),
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
    body
        background-color: #1400FF
        margin: 0px

    .aboutText
        font-size: 30px 
        color: white 
        text-transform: capitalize 
        padding-left: 10px
        padding-top: 10px
        --highlight-color-focused: none
        text-transform: capitalize

    .infoText
        margin-top: 10px 
        margin-bottom: -20px 
        font-size: 25px 
        margin-left: 10px
</style>