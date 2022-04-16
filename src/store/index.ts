import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {State} from './stateTypes'
import {ResUserInfo} from '@t/loginTypes'



let state:State = {
  token:'',
  userInfo:{
    userName:'',
    token:'',
    //authority:[]
  },
  routerData:[{
    path:'/user',
    name:'user',
    meta: { 
      title:'用户列表'
     }
  },{
    path:'/article',
    name:'article',
    meta: { 
      title:'文章列表'
     }
  },
  {
    path:'/map',
    name:'map',
    meta: { 
      title:'地图'
     }
  }]
}
//const storage:Storage = window.sessionStorage
export default createStore({
  state,
  mutations:{
    SET_TOKEN(state:State,token:string){
      state.token = token
    },
    SET_USERINFO(state:State,userInfo:ResUserInfo){
      state.userInfo = userInfo
    }
  },
  plugins:[createPersistedState({
    storage:window.sessionStorage
  })]
})
