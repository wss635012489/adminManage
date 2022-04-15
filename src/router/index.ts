import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/index.vue'),
    children:[
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/index.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import(/* webpackChunkName: "order" */ '../views/order/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
