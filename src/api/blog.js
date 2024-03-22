import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

//获取博客
export function getBloglist(params){
  return request({
    method: 'get',
    url:`${baseURL}/blog/list`,
    params
  })
}
//删除博客
export function deleteBlogItem(params){
  return request({
    method: 'get',
    url:`${baseURL}/blog/deleteBlogItem`,
    params
  })
}