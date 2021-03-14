<template>
<div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
        <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>
        <template v-if="hasNextPage">
             | 
        </template>
    </template>
    <template v-if="hasNextPage">
        <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">Next Page</router-link>
    </template>

</div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
// import axios from 'axios';
// import EventService from '@/services/EventService.js'; // instead of using axios directly
import { mapState } from 'vuex'; // import mapState-helper

export default {
    components: {
        EventCard
    },
    // data() {
    //     return {
    //         events: []
    //     }
    // },
    //created: function() {..}
    created() {
        // axios.get('http://localhost:3000/events')
        
        // EventService.getEvents()
        // .then(response => {
        //   this.events = response.data;
        // })
        // .catch(error => {
        //     console.log('There was an error:', error.response)
        // })

        this.perPage = 3 // Setting perPage here and not in data means it won't be reactive.
        // We don't need it to be reactive, and this way our component has access to it.

        this.$store.dispatch('fetchEvents', { perPage: this.perPage, page: this.page } ) // instead of calling the EventService directly
    },
    //computed: mapState(['events']) // wenn nur der mapState-Helper benötigt wird, sonst:
    computed: {
        page() {
            return parseInt(this.$route.query.page) || 1
        },
        hasNextPage() {
            return this.eventsTotal > this.page * this.perPage
        },
        ...mapState(['events', 'eventsTotal'])
    }
}
</script>