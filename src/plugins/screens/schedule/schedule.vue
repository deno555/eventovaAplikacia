<template>
	<div style="position: sticky; top: 0">
		<Header :link="'Home'" class="header">Schedule</Header>

		<div class="switchContainer">
			<div @click="eventSwitch = false" :class="{'on' : !eventSwitch, 'off' : eventSwitch}" class="switch">Calendar</div>
			<router-link :to="{name: 'ScheduleAll'}">
				<div @click="eventSwitch = true" :class="{'on' : eventSwitch, 'off' : !eventSwitch}" class="switch">All events</div>
			</router-link>
		</div>

		<div class="dayContainer" style="overflow-x: scroll; white-space: nowrap;">
			<div :class="{ 'dayActive': selectedDate == date, 'day': selectedDate != date }" v-for="date in uniqueDates" :key="date" @click="showEventsForDate(date)">
				<p>{{ formatDateDDMMYYYY(date) }}</p>
				<p>{{ getDayOfWeek(date) }}</p>
			</div>
		</div>
	</div>

	<table style="border: white 1px solid; width: 100%; border-collapse: collapse; color: white">
		<tbody>
			<tr v-for="time in times" :key="time" style="height: 100px">
				<td style="width: 10%; border: white 1px solid;">{{ formatTime(time) }}</td>
				<td :class="{ 'filled-cell': hasContent(time, 0) }" style="width: 20%; border-bottom: white 1px solid;">{{ getEventForTime(time, 0) }}</td>
				<td :class="{ 'filled-cell': hasContent(time, 1) }" style="width: 20%; border-bottom: white 1px solid;">{{ getEventForTime(time, 1) }}</td>
				<td :class="{ 'filled-cell': hasContent(time, 2) }" style="width: 20%; border-bottom: white 1px solid;">{{ getEventForTime(time, 2) }}</td>
				<td :class="{ 'filled-cell': hasContent(time, 3) }" style="width: 15%; border-bottom: white 1px solid; font-size: 40px; font-weight: 800; padding-left: 25px;">{{ hasContent(time, 3) ? '+' : '' }}</td>
			</tr>
		</tbody>
	</table>

</template>
<script>
	import Header from '@/plugins/screens/components/header.vue'
	import { useMainStore } from '@/plugins/stores/store.js'
	export default {
		components: {
			Header,
		},
		data() {
			return {
				eventSwitch: false,
				selectedDate: null, // Changed to null
				formattedSchedule: [],
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

			this.formatSchedule();

			this.store.refreshSchedule()

		},

		computed: {
			times() {
				const start = Math.min(...this.schedule.map(item => item.start));
				const end = Math.max(...this.schedule.map(item => item.end));
				const times = [];

				for (let i = start; i <= end; i += 30) {
					times.push(i);
				}

				return times;
			},

			uniqueDates() {
				return [...new Set(this.schedule.map(item => item.date))];
			},

			selectedDateEvents() {
				if (this.selectedDate) {
					return this.schedule.filter(item => this.isSameDay(item.date, this.selectedDate));
				}
				return [];
			}
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

			formatSchedule() {
				this.formattedSchedule = [...new Set(this.schedule.map(item => item.date))];
			},

			showEventsForDate(date) {
				this.selectedDate = date; // Changed to set as string directly
			},

			isSameDay(date1, date2) {
				if (typeof date1 === 'string' && typeof date2 === 'string') {
					return date1 === date2;
				} else if (date1 instanceof Date && date2 instanceof Date) {
					return (
						date1.getFullYear() === date2.getFullYear() &&
						date1.getMonth() === date2.getMonth() &&
						date1.getDate() === date2.getDate()
					);
				}
				return false;
			},

			hasContent(time, column = null) {
				const content = column !== null ? this.getEventForTime(time, column) : this.formatTime(time);
				return content.trim() !== '';
			},

			getDayName(dayIndex) {
				const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				return days[dayIndex];
			},

			formatDate(date) {
				const day = date.getDate();
				const month = date.getMonth() + 1;
				const year = date.getFullYear();
				return `${day}/${month}/${year}`;
			},
			
			getDayOfWeek(date) {
				const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				const dayIndex = new Date(date).getDay();
				return daysOfWeek[dayIndex];
			},

			formatDateDDMMYYYY(dateString) {
				const parts = dateString.split('-');
				const day = parts[2];
				const month = parts[1];
				const year = parts[0];
				return `${day}.${month}.${year}`;
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
</style>