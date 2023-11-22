<template>
    <div class="home-header">
        <img src="@/plugins/assets/placeholder.png" height="117">
        
        <div v-if="admin" class="grey admin-settings">
            <ion-icon :icon="cogOutline"/>
            <p>Event Setting</p>
        </div>

    </div>

    <div class="grey event-name">
        <p>Event Name</p>
    </div>

    <div class="selects">
        <div class="grid">
            <div class="grey button">
                <p>Discussion</p>
            </div>
            
            <div class="grey button">
                <router-link :to="{name: 'Schedule'}">
                    <p>Schedule</p>
                </router-link>
            </div>
            
            <div class="grey button">
                <router-link :to="{name: 'Notifications'}">
                    <p>Notification</p>
                </router-link>
            </div>
            
            <div class="grey button">
                <router-link :to="{name: 'About'}">
                    <p class="event">About the event</p>
                </router-link>
            </div>
            
            <div class="grey button">
                <router-link :to="{name: 'Feedback'}">
                    <p>Feedback</p>
                </router-link>
            </div>
            
            <div class="grey button">
                <router-link :to="{name: 'Photos'}">
                    <p>Photos</p>
                </router-link>
            </div>
        </div>
    </div>
    </template>

<script>
    import {cogOutline} from 'ionicons/icons'
    import {IonIcon} from '@ionic/vue'
    import { mapStores, mapState } from 'pinia'
    import { useMainStore } from '@/plugins/stores/store.js'

    export default {
        components:{
            IonIcon
        },

        data() {
            return {
                cogOutline,
            }
        },

        computed:{
            ...mapStores(useMainStore),
            ...mapState(useMainStore, ['admin']),
        },
    }
</script>

<style lang="sass">
    body
        background-color: #1400FF
        margin: 0px

    a
        text-decoration: none
        color: inherit


    .grey
        background-color: #D9D9D9

    .home-header
        display: flex 
        justify-content: center
        padding-top: 37px

        img
            padding-right: 10%

        .admin-settings
            width: 117px
            height: 117px

            ion-icon
                font-size: 95px 
                padding-left: 11px

            p
                margin-top: -10px 
                margin-left: 15px
                font-size: 15px
    
    .event-name
        width: 170px
        height: 67px
        margin: 63px auto 0

        p
            font-size: 24px 
            text-align: center 
            padding: 12% 0
    
    .selects
        display: flex
        justify-content: center 
        align-items: center 
        padding-top: 52px
    
    .grid
        display: grid
        grid-template-columns: auto auto auto
        
        .button
            width: 90px
            height: 90px
            font-size: 18px
            flex-wrap: wrap
            margin: 15px

            p
                text-align: center
                padding: 20% 0
            
            .event
                padding: 10% 0
</style>