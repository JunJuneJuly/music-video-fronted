
import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

//获取歌单
export function getPlaylist(params){
  return request({
    method: 'get',
    url:`${baseURL}/playlist/list`,
    params
  })
}
//获取歌单详情
export function getByIdDetail(params){
  return request({
    method: 'get',
    url:`${baseURL}/playlist/getById`,
    params
  })
}
//更新歌单
export function updatePlaylist(data){
  return request({
    method: 'post',
    url:`${baseURL}/playlist/updatePlaylist`,
    data
  })
}
//删除歌单
export function deletePlaylist(params){
  return request({
    method: 'get',
    url:`${baseURL}/playlist/deleteById`,
    params
  })
}