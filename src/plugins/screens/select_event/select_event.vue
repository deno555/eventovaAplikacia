<template>
    <div>
        <p style="font-size: 20px;" v-for="event in allEvents" :key="event.id">{{ + event.id + ") " + event.name }}</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return{
            allEvents: null,
        }
    },

    mounted(){
        axios.get('http://localhost:3000/events').then((response) => {
            this.allEvents = response.data
        });
    },
}
</script>

<style lang="sass">
body
    background-color: #1400FF
    margin: 0px
</style>