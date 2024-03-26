<template>
	<div class="home-header">
		<img class="logo" src="https://images-ext-1.discordapp.net/external/mfkb-IbLvGU-dQrdxBVYfMDPakR0-YaMl-LLm1HtBU0/https/mosaic.fxtwitter.com/jpeg/1771976260295516602/GJdS-UMWYAAoi8J/GJdS-37WEAAswNQ?format=webp&width=915&height=670">
		<div class="title">
			<p>{{ allEvents.find(event => event?.id == id)?.name }}</p>
		</div>
	</div>

	<div class="selects">
		<div class="selects__row">
			<router-link :to="{name: ''}">
				<div class="selects__row__button" style="margin-right: 17px;">
					<p>Discussion</p>
					<ion-icon :icon="ChatBubbles"/>
				</div>
			</router-link>

			<router-link :to="{name: 'Schedule'}">
				<div class="selects__row__button">
					<p>Schedule</p>
					<ion-icon :icon="Calendar"/>
				</div>
			</router-link>
		</div>

		<div class="selects__row">
			<router-link :to="{name: 'Notifications'}">
				<div class="selects__row__button" style="margin-right: 17px;">
					<p>Notifications</p>
					<ion-icon :icon="Bell"/>
				</div>
			</router-link>

			<router-link :to="{name: 'About'}">
				<div class="selects__row__button">
					<p>About The Event</p>
				</div>
			</router-link>
		</div>

		<div class="selects__row">
			<router-link :to="{name: 'Feedback'}">
				<div class="selects__row__button" style="margin-right: 17px;">
					<p>Feedback</p>
					<ion-icon :icon="Speaker"/>
				</div>
			</router-link>

			<router-link :to="{name: 'Photos'}">
				<div class="selects__row__button">
					<p>Photos</p>
					<ion-icon :icon="Photo"/>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import {cogOutline} from 'ionicons/icons'
	import {IonIcon} from '@ionic/vue'
	import { mapStores, mapState } from 'pinia'
	import { useMainStore } from '@/plugins/stores/store.js'
	import axios from 'axios'
	import ChatBubbles from '@/plugins/assets/chatbubbles-outline.svg'
	import Calendar from '@/plugins/assets/calendar-outline.svg'
	import Bell from '@/plugins/assets/notifications.svg'
	import Speaker from '@/plugins/assets/vector.svg'
	import Photo from '@/plugins/assets/vector-1.svg'

	export default {
		components:{
			IonIcon
		},

		data() {
			return {
				cogOutline,
				Calendar,
				ChatBubbles,
				Bell,
				Speaker,
				Photo,
				allEvents: []
			}
		},

		computed:{
			...mapStores(useMainStore),
			...mapState(useMainStore, ['admin', 'id']),
		},

		setup(){
			const store = useMainStore()
			return {store}
		},

		mounted() {
			this.store.refresh()
			axios.get('https://letny-projekt-be.onrender.com/events').then((response) => {
				this.allEvents = response.data
			});
		}
	}
</script>

<style lang="sass">
	a
		text-decoration: none
		color: inherit

	.home-header
		background: rgb(0,24,204)
		background: linear-gradient(-45deg, rgba(0,24,204,1) 0%, rgba(0,9,74,1) 79%)
		height: 145px

	.title
		display: inline-block
		background: rgb(20,0,255) 
		background: linear-gradient(315deg, rgba(20,0,255,1) 0%, rgba(12,0,153,1) 79%) 
		width: 205px
		height: 88px
		color: white
		font-size: 30px
		border-radius: 25px
		text-align: center
		position: absolute
		top: 22px
		right: 22px
	
	.logo
		background-color: #1400FF 
		width: 88px 
		height: 88px 
		top: 22px
		left: 22px
		position: absolute

	.selects
		padding-left: 22px
		padding-right: 22px 
		padding-top: 39px
		display: flex
		flex-direction: column
		align-items: center

		&__row
			padding-bottom: 36px
			display: flex
			justify-content: center

			&__button
				height: 150px 
				width: 150px
				background: rgb(20,0,255)
				background: linear-gradient(315deg, rgba(20,0,255,1) 0%, rgba(12,0,153,1) 79%)
				border-radius: 25px 
				display: flex
				flex-direction: column
				align-items: center
				justify-content: center
				text-align: center

				p
					font-size: 25px 
					color: white 
					padding-top: 10px

				ion-icon
					font-size: 64px 
					margin-top: -20px

</style>