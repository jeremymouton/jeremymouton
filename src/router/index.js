import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})
