<template>
    <Header :link="'Feedback'" class="header">Create Question</Header>

    <div class="create-header">
        <ion-textarea :auto-grow="true" v-model="questionTitle" class="crate-feedback-title" placeholder="Add Question"/>
    </div>
    
    <ion-button :class="{'activeButton' : type == 'rating', 'notActiveButton' : type !== 'rating'}" @click="this.type = 'rating'">Rating</ion-button>
    <ion-button :class="{'activeButton' : type == 'text', 'notActiveButton' : type !== 'text'}" @click="this.type = 'text'">Question</ion-button>
    
    <router-link :to="{name: 'Feedback'}">
        <div class="create-question-button" @click="addQuestion()">
            <div class="tick"/>
        </div>
    </router-link>
</template>

<script>
	import axios from 'axios'
    import Header from '@/plugins/screens/components/header.vue'
    import { IonTextarea, IonButton } from '@ionic/vue'
    import { mapStores, mapState } from 'pinia'
    import { useMainStore } from '@/plugins/stores/store.js'

    export default {
        components: {
            Header,
            IonTextarea,
            IonButton
        },

        data(){
            return{
                questionTitle: '',
                type: 'rating',
            }
        },

        computed:{
            ...mapStores(useMainStore),
            ...mapState(useMainStore, ['feedback', 'id']),
        },

        methods:{
            // addQuestion(){
            //     this.feedback.push({
            //         question: this.questionTitle,
            //         type: this.type,
            //         id: this.feedback.length,
            //         value: 0
            //     })
            // },
            addQuestion(){
                axios.post(`https://letny-projekt-be.onrender.com/events/${this.id}/details/feedback`, {
					feedback: {
						question: this.questionTitle,
						type: this.type,
						id: localStorage.getItem('notifications') ? JSON.parse(localStorage.getItem('notifications'))?.length + 1 : 1,
                        value: 0
					}
				}).then(console.log("added feedback"))
                const temp = JSON.parse(localStorage.getItem('feedback'))
                temp.push({
                    question: this.questionTitle,
                    type: this.type,
                    value: 0
                })

                localStorage.setItem('feedback', JSON.stringify(temp))
            },
        }
    }
</script>

<style lang="sass">
    .header
        position: sticky 
        top: 0

    ion-textarea
        padding-left: 0px

    .create-header
        display: inline-block 
        border-bottom: black 1px solid 
        width: 100%

        .crate-feedback-title
            font-size: 30px 
            padding-top: 20px
            --padding-top: 10px
            padding-left: 20px 
            --padding-start: 20px
            width: 80%
            --highlight-color-focused: none
            text-transform: capitalize

    .create-question-button
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

    .activeButton
        --background: red

    .notActiveButton
        --background: white
    
    ion-button
        --color: black
</style>