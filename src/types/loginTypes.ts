import {Router} from '@t/routerTypes'
export interface RuleForm {
  userName:string,
  passWord:string
}
export interface State {
  ruleForm:RuleForm
}
export interface ResUserInfo {
  token:string
  authority?:Router[]
  userName:string
}