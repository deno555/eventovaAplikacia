<template>
    <Header :link="'Home'" class="header">Feedback</Header>

    <div class="question" v-for="question in feedback" :key="question.id">
        <p class="questionTitle">{{ question.question }}</p>
        <ion-textarea class="textRating" v-if="question.type == 'text'" v-model="question.value"/>
        <div class="starRating" v-else-if="question.type == 'rating'">
            <ion-button fill="clear" v-for="index in 5" @click="starRate(index, question)">
                <ion-icon v-if="question.value < index + 1" :icon="starOutline" class="icon"/>
                <ion-icon v-else :icon="star" class="icon"/>
            </ion-button>
        </div>
    </div>

    <router-link :to="{name: 'Feedback-Create'}">
        <div class="add-feedback-btn" v-if="admin">
            +
        </div>
    </router-link>
</template>

<script>
    import Header from '@/plugins/screens/components/header.vue'
    import { mapStores, mapState } from 'pinia'
    import { useMainStore } from '@/plugins/stores/store.js'
    import { IonTextarea, IonButton, IonIcon } from '@ionic/vue'
    import { starOutline, star } from 'ionicons/icons'

    export default {
        components: {
            Header,
            IonTextarea,
            IonButton,
            IonIcon,
        },

        computed:{
            ...mapStores(useMainStore),
            ...mapState(useMainStore, ['admin', 'feedback']),
        },

        data(){
            return{
                starOutline,
                star,
            }
        },
        
        methods:{
            starRate(index, question){
                // console.log(index)
                // console.log(question.value)
                if(question.value == index + 1) question.value = index
                else question.value = index + 1
            },
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

    .question
        border: 1px solid black 
        padding-left: 10px

    .questionTitle
        font-size: 30px 
        color: white 
        margin-bottom: 0

    .icon
        color: white 
        font-size: 30px

    .textRating
        font-size: 25px
        padding: 0 
        text-transform: capitalize 
        --highlight-color-focused: none

    .starRating
        padding-top: 20px
        padding-bottom: 20px

    .add-feedback-btn
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
        z-index: 2
</style>