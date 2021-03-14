import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import EventCreateTests from "../views/EventCreateTests";
import User from "../views/User.vue";
import FileNotFound from "../views/FileNotFound.vue";

Vue.use(VueRouter);

const routes = [
  // Routen werden entweder über den Pfad oder über den Namen erreicht
  {
    path: "/",
    name: "event-list",
    component: EventList
  },


  { //this has to come before /event/:id
    path: "/event/create",
    name: "event-create",
    component: EventCreate
  },

  {
    path: "/event/create-tests",
    name: "event-create-tests",
    component: EventCreateTests
  },

  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true // id wird als prop übergeben
  },


  //dynamic route:
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    props: true
  },

  //catch-all-route
  {
    path: '*',
    name: 'not-necessary',
    component: FileNotFound
  }

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
