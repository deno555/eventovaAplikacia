<template>
    <Header :link="'Notifications'" class="header">Details</Header>
    
    <div v-for="notification in notifs.filter(detail => detail.id == this.$route.params.id)">
        <div class="detail-header">
            <div class="detail-title">{{ notification.title }}</div>
            <div class="detail-time">{{ notification.time }}</div>
        </div>
        <div class="detail-desc">{{ notification.description }}</div>
    </div>
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
            ...mapState(useMainStore, ['notifications']),
        },
    }
</script>

<style lang="sass">
    .header
        position: sticky 
        top: 0

    .detail-header
        display: inline-block 
        border-bottom: black 2px solid 
        width: 100%

        .detail-title
            font-size: 30px 
            padding-top: 20px
            --padding-top: 10px
            padding-left: 20px 
            --padding-start: 20px
            width: 80%
            --highlight-color-focused: none
            text-transform: capitalize
            color: white

        .detail-time
            font-size: 20px
            padding-right: 13px
            color: white 
            float: right 
            padding-bottom: 10px

    .detail-desc
        font-size: 25px 
        color: white 
        padding: 10px 20px 0
        --padding-top: 10px
        --padding-start: 20px
        --padding-end: 20px
        --highlight-color-focused: none
</style>