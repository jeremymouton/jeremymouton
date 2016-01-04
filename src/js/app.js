/***
 * app.js
 *
 */

var Vue       = require('vue')
var VueRouter = require('vue-router')

var $ = require('zepto-browserify').$


/*
 * Components
 *
 */
var Projects    = require('./components/projects.vue')
var LatestTrack = require('./components/latest-track.vue')
var Error       = require('./components/error.vue')

/* Register components */
Vue.component('latest-track', LatestTrack)


/*
 * Routing
 *
 */
Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/': {
    component: Projects
  },

  '404': {
    component: Error
  }
})

router.redirect({
  '*': '404'
})


/*
 * Start app
 *
 */
var App = Vue.extend({})

router.start(App, '#app')
