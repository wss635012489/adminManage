import axios,{AxiosResponse} from 'axios';
import { ElMessage } from 'element-plus'

// interface ResponseData<T = any> {
//   data:T,
//   code:number,
//   msg:string
// }

const $http = axios.create({
  //baseURL:'https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api',
  baseURL:'http://jsonplaceholder.typicode.com',
  timeout:10000,
  headers:{
      "Content-Type":"application/json;charset=utf-8"
  }
})

// $http.interceptors.response.use((response:AxiosResponse<ResponseData>) => {
//   if(response.data.code != 200){
//     ElMessage.error(response.data.msg)
//   }else {
//     return response.data.data
//   }
// },(err:any) => {
//   console.log('请求报错',err)
//   ElMessage.error('服务器错误')
// })

$http.interceptors.response.use((response:AxiosResponse) => {
  return response.data
},(err:any) => {
  console.log('请求报错',err)
  ElMessage.error('服务器错误')
})
export default $http