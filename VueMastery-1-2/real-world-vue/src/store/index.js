import Vue from "vue";
import Vuex from "vuex";
import EventService from '@/services/EventService.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {id: 'abc123', name: 'Adam Jahr'},
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    todos: [
      {id: 1, text: 'abc', done: true},
      {id: 2, text: 'def', done: false},
      {id: 3, text: 'ghi', done: true},
      {id: 4, text: 'jkl', done: false}
    ],
    count: 0,
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    INCREMENT_COUNT(state, payload) {
      state.count += payload;
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal;
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    // btw: object-destructing of the Vuex context object (first argument)
    updateCount({state, commit}, payload) {
      if(state.user) {
        commit('INCREMENT_COUNT', payload)
      }
    },
    createEvent( {commit}, event) {
      return EventService.postEvent(event)
        .then( () => {  //ACHTUNG: return bei einem Callback NICHT vergessen!!
          commit('ADD_EVENT', event); //  event.data ist undefined (Fehler im Tutorial)
        })
    },
    fetchEvents({ commit }, { perPage, page }) { // argument destructuring in the second argument (= the payload)
      EventService.getEvents(perPage, page)
        .then(response => {
          console.log('---> Total events are ' + response.headers['x-total-count']);
          commit('SET_EVENTS', response.data); //im data-Object sind alle Events drin.
          commit('SET_EVENTS_TOTAL', response.headers['x-total-count']);
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    },
    fetchEvent({ commit }, id) {
      EventService.getEvent(id)
        .then(response => {
          console.log(`---> Bin in actions: getEvent({id})`)
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length;
    },
    // returns an array of done ToDos
    doneTodos: state => {
      return state.todos.filter(todo => todo.done) 
    },
    // returns number of remaining todos (demonstration of a Getter inside of another Getter)
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    },
    //or simply:
    activeTodosCount2: state => {
      return state.todos.filter(todo => !todo.done).length
    },
    getToDosById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    },
    // ..in function writing style
    getToDosById2: function(state) {
      return function(id) {
        return state.todos.find(function(todo) {
          return todo.id === id
        })
      }
    },
    getEventById: (state) => (id) => {
      return state.events.find(event => event.id === id)
    }
  },
  modules: {}
})

 
  

