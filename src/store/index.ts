import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {ResUserInfo} from '@t/loginTypes'

interface State {
  token:string
  userInfo:ResUserInfo
}
let state:State = {
  token:'',
  userInfo:{
    userName:'',
    token:'',
    authority:[]
  }
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
