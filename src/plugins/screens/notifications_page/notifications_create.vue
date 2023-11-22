<template>
    <Header :link="'Notifications'" class="header">Create Notification</Header>

    <div class="create-header">
        <ion-textarea :auto-grow="true" v-model="addTitle" class="create-title" placeholder="Add Notification Title"/>
        <div class="create-time">{{ addTime }}</div>
    </div>
    
    <ion-textarea :auto-grow="true" v-model="addDesc" class="create-desc" placeholder="Add Notification Description"/>
    <router-link :to="{name: 'Notifications'}">
        <div class="create-button" @click="addNotif()">
            <div class="tick"/>
        </div>
    </router-link>
</template>

<script>
    import Header from '@/plugins/screens/components/header.vue'
    import { IonTextarea } from '@ionic/vue'
    import { mapStores, mapState } from 'pinia'
    import { useMainStore } from '@/plugins/stores/store.js'

    export default {
        components: {
            Header,
            IonTextarea
        },

        data(){
            return{
                add: true,
                addTitle: '',
                addDesc: '',
                addTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
        },

        computed:{
            ...mapStores(useMainStore),
            ...mapState(useMainStore, ['notifications']),
        },

        methods:{
            addNotif(){
                this.notifications.push({
                    title: this.addTitle,
                    desc: this.addDesc,
                    time: this.addTime,
                    id: this.notifications.length
                })
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

    ion-textarea
        padding-left: 0px

    .create-header
        display: inline-block 
        border-bottom: black 1px solid 
        width: 100%

        .create-title
            font-size: 30px 
            padding-top: 20px
            --padding-top: 10px
            padding-left: 20px 
            --padding-start: 20px
            width: 80%
            --highlight-color-focused: none
            text-transform: capitalize

        .create-time
            font-size: 20px
            padding-right: 13px
            color: white 
            float: right 
            padding-bottom: 10px

    .create-desc
        font-size: 25px 
        color: white 
        padding: 10px 20px 0
        --padding-top: 10px
        --padding-start: 20px
        --padding-end: 20px
        --highlight-color-focused: none
        text-transform: capitalize
        width: 90%

    .create-button
        background-color: #FFFFFF 
        border-radius: 100% 
        height: 60px 
        width: 60px 
        font-size: 50px 
        font-weight: 600 
        text-align: center 
        line-height: 60px 
        position: fixed 
        bottom: 0 
        right: 0 
        margin: 25px 20px

        .tick
            border: black solid 
            border-width: 0px 3px 3px 0 
            margin-left: 25px 
            margin-top: 17px 
            width: 10px 
            height: 20px 
            transform: rotate(45deg)

</style>