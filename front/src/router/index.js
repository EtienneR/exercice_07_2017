import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/components/List'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {title: 'Bienvenue'}
    },
    {
      path: '/list/:userId',
      name: 'List',
      component: List,
      meta: {title: 'Votre personnage'}
    },
    {
    	path: '*',
    	name: '',
    	component: NotFound,
      meta: {title: 'Page innexistante'}
    }
  ]
})
