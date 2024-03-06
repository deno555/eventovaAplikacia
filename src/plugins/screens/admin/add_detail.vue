<template>
    <div>
        <p style="font-size: 20px; display: inline-block;">what event u add detail to</p>
        <input v-model="id">
    </div>

    <div style="border: 1px solid black;">
        <p style="font-size: 20px; display: inline-block;">add about text</p>
        <input v-model="aboutText">
        <p style="font-size: 20px; display: inline-block;">string</p>
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
            <p style="font-size: 20px; display: inline-block;">string</p>
        </div>
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
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return {
                id: 1,
                aboutText: '',
                notifTitle: '',
                notifDesc: '',
                notifTime: '',
                feedbackQuestion: '',
                feedbackType: '',
                scheduleName: '',
                scheduleDate: '',
                scheduleStart: null,
                scheduleEnd: null
            }
        },

         methods:{
            addDetail(){
			const detailsData = {
				aboutText: 'Event description',
				notifications: [
					{ title: 'Notification 1', description: 'Description 1', time: '2024-02-20T12:00:00Z', id: 1 },
					// Add more notifications as needed
				],
				feedback: [
					{ question: 'Feedback Question 1', type: 'text', id: 1, value: 'Answer 1' },
					// Add more feedback questions as needed
				],
				photos: [
					{ url: 'https://example.com/photo1.jpg', id: 1 },
					// Add more photos as needed
				],
				schedule: [
					{ name: 'Session 1', date: '2024-02-21', start: '10:00 AM', end: '12:00 PM', id: 1 },
					{ name: 'Session 1', date: '2024-02-21', start: '10:00 AM', end: '12:00 PM', id: 1 },
					// Add more schedule items as needed
				],
			};

			
			axios.post(`http://localhost:3000/events/${this.id}/details`, detailsData)
			.then(response => {
				console.log('Details added successfully:', response.data);
			})
			.catch(error => {
				console.error('Error adding details:', error.response.data);
			});
		},
         }
    }
</script>

<style lang="sass">
body
	background-color: #1400FF
	margin: 0px
</style>