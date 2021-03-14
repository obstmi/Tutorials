<template>
    <div>
        <h1>Create Event, {{ $store.state.user.name }}</h1>
        <h1>Create Event, {{ userHuhu.name }}</h1>
        <p>This event is created by {{ userName }}</p>
        <p>This event is created by {{ myComputedUsername }}</p>
        <p>There are {{ myCatLength }} categories</p>
        <p>There are {{ $store.state.categories.length }} categories</p>
        <p>There are {{ catLength }} categories</p>
        <p>Done Todos: {{ doneTodos }}</p>
        <p>My computed done Todos: {{ myComputedDoneTodos }}</p>
        <p>MapStateFiltered done Todos: {{ mapStateFilteredToDos }}</p>
        <p>ToDos to done: {{ activeTodosCount2 }}</p>
        <p>ToDo No 1: {{ getToDosById(1)}}</p>
        <p>ToDo No 1 (mapGetter) : {{ getTodo(1)}}</p>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    computed: {
        // first the local computed properties:
        myComputedUsername() {
            return this.$store.state.user.name
        },
        myCatLength() {
            return this.$store.state.categories.length
        },
        catLength() {
            return this.$store.getters.catLength
        },
        doneTodos() {
            return this.$store.getters.doneTodos
        },
         // returns an array of done ToDos (same as in Getters of the Store) - only the text
        myComputedDoneTodos() {
            return this.$store.state.todos.filter(todo => todo.done).map(dings => dings.text)
        },
        activeTodosCount2() {
            return this.$store.getters.activeTodosCount2
        },
        getToDosById() {
            return this.$store.getters.getToDosById2
        },

        ...mapState({
            userName: state => state.user.name,
            categories: state => state.categories,
            // entspricht categories: 'categories', siehe:
            userHuhu: 'user',
            categoriesHuhu: 'categories',

            // oder ganz kurz:
            // computed: mapState(['categories', 'user'])

            // returns an array of done ToDos (same as in Getters of the Store)
            mapStateFilteredToDos: state => state.todos.filter(todo => todo.done) 
        }),

        ...mapGetters({
            //'categoriesLength',
            //'getEventById',
            // or renamed:
            catCount: 'catLength',
            getTodo: 'getToDosById'
        })
    }
}
</script>