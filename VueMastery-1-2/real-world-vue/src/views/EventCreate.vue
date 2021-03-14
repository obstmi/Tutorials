<template>
    <div>
        <h1>Create Event, {{ $store.state.user.name }}</h1>
        <p>This event is created by {{ userName }}</p>
        <p>There are {{ catLength }} categories</p>

        <!--
        <input type="number" v-model.number="incrementBy">
        <button @click="incrementCount">Increment</button>
        -->

        <form @submit.prevent="createEvent">
            <label>Select a category</label>
            <select v-model="event.category">
                <option v-for="cat in categories" :key="cat">{{ cat }}</option>
            </select>
            <h3>Name & describe your event</h3>
            <div class="field">
                <label>Title</label>
                <input v-model="event.title" type="text" placeholder="Add an event title"/>
            </div>
            <div class="field">
                <label>Description</label>
                <input v-model="event.description" type="text" placeholder="Add a description"/>
            </div>
            <h3>Where is your event?</h3>
            <div class="field">
                <label>Location</label>
                <input v-model="event.location" type="text" placeholder="Add a location"/>
            </div>
            <h3>When is your event?</h3>
            <div class="field">
                <label>Date</label>
                <datepicker v-model="event.date" placeholder="Select a date"></datepicker>
            </div>
            <div class="field">
                <label>Select a time</label>
                <select v-model="event.time">
                    <option v-for="time in times" :key="time">{{ time }}</option>
                </select>
            </div>
            <input type="submit" class="button -fill-gradient" value="Sumit"/>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker'
export default {
    components: {
        Datepicker
    },
    data() {
        const times = [];
        for (let i=1; i<=24; i++) {
            times.push(i + ':00');
        }
        return {
            event: this.createFreshEventObject(),
            times, // = times: times
            //categories: this.$store.categories, // wird bereits im mapState-Helper definiert
            incrementBy: 1
        }
    },
    methods: {
        incrementCount() {
            // It’s important to note that it is recommended to always commit a Mutation from within an Action
            // this.$store.commit('INCREMENT_COUNT', this.incrementBy)
            this.$store.dispatch('updateCount', this.incrementBy)
        },
        createFreshEventObject() {
            //const myUser = this.userHuhu; // klappt nicht :-( ??
            const myUser = this.$store.state.user;
            console.log('---->bin in cretaeFreshEvent, der User ist: ' + myUser);
            const id = Math.floor(Math.random() * 10000000);
            return {
                id: id,
                category: '',
                organizer: myUser,
                title: '',
                description: '',
                location: '',
                date: '',
                time: '',
                attendees: []
            }
        },
        createEvent() {
            console.log('--->Bin in createEvent()');
            this.$store.dispatch('createEvent', this.event).then( () => {
                this.$router.push({
                    name: 'event-show',
                    params: { id: this.event.id }
                });
                this.event = this.createFreshEventObject();
            }).catch( () => {
                console.log('There was a problem creating your event.')
            })
        }
    },
    computed: {
        // first the local computed properties:
        catLength() {
            return this.$store.getters.catLength
        },
         // returns an array of done ToDos (same as in Getters of the Store) - only the text
        myComputedDoneTodos() {
            return this.$store.state.todos.filter(todo => todo.done).map(dings => dings.text)
        },
        //userHuhu() {
        //    return this.$store.state.user
        //},

        ...mapState({
            userName: state => state.user.name,
            categories: state => state.categories,
            // entspricht categories: 'categories', siehe:
            //userHuhu: 'user',
            userHuhu: state => state.user //warum Funktion?

            // oder ganz kurz:
            // computed: mapState(['categories', 'user'])
        }),

        ...mapGetters({
            //'categoriesLength',
            //'getEventById',
            // or renamed:
            catCount: 'catLength',
        })
    }
}
</script>

<style scoped>
.field {
    margin-bottom: 24px;
}
</style>