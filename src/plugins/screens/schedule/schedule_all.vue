<template>
	<Header :link="'Home'" class="header">Schedule</Header>

	<div class="switchContainer">
		<router-link :to="{name: 'Schedule'}">
			<div @click="eventSwitch = false" :class="{'on' : !eventSwitch, 'off' : eventSwitch}" class="switch">Calendar</div>
		</router-link>
		<div @click="eventSwitch = true" :class="{'on' : eventSwitch, 'off' : !eventSwitch}" class="switch">All events</div>
	</div>

	<div class="dayContainer" style="overflow-x: scroll; white-space: nowrap;">
		<div class="day" v-for="date in uniqueDates" :key="date" @click="showEventsForDate(date)">
			<p>{{ formatDateAndDay(date).formattedDate }}</p>
			<p>{{ formatDateAndDay(date).dayOfWeek }}</p>
		</div>
	</div>

	<div v-for="day in schedule" :key="day">
		<div v-if="JSON.stringify(selectedDate) == JSON.stringify(day.date)" style="background-color: cyan; border: 1px solid black; padding: 0 10px">
			<div style="font-size: 20px;">{{ day.name }}</div>
			<div style="font-size: 20px;">{{ formatTime(day.start) + " - " + formatTime(day.end) }}</div>
		</div>
	</div>

	<div>
		<button @click="createEvent">cock</button>
		{{ test }}
	</div>
</template>

<script>
	import Header from '@/plugins/screens/components/header.vue'

	import { mapStores, mapState } from 'pinia'
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
				test: []
			}
		},

		mounted() {
			if (this.schedule.length > 0) {
				this.selectedDate = this.schedule[0].date;
			}

			axios.get('http://localhost:3001/events/1/data').then((response) =>
			{
				this.test = response.data
			})
		},
		
		computed: {
			...mapStores(useMainStore),
			...mapState(useMainStore, ['schedule']),

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
	body
		background-color: #1400FF
		margin: 0px

	.header
		position: sticky 
		top: 0
	
	.switchContainer
		font-size: 20px
		text-align: center
		color: white
		position: sticky 
		top: 0

		a
			color: white	

	
	.switch
		padding: 15px 0 
		display: inline-block 
		width: 50%

	.on
		background-color: #4F4F4F

	.off
		background-color: #757575

	.dayContainer
		height: 55px
		background-color: #D9D9D9

	.day
		padding: 1px
		color: white
		background-color: black
		font-size: 15px
		width: fit-content
		height: fit-content
		display: inline-block
		margin: 5px

		p
			margin: 2px 10px
</style>