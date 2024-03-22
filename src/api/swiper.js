import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

//获取轮播图
export function getSwiperlist(){
  return request({
    method: 'get',
    url:`${baseURL}/swiperlist/list`,
  })
}
//删除轮播图
export function deleteSwiper(params){
  return request({
    method: 'get',
    url:`${baseURL}/swiperlist/deleteSwiper`,
    params
  })
}