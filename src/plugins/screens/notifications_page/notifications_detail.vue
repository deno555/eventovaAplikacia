<template>
    <Header :link="'Notifications'">Details</Header>
    
    <div v-for="notification in notifications.filter(detail => detail.id == this.$route.params.id)">
        <div class="detail-header">
            <div class="detail-title">{{ notification.title }}</div>
            <div class="detail-time">{{ notification.time }}</div>
        </div>
        <div class="detail-desc">{{ notification.desc }}</div>
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

        computed:{
            ...mapStores(useMainStore),
            ...mapState(useMainStore, ['notifications']),
        },
    }
</script>

<style lang="sass">
    body
        background-color: #1400FF
        margin: 0px

    .detail-header
        display: inline-block 
        border-bottom: black 1px solid 
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
        text-transform: capitalize
</style>