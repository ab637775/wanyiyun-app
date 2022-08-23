import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/itemmusic',
    name: 'ItemMusic',
    component: () => import(/* webpackChunkName: "itemmusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin || store.state.token || localStorage.getItem('token')) {
         next()
      } else {
        next('/login')
       }
    },
    component: () => import(/* webpackChunkName: "UserInfo" */ '../views/UserInfo.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局守卫用于控制底部组件是否显示
router.beforeEach((to, from)=>{
  if (to.path == '/login') {
    store.state.isFooterShow = false
  } else {
    store.state.isFooterShow = true
  }
})

export default router
