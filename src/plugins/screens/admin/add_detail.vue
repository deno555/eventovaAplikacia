<template>
	<div>
		<p style="font-size: 20px; display: inline-block;">select id</p>
		<input v-model="id">
	</div>
	<div style="border: 1px solid black;">
		<p style="font-size: 20px; display: inline-block;">add about text</p>
		<input v-model="aboutText">
		<p style="font-size: 20px; display: inline-block;">string</p>
		<button @click="addAboutText">add aboutText</button>
	</div>
	<div style="border: 1px solid black;">
		<p style="font-size: 20px;">add notifs</p>
		<div>
			<p style="font-size: 20px; display: inline-block;">add notif title</p>
			<input v-model="notifTitle">
			<p style="font-size: 20px; display: inline-block;">string</p>
		</div>
		<div>
			<p style="font-size: 20px; display: inline-block;">add notif desc</p>
			<input v-model="notifDesc">
			<p style="font-size: 20px; display: inline-block;">string</p>
		</div>
		<div>
			<p style="font-size: 20px; display: inline-block;">add notif time</p>
			<input v-model="notifTime">
			<p style="font-size: 20px; display: inline-block;">string (hh-mm)</p>
		</div>
		<button @click="addNotifs">add notifs</button>
	</div>

	<div style="border: 1px solid black;">
		<p style="font-size: 20px;">add feedback</p>
		<div>
			<p style="font-size: 20px; display: inline-block;">add feedback question</p>
			<input v-model="feedbackQuestion">
			<p style="font-size: 20px; display: inline-block;">string</p>
		</div>
		<div>
			<p style="font-size: 20px; display: inline-block;">add feedback type</p>
			<input v-model="feedbackType">
			<p style="font-size: 20px; display: inline-block;">string (text/rating)</p>
		</div>
		<div>
			<p style="font-size: 20px; display: inline-block;">add feedback value</p>
			<input v-model="feedbackValue">
			<p style="font-size: 20px; display: inline-block;">int</p>
		</div>
		<button @click="addFeedback">add feedback</button>

	</div>

	<div style="border: 1px solid black;">
		<p style="font-size: 20px;">add photo</p>
		<div>
			<p style="font-size: 20px; display: inline-block;">add photo url</p>
			<input v-model="photoUrl">
			<p style="font-size: 20px; display: inline-block;">string</p>
		</div>
		<button @click="addPhoto">add photo</button>

	</div>

	<div style="border: 1px solid black;">
		<p style="font-size: 20px;">add schedule</p>
		<div>
			<p style="font-size: 20px; display: inline-block;">add schedule name</p>
			<input v-model="scheduleName">
			<p style="font-size: 20px; display: inline-block;">string</p>
		</div>
		<div>
			<p style="font-size: 20px; display: inline-block;">add schedule date</p>
			<input v-model="scheduleDate">
			<p style="font-size: 20px; display: inline-block;">string (yyyy-mm-dd)</p>
		</div>
		<div>
			<p style="font-size: 20px; display: inline-block;">add schedule start time</p>
			<input v-model="scheduleStart">
			<p style="font-size: 20px; display: inline-block;">int</p>
		</div>
		<div>
			<p style="font-size: 20px; display: inline-block;">add schedule end time</p>
			<input v-model="scheduleEnd">
			<p style="font-size: 20px; display: inline-block;">int</p>
		</div>
		<button @click="addSchedule">add schedule</button>
	</div>

	<div style="border: 1px solid black;">
		<p style="font-size: 20px">nuke db</p>
		<button @click="nukeEvents">nuke</button>
	</div>

	<div style="border: 1px solid black;">
		<p style="font-size: 20px">nuke details</p>
		<button @click="nukeDetails">nuke</button>
	</div>
	
</template>

<script>
	import axios from 'axios'

	export default {
		data(){
			return {
				id: 1,
				aboutText: 'aboutText',
				notifTitle: 'notifTitle',
				notifDesc: 'notifDesc',
				notifTime: '11-11',
				feedbackQuestion: 'feedbackQuestion',
				feedbackType: 'text',
				feedbackValue: null,
				photoUrl: 'https://cdn.discordapp.com/attachments/1109202373538218028/1220784728433754162/microwaveable.png?ex=66103360&is=65fdbe60&hm=db2dfcee2c5f3666c4acdc8eaabce0bbea0aeb60a8006d8b92f86817b7b8b54b&',
				scheduleName: 'scheduleName',
				scheduleDate: '1111-11-11',
				scheduleStart: 1,
				scheduleEnd: 2,
			}
		},

		 methods:{
			addAboutText(){
				axios.post(`https://letny-projekt-be.onrender.com/events/${this.id}/details/aboutText`, {
					aboutText: this.aboutText
				}).then(console.log("added aboutText"))
			},

			addNotifs(){
				axios.post(`https://letny-projekt-be.onrender.com/events/${this.id}/details/notifs`, {
					notifications: {
						title: this.notifTitle,
						description: this.notifDesc,
						time: this.notifTime,
						id: localStorage.getItem('notifications') ? JSON.parse(localStorage.getItem('notifications'))?.length + 1 : 1
					}
				}).then(console.log("added a notif"))
				
			},

			addFeedback(){
				axios.post(`https://letny-projekt-be.onrender.com/events/${this.id}/details/feedback`, {
					feedback: {
						question: this.feedbackQuestion,
						type: this.feedbackType,
					}
				}).then(console.log("added feedback"))
				
			},

			addPhoto(){
				axios.post(`https://letny-projekt-be.onrender.com/events/${this.id}/details/photo`, {
					photo: {
						url: this.photoUrl
					}
				}).then(console.log("added a photo"))
				
			},

			addSchedule(){
				axios.post(`https://letny-projekt-be.onrender.com/events/${this.id}/details/schedule`, {
					schedule: {
						name: this.scheduleName,
						date: this.scheduleDate,
						start: this.scheduleStart,
						end: this.scheduleEnd,
						id: JSON.parse(localStorage.getItem('schedule')) ? JSON.parse(localStorage.getItem('schedule'))?.length + 1 : 1
					}
				}).then(console.log('added a schedule'))
			},

			nukeDetails(){
				axios.delete('https://letny-projekt-be.onrender.com/nuke-database/details')
			},
			nukeEvents(){
				axios.delete('https://letny-projekt-be.onrender.com/nuke-database')
			}
		 },

		 mounted(){
			console.log(localStorage.getItem('notifications') ? JSON.parse(localStorage.getItem('notifications'))?.length + 1 : 1)
		 }
	}
</script>

<style lang="sass">
body
	background: blue
</style>