import { defineStore } from 'pinia'
import axios from 'axios'

export const useMainStore = defineStore('myStore',{
    state: () =>{
        return{
            admin: false,
            aboutText: 'Default text',
            notifications: [],
            feedback:[],
            photos:[],
            schedule:[],
            id: 1,
        }
    },

    actions:{
        editAboutText(newAboutText){
            this.aboutText = newAboutText
            axios.post(`https://letny-projekt-be.onrender.com/events/${this.id}/details/aboutText`, {
					aboutText: this.aboutText
				}).then(console.log("added aboutText"))
        },
    
        refreshAboutText() {
            localStorage.removeItem('aboutText')
            axios.get(`https://letny-projekt-be.onrender.com/events/${this.id}/details`).then((response) => {
			    this.aboutText = response.data.aboutText
                localStorage.setItem('aboutText', this.aboutText)
		    })
        },
        refreshNotifications() {
            localStorage.removeItem('notifications')
            axios.get(`https://letny-projekt-be.onrender.com/events/${this.id}/details`).then((response) => {
			    this.notifications = response.data.notifications
                localStorage.setItem('notifications', this.notifications)
                // console.log(this.notifications)
		    })
        },
        refreshFeedback() {
            localStorage.removeItem('feedback')
            axios.get(`https://letny-projekt-be.onrender.com/events/${this.id}/details`).then((response) => {
			    this.feedback = response.data.feedback
                localStorage.setItem('feedback', this.feedback)
                // console.log(this.feedback)
		    })
        },
        refreshPhotos() {
            localStorage.removeItem('photos')
            axios.get(`https://letny-projekt-be.onrender.com/events/${this.id}/details`).then((response) => {
			    this.photos = response.data.photos
                localStorage.setItem('photos', this.photos)
                // console.log(this.photos)
		    })
        },
        refreshSchedule() {
            localStorage.removeItem('schedule')
            axios.get(`https://letny-projekt-be.onrender.com/events/${this.id}/details`).then((response) => {
			    this.schedule = response.data.schedule
                localStorage.setItem('schedule', this.schedule)
                // console.log(this.schedule)
		    })
		},
        refresh(){
            this.refreshAboutText()
            this.refreshFeedback()
            this.refreshNotifications()
            this.refreshPhotos()
            this.refreshSchedule()
        }
    },
})