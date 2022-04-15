import $http from './http'
import { RuleForm } from '@/types/loginTypes'

export function login<R,T>(data:RuleForm){
  return $http.request<R,T>({
    url:'/login',
    method:'post',
    data
  })
}
