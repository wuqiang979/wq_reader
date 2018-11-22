import Vue from 'vue'
import Router from 'vue-router'
import EpubIndex from '@/epub/EpubIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EpubIndex',
      component: EpubIndex
    }
  ]
})
