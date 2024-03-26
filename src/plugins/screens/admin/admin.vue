<template>
	<div style="border: 1px solid black;">
		<button @click="refreshEvents">refresh</button>
		<button @click="test">local</button>
		<div>
			<p style="font-size: 20px;" v-for="event in allEvents" :key="event.id">{{ + event.id + ") " + event.name }}</p>
		</div>
		<div>
			<p style="display: inline-block; font-size: 20px;">event name</p>
			<input v-model="name">
			<button @click="addEvent">add</button>
		</div>
		<div>
			<p style="display: inline-block; font-size: 20px;">delete based on id</p>
			<input v-model="delete_id">
			<button @click="deleteEvent">delete</button>
		</div>
		<router-link :to="{name : 'addDetail'}">
			<p style="background-color: red;">add detail</p>
		</router-link>
	</div>
		
	<div>
		<div>
			<p style="display: inline-block; font-size: 20px;">show detail based on id</p>
			<input v-model="id">
		</div>
		<p style="font-size: 20px;">{{ "id:" + eventDetail?.id }}</p>
		<p style="font-size: 20px;">{{ "event id: " + eventDetail?.event_id }}</p>
		<p style="font-size: 20px;">{{ "about text: " + eventDetail?.aboutText }}</p>
		<div style="border: 1px solid black;" v-for="notif in JSON.parse(eventDetail?.notifications ? eventDetail.notifications : null)" :key="notif?.id">
			<p style="font-size: 20px;">{{ "notif n." + notif?.id }}</p>
			<p style="font-size: 20px;">{{ "notif title: " + notif?.title }}</p>
			<p style="font-size: 20px;">{{ "notif desc: " + notif?.description }}</p>
			<p style="font-size: 20px;">{{ "notif time: " + notif?.time }}</p>
		</div>
		<div style="border: 1px solid black;" v-for="question in JSON.parse(eventDetail?.feedback ? eventDetail.feedback : null)" :key="question.id">
			<p style="font-size: 20px;">{{ "question n." + question.id }}</p>
			<p style="font-size: 20px;">{{ "question name: " + question.question }}</p>
			<p style="font-size: 20px;">{{ "question type: " + question.type }}</p>
			<p style="font-size: 20px;">{{ "question value: " + question.value }}</p>
		</div>
		<div style="border: 1px solid black;" v-for="photo in JSON.parse(eventDetail?.photos ? eventDetail.photos : null)" :key="photo.id">
			<p style="font-size: 20px;">{{ "photo n." + photo.id }}</p>
			<p style="font-size: 20px;">{{ "photo url: " + photo.url }}</p>
		</div>
		<div style="border: 1px solid black;" v-for="schedule in JSON.parse(eventDetail?.schedule ? eventDetail.schedule : null)" :key="schedule?.id">
			<p style="font-size: 20px;">{{ "schedule n." + schedule?.id }}</p>
			<p style="font-size: 20px;">{{ "schedule name: " + schedule?.name }}</p>
			<p style="font-size: 20px;">{{ "schedule date: " + schedule?.date }}</p>
			<p style="font-size: 20px;">{{ "schedule start: " + schedule?.start }}</p>
			<p style="font-size: 20px;">{{ "schedule end: " + schedule?.end }}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return{
			allEvents: null,
			name: '',
			id: 1,
			delete_id: 1,
			eventDetail: null,
		}
	},

	mounted(){
		axios.get('https://letny-projekt-be.onrender.com/events').then((response) => {
			this.allEvents = response.data
		});
		axios.get(`https://letny-projekt-be.onrender.com/events/${this.id}/details`).then((response) => {
			this.eventDetail = response.data
		})
	},

	methods: {
		refreshEvents(){
			axios.get('https://letny-projekt-be.onrender.com/events').then((response) => {
			this.allEvents = response.data
			})

			axios.get(`https://letny-projekt-be.onrender.com/events/${this.id}/details`).then((response) => {
				this.eventDetail = response.data
			})
		},

		addEvent(){
			axios.post('https://letny-projekt-be.onrender.com/events', {
				"name": this.name,
			})
		},

		deleteEvent(){
			axios.delete(`https://letny-projekt-be.onrender.com/events/${this.delete_id}`)
		},

		addNotif(){
			axios.post(`https://letny-projekt-be.onrender.com/events/${this.id}/details`, {
				notifications: {
					title: 'cock',
					desc: 'balls',
					time: '2024-02-20T14:00:00Z',
					id: 2
				}
			})
		},
		test(){
			localStorage.setItem('cock', 'cock')
		}
	}
}
</script>

<style lang="sass">
a
	text-decoration: none
	color: inherit
</style>