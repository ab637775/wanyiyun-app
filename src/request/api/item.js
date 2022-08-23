import service from "..";
// 定义获取歌单详情页数据的函数 
export function getMusicItem(id) {
  return service({
    method: 'Get',
    url:`/playlist/detail?id=${id}`
  })
}
// 定义获取歌单列表的函数
export function getMusicItemList(id) {
  return service({
    method: 'Get',
    url:`/playlist/track/all?id=${id}&limit=20&offset=0`
  })
}
// 定义获取歌单歌词的函数  /lyric?id=33894312
export function getMusicLyric(data) {
  return service({
    method: 'Get',
    url:`/lyric?id=${data}`
  })
}