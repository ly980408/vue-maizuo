import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Films from '@/views/Films.vue'
import NowPlaying from '@/views/Films/NowPlaying.vue'
import ComingSoon from '@/views/Films/ComingSoon.vue'
import Cinemas from '@/views/Cinemas.vue'
import Center from '@/views/Center.vue'
import City from '@/views/City.vue'
import Detail from '@/views/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/films',
    component: Films,
    children: [
      {
        path: 'nowplaying',
        component: NowPlaying
      },
      {
        path: 'comingsoon',
        component: ComingSoon
      },
      {
        path: '',
        redirect: 'nowplaying'
      }
    ]
  },
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/detail/:filmId', // 动态路由
    name: 'mydetail',
    component: Detail
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '*',
    redirect: '/films'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
