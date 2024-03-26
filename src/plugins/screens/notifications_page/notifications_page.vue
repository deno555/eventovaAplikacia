<template>
    <Header :link="'Home'" class="header">Notifications</Header>

    <div v-for="notification in notifs" :key="notification.id" class="notif">
        <router-link :to="{name: 'Notifications-Detail', params: {id: notification.id ? notification.id : 1}}">
            <div>
                <div class="notif-title">{{ notification.title }}</div>
                <div class="desc">{{ notification.description }}</div>
                <div class="time">{{ notification.time }}</div>
            </div>
        </router-link>
    </div>
    
    <router-link :to="{name: 'Notifications-Create'}">
        <div class="add-notif-btn" v-if="admin">
            +
        </div>
    </router-link>
</template>

<script>
    import Header from '@/plugins/screens/components/header.vue'
    import { mapStores, mapState } from 'pinia'
    import { useMainStore } from '@/plugins/stores/store.js'

    export default {

        components: {
            Header,
        },

        data(){
            return{
                notifs: JSON.parse(localStorage.getItem('notifications'))
            }
        },

        computed:{
            ...mapStores(useMainStore),
            ...mapState(useMainStore, ['admin']),
        },

        setup(){
            const store = useMainStore()
            return {store}
        },

        mounted(){
            this.store.refreshNotifications()
        }
    }
</script>

<style lang="sass">
    body
        background-color: #1400FF
        margin: 0px

    .notif
        border-bottom: solid black 2px 
        padding-top: 15px
        background: rgb(12,0,153)
        background: linear-gradient(90deg, rgba(12,0,153,1) 0%, rgba(20,0,255,1) 75%)

    .notif-title
        font-size: 25px
        padding-left: 10px
        color: white
        text-transform: capitalize

    .desc
        font-size: 15px 
        color: white 
        padding-left: 10px
        text-decoration: none
        width: 97% 
        word-break: break-all

    .time
        font-size: 15px 
        color: white
        text-align: right 
        padding: 10px 7px
        text-decoration: none

    .add-notif-btn
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

    a
        text-decoration: none
        color: inherit
</style>