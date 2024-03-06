<template>
	<Header :link="'Home'" class="header">Schedule</Header>

	<div class="switchContainer">
		<div @click="eventSwitch = false" :class="{'on' : !eventSwitch, 'off' : eventSwitch}" class="switch">Calendar</div>
		<router-link :to="{name: 'ScheduleAll'}">
			<div @click="eventSwitch = true" :class="{'on' : eventSwitch, 'off' : !eventSwitch}" class="switch">All events</div>
		</router-link>
	</div>

	<div class="dayContainer" style="overflow-x: scroll; white-space: nowrap;">
		<div class="day" v-for="date in uniqueDates" :key="date" @click="showEventsForDate(date)">
			<p>{{ formatDateAndDay(date).formattedDate }}</p>
			<p>{{ formatDateAndDay(date).dayOfWeek }}</p>
		</div>
	</div>

	<table style="border: black 1px solid; width: 100%; border-collapse: collapse">
		<tbody>
			<tr v-for="time in times" :key="time" style="height: 100px;">
				<td style="width: 10%; border: black 1px solid;">{{ formatTime(time) }}</td>
				<td :class="{ 'filled-cell': hasContent(time, 0) }" style="width: 25%; border: black 1px solid;">{{ getEventForTime(time, 0) }}</td>
				<td :class="{ 'filled-cell': hasContent(time, 1) }" style="width: 25%; border: black 1px solid;">{{ getEventForTime(time, 1) }}</td>
				<td :class="{ 'filled-cell': hasContent(time, 2) }" style="width: 25%; border: black 1px solid;">{{ getEventForTime(time, 2) }}</td>
				<td @click="moreThan4(time)" :class="{ 'filled-cell': hasContent(time, 3) }" style="width: 15%; border: black 1px solid; font-size: 40px; font-weight: 800; text-align: center">{{ hasContent(time, 3) ? '+' : '' }}</td>
			</tr>
		</tbody>
	</table>

</template>

<script>
	import Header from '@/plugins/screens/components/header.vue'
	import { mapStores, mapState } from 'pinia'
	import { useMainStore } from '@/plugins/stores/store.js'

	export default {
		components: {
			Header,
		},
		data() {
			return {
				eventSwitch: false,
				selectedDate: null,
				formattedSchedule: [],
			}
		},

		mounted() {
			if (this.schedule.length > 0) {
				this.selectedDate = this.schedule[0].date;
			}
		},

		computed: {
			...mapStores(useMainStore),
            ...mapState(useMainStore, ['schedule']),

			times() {
				const start = Math.min(...this.schedule.map(item => item.start))
				const end = Math.max(...this.schedule.map(item => item.end))
				const times = []

				for (let i = start; i <= end; i += 30) {
					times.push(i)
				}

				return times
			},

			uniqueDates() {
				return [...new Set(this.schedule.map(item => item.date.toISOString().split('T')[0]))];
			},
		},

		methods: {
			getEventForTime(time, column) {
				const events = this.schedule.filter(item => {
					return time >= item.start && time < item.end && this.isSameDay(item.date, this.selectedDate);
				});

				if (events.length > column) {
					return events[column].name;
				}

				return '';
			},

			formatTime(time) {
				const hours = Math.floor(time / 60);
				const minutes = time % 60;
				return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
			},

			showEventsForDate(date) {
				this.selectedDate = new Date(date);
			},

			isSameDay(date1, date2) {
				return (
					date1 &&
					date2 &&
					date1.getFullYear() === date2.getFullYear() &&
					date1.getMonth() === date2.getMonth() &&
					date1.getDate() === date2.getDate()
				);
			},

			hasContent(time, column = null) {
				const content = column !== null ? this.getEventForTime(time, column) : this.formatTime(time);
				return content.trim() !== '';
			},

			moreThan4(time){
				if(this.hasContent(time, 3)) window.location.href = '/schedule/all'
			},

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

	.dayActive
		padding: 1px
		color: black !important
		background-color: white !important
		font-size: 15px
		width: fit-content
		height: fit-content
		display: inline-block
		margin: 5px

		p
			margin: 2px 10px
	.filled-cell
		background-color: red
</style>