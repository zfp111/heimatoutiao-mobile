import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


const routes = [
  { path: '/login', component: () => import('../views/login') },
  { path: '/otherlogin', component: () => import('../views/login') },
  {
    path: '/layout', component: () => import('../views/layout'), children: [
      { path: '/home', component: () => import('../views/home') },
      { path: '/mine', component: () => import('../views/mine') },
      { path: '/search', component: () => import('../views/search') },
      { path: '/media', component: () => import('../views/media') },
    ]
  },
  { path: '/searchList/:key', component: () => import('../views/searchList') },
  { path: '/details/:artid', component: () => import('../views/details') },
  { path: '/person', component: () => import('../views/person') },
  { path: '/zhi', component: () => import('../views/zhi') },
  { path: '/', redirect: '/home' },
]

const router = new VueRouter({
  routes
})

export default router
