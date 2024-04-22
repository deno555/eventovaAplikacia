<template>
	<Header class="header">Select</Header>

	<div v-for="event in allEvents" :key="event.id" class="notif" @click="setId(event.id)">
        <div style="display: flex;">
			<img width="100" :src="event.logo">
            <div class="notif-title" style="margin: auto 0;">{{ event.name }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Header from '@/plugins/screens/components/header.vue'

export default {
	components: {
		Header,
	},

	data() {
		return{
			allEvents: null,
		}
	},

	mounted(){
		axios.get('https://letny-projekt-be.onrender.com/events').then((response) => {
			this.allEvents = response.data
		});
	},

	methods: {
		setId(id){
			localStorage.clear
			localStorage.setItem('id', id)
			this.$router.push('/home')
			setTimeout(() => {
				location.reload()
			}, 50)
		},
	}
}
</script>

<style lang="sass">
body
	margin: 0px

.notif
	border-bottom: solid black 2px 
	padding-top: 15px
	padding-bottom: 15px
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