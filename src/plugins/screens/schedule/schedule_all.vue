<template>
	<Header :link="'Home'" class="header">Schedule</Header>

	<div class="switchContainer">
		<router-link :to="{name: 'Schedule'}">
			<div @click="eventSwitch = false" :class="{'on' : !eventSwitch, 'off' : eventSwitch}" class="switch">Calendar</div>
		</router-link>
		<div @click="eventSwitch = true" :class="{'on' : eventSwitch, 'off' : !eventSwitch}" class="switch">All events</div>
	</div>

	<div v-for="event in schedule" :key="event.id" class="notif">
		<div>
			<div class="notif-title">{{ event.name }}</div>
			<div class="desc">{{ formatDateAndDay(event.date).formattedDate }}</div>
			<div class="time">{{ formatTime(event.start) + ' - ' + formatTime(event.end) }}</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/plugins/screens/components/header.vue'

	import { useMainStore } from '@/plugins/stores/store.js'
	import axios from 'axios';

	export default {
		components: {
			Header,
		},

		data() {
			return {
				eventSwitch: true,
				selectedDate: null,
				schedule: JSON.parse(localStorage.getItem('schedule')) ? JSON.parse(localStorage.getItem('schedule')) : [],
			}
		},

		setup(){
			const store = useMainStore()
			return {store}
		},

		mounted() {
			if (this.schedule.length > 0) {
				this.selectedDate = this.schedule[0].date;
			}

			this.store.refreshSchedule()

		},
		
		computed: {

			uniqueDates() {
				return [...new Set(this.schedule.map(item => item.date.toISOString().split('T')[0]))];
			},
		},

		methods:{
			formatDateAndDay(inputDate) {
				const dateObject = new Date(inputDate);

				const day = dateObject.getDate().toString().padStart(2, '0');
				const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
				const year = dateObject.getFullYear();

				const formattedDate = `${day}.${month}.${year}`;

				const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				const dayIndex = dateObject.getDay();
				const dayOfWeek = daysOfWeek[dayIndex];

				return {
					formattedDate,
					dayOfWeek
				};
			},
			showEventsForDate(date) {
				this.selectedDate = new Date(date);
			},
			formatTime(time) {
				const hours = Math.floor(time / 60);
				const minutes = time % 60;
				return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
			},
			createEvent(){
				axios.post('http://localhost:3001/events',{
					"name":"cock2"
				})
			}
		}
	}
</script>

<style lang="sass">
	a
		color: white

	.header
		position: sticky 
		top: 0
	
	.switchContainer
		font-size: 20px
		text-align: center
		color: white
	
	.switch
		padding: 15px 0 
		display: inline-block
		width: 50%

	.on
		background: rgb(12,0,153)
		background: linear-gradient(135deg, rgba(12,0,153,1) 0%, rgba(20,0,255,1) 79%)

	.off
		background: rgb(0,58,102)
		background: linear-gradient(135deg, rgba(0,58,102,1) 0%, rgba(0,116,204,1) 79%)

	.dayContainer
		height: 75px
		background: rgb(0,24,204)
		background: linear-gradient(315deg, rgba(0,24,204,1) 0%, rgba(0,9,74,1) 75%)

	.day
		margin: 10px
		padding: 5px
		color: white
		background-color: black
		font-size: 15px
		width: fit-content
		height: fit-content
		display: inline-block
		border-radius: 5px

		p
			margin: 2px 10px

	.dayActive
		margin: 10px
		padding: 5px
		color: black
		background-color: white
		font-size: 15px
		width: fit-content
		height: fit-content
		display: inline-block
		border-radius: 5px

		p
			margin: 2px 10px
			
	.filled-cell
		background-color: #1400FF
		border-bottom: #1400FF 1px solid !important
		border-right: white 1px solid

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
</style>