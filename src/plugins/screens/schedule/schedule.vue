<template>
    <Header :link="'Home'" class="header">Schedule</Header>
    <div class="switchContainer">
        <div @click="eventSwitch = false" :class="{'on' : !eventSwitch, 'off' : eventSwitch}" class="switch">Calendar</div>
        <div @click="eventSwitch = true" :class="{'on' : eventSwitch, 'off' : !eventSwitch}" class="switch">All events</div>
    </div>

    <div class="dayContainer" style="overflow-x: scroll; white-space: nowrap;">
        <div class="day" v-for="(item, index) in schedule" :key="index">
            <p>{{ item.date }}</p>
            <p>{{ dayNames[index] }}</p>
        </div>
    </div>

    <div class="timeTable">
        <div class="item">00:00</div>
        <div class="item">00:15</div>
        <div class="item">00:30</div>
        <div class="item">00:45</div>
        <div class="item">00:45</div>
        <div class="item">01:00</div>
        <div class="item">01:15</div>
        <div class="item">01:30</div>
        <div class="item">01:45</div>
        <div class="item">02:00</div>
        <div class="item">02:15</div>
        <div class="item">02:30</div>
        <div class="item">02:45</div>
        <div class="item">03:00</div>
        <div class="item">03:15</div>
        <div class="item">03:30</div>
        <div class="item">03:45</div>
    </div>
    <div class="scheduleTable">
        <div class="item">jeden</div>
        <div class="item">dva</div>
        <div class="item">tri</div>
        <div class="item">styri</div>
    </div>
    <div class="scheduleTable">
        <div class="item">jeden</div>
        <div class="item">dva</div>
        <div class="item">tri</div>
        <div class="item">styri</div>
    </div>
    <div class="scheduleTable">
        <div class="item">jeden</div>
        <div class="item">dva</div>
        <div class="item">tri</div>
        <div class="item">styri</div>
    </div>
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
                schedule:[
                    {
                        name: 'Prichod',
                        date: '23.7.2023',
                        start: 870, //14:30 v minutach
                        end: 900, //15:00 v minutach
                        id: 0
                    },
                    {
                        name: 'Odchod',
                        date: '23.7.2023',
                        start: 1140, //19:00 v minutach
                        end: 1200, //20:00 v minutach
                        id: 1
                    },
                    {
                        name: 'Prichod',
                        date: '24.7.2023',
                        start: 870, //14:30 v minutach
                        end: 900, //15:00 v minutach
                        id: 2
                    },
                    {
                        name: 'Odchod',
                        date: '24.7.2023',
                        start: 1140, //19:00 v minutach
                        end: 1200, //20:00 v minutach
                        id: 3
                    },
                    {
                        name: 'Prichod',
                        date: '25.7.2023',
                        start: 1140, //19:00 v minutach
                        end: 1200, //20:00 v minutach
                        id: 4
                    },
                ],
            }
        },

        computed:{
            // ...mapStores(useMainStore),
            // ...mapState(useMainStore, ['schedule']),

            dayNames() {
                return this.schedule.map(item => {
                    const dateParts = item.date.split('.');
                    const year = parseInt(dateParts[2]);
                    const month = parseInt(dateParts[1]) - 1; // Months are 0-based
                    const day = parseInt(dateParts[0]);
                    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const dayIndex = new Date(year, month, day).getDay();
                    return daysOfWeek[dayIndex];
                })
            },

            time(){
                
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
    
    .switch
        padding: 15px 0 
        display: inline-block 
        width: 50%

    .on
        background-color: #4F4F4F

    .off
        background-color: #757575

    .dayContainer
        height: 50px
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

    .timeTable
        display: inline-grid 
        grid-template-columns: auto
        width: 10%

    .scheduleTable
        display: inline-grid 
        grid-template-columns: auto 
        width: 30%

    .item
        border: 1px solid black 
        height: 150px

</style>