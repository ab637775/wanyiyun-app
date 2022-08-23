import service from "..";
// 定义获取轮播图接口的函数
export function getTopBanner() {
  return service({
    method: 'GET',
    url:'banner?type=2'
  })
}
// 定义获取音乐推荐列表接口的函数
export function getMusicList() {
  return service({
    method: 'GET',
    limit: 10,
    url:'personalized?limit=10'
  })
}
// 定义获取搜索内容的接口函数
export function getSearchMusic(data) {
  return service({
    method: 'GET',
    url:`/search?keywords=${data}`
  })
}
// 定义获取登录信息的接口函数
export function getLoginInfo(data) {
  return service({
    method: 'GET',
    url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}
// 定义获取用户信息的接口函数
export function getUserInfo(data) {
  return service({
    method: 'GET',
    url:`/user/detail?uid=${data}`
  })
}

// 定义获取获取专辑内容的接口函数
export function getAlbum(data) {
  return service({
    method: 'GET',
    url:`/album?id=${data}`
  })
}