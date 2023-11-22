import { defineStore } from 'pinia'

export const useMainStore = defineStore('myStore',{
    state: () =>{
        return{
            admin: true,
            aboutText: 'cock and balls',
            notifications: [
                {
                    title: "lol",
                    desc:"cock and balls",
                    time:"00:00",
                    id: 0
                },
                {
                    title: "Lorem ipsum dolor sit amet",
                    desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                    time:"00:00",
                    id: 1
                },
            ],
            feedback:[
                {
                    question: 'test1',
                    type: 'text',
                    id: 0,
                    value: ''
                },
                {
                    question: 'test2',
                    type: 'rating',
                    id: 1,
                    value: ''  
                },
                {
                    question: 'test3',
                    type: 'rating',
                    id: 2,
                    value: ''
                },
                {
                    question: 'test4',
                    type: 'text',
                    id: 3,
                    value: ''
                }
            ],
            photos:[
                {
                    url: 'https://cdn.discordapp.com/attachments/855129754386956311/1161549489232957470/Screenshot_20231011_082230_Instagram.jpg?ex=6538b442&is=65263f42&hm=c5e52affe03d955060dff079c848d97db99b60b6acfe085d2e8556348449424c&',
                    id: 0,
                },

                {
                    url: 'https://cdn.discordapp.com/attachments/855129754386956311/1161549489232957470/Screenshot_20231011_082230_Instagram.jpg?ex=6538b442&is=65263f42&hm=c5e52affe03d955060dff079c848d97db99b60b6acfe085d2e8556348449424c&',
                    id: 1,
                },
                {
                    url: 'https://cdn.discordapp.com/attachments/855129754386956311/1161549489232957470/Screenshot_20231011_082230_Instagram.jpg?ex=6538b442&is=65263f42&hm=c5e52affe03d955060dff079c848d97db99b60b6acfe085d2e8556348449424c&',
                    id: 2,
                },

                {
                    url: 'https://cdn.discordapp.com/attachments/855129754386956311/1161233274182570044/8a954d9aa9cd02dd5770cd6015fdeefc.jpg?ex=65378dc3&is=652518c3&hm=21af80315acd5bc4438b6bf974e3fb2db0ba4a9e86d85fdde3dccdea325360eb&',
                    id: 3,
                },

                {
                    url: 'https://cdn.discordapp.com/attachments/855129754386956311/1161549489232957470/Screenshot_20231011_082230_Instagram.jpg?ex=6538b442&is=65263f42&hm=c5e52affe03d955060dff079c848d97db99b60b6acfe085d2e8556348449424c&',
                    id: 4,
                },

                {
                    url: 'https://cdn.discordapp.com/attachments/855129754386956311/1161233274182570044/8a954d9aa9cd02dd5770cd6015fdeefc.jpg?ex=65378dc3&is=652518c3&hm=21af80315acd5bc4438b6bf974e3fb2db0ba4a9e86d85fdde3dccdea325360eb&',
                    id: 5,
                },

                {
                    url: 'https://cdn.discordapp.com/attachments/855129754386956311/1161233274182570044/8a954d9aa9cd02dd5770cd6015fdeefc.jpg?ex=65378dc3&is=652518c3&hm=21af80315acd5bc4438b6bf974e3fb2db0ba4a9e86d85fdde3dccdea325360eb&',
                    id: 6,
                },

                {
                    url: 'https://cdn.discordapp.com/attachments/855129754386956311/1161549489232957470/Screenshot_20231011_082230_Instagram.jpg?ex=6538b442&is=65263f42&hm=c5e52affe03d955060dff079c848d97db99b60b6acfe085d2e8556348449424c&',
                    id: 7,
                }
            ],
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
                    id: 0
                },
                {
                    name: 'Odchod',
                    date: '24.7.2023',
                    start: 1140, //19:00 v minutach
                    end: 1200, //20:00 v minutach
                    id: 1
                },
            ]
        }
    },

    actions:{
        editAboutText(newAboutText){
            this.aboutText = newAboutText
            localStorage.setItem('aboutText', this.aboutText)
        },
    }
})