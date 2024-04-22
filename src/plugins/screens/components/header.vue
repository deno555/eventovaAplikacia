<template>
	<div class="header">
		<div class="header__title">
			<router-link :to="{name: link}" v-if="link">
				<ion-icon style="color: white; position: absolute; left: -100px; top: 3px" :icon="chevronBack"/>
			</router-link>
			<slot>cock</slot>
		</div>
	</div>
</template>

<script>
	import {IonHeader, IonToolbar, IonTitle, IonIcon} from '@ionic/vue';
	import {chevronBack} from 'ionicons/icons'

	export default {
		props:{
			link:{
				type: String,
				required: false
			}
		},

		components: {
			IonHeader,
			IonToolbar,
			IonTitle,
			IonIcon
		},
		
		data(){
			return{
				chevronBack
			}
		},

		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="sass">
	.header
		background: rgb(0,24,204)
		background: linear-gradient(-45deg, rgba(0,24,204,1) 0%, rgba(0,9,74,1) 79%)
		height: 75px
		position: sticky
		top: 0
		text-align: center

		&__title
			color: white
			font-size: 40px
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			width: 50%


	.back-arrow
		border: solid white 
		border-width: 0px 0px 3px 3px 
		float: left 
		width: 20px 
		height: 20px 
		transform: rotate(45deg)
		margin-left: 5px
		margin-top: 10px
</style>