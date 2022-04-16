import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from "../store"


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/index.vue'),
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

router.beforeEach((to,from,next) => {
  const token = store.state.token
  if(router.getRoutes().length == 2){
    let arr = store.state.routerData
    arr.forEach(item => {
      router.addRoute('index',{
        path: item.path,
        name: item.name,
        component: () => import(/* webpackChunkName: "[requst]" */ `../views/${item.name}/index.vue`)
      })
    })
  }

  if(!token && to.name != 'login'){
    next('/login')
  }else if(token && to.name == 'login'){
    next('/')
  }
  if(to.name == 'index'){
    next(store.state.routerData[0].path)
  }
  if(!to.matched.length){//解决刷新后空白
    router.replace(to.path)
  }
  next()
})
export default router
