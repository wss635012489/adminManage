import $http from './http'

export function login<R,T>(data:any){
  return $http.request<R,T>({
    url:'/login',
    method:'post',
    data
  })
}
export function getUer<R,T>(){
  return $http.request<R,T>({
    url:'/users',
    method:'get',
  })
}
export function getUerDetail<R,T>(id:number){
  return $http.request<R,T>({
    url:'/users/' + id,
    method:'get',
  })
}
export function getPosts<R,T>(){
  return $http.request<R,T>({
    url:'/posts',
    method:'get',
  })
}
