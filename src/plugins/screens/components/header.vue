<template>
    <ion-header>
        <ion-toolbar>
            <ion-title class="header">
                <router-link :to="{name: link}">
                    <div class="back-arrow"/>
                </router-link>
                <div style="margin-right: 20px;">
                    <slot>cock</slot>
                </div>
            </ion-title>
        </ion-toolbar>
    </ion-header>
</template>

<script>
    import {IonHeader, IonToolbar, IonTitle} from '@ionic/vue';

    export default {
        props:{
            link:{
                type: String,
                required: false
            }
        },

        components: {
            IonHeader,
            IonToolbar,
            IonTitle
        },

        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="sass">
    .header
        background-color: #D9D9D9
        height: 75px
        font-size: 40px
        text-align: center
        color: black
        // position: fixed

    .back-arrow
        border: solid black 
        border-width: 0px 0px 3px 3px 
        float: left 
        width: 20px 
        height: 20px 
        transform: rotate(45deg)
        margin-left: 5px
        margin-top: 10px
</style>