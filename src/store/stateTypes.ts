import {ResUserInfo} from '@t/loginTypes'

export type RouterData = {
  path: string
  name: string
  meta?:{
    title:string
    [K:string]:any
  }
  [K:string]:any
}

export interface State {
  token:string
  userInfo:ResUserInfo,
  routerData:RouterData[]
}

