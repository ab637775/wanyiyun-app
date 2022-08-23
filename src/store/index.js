import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item.js'
import { getLoginInfo } from '@/request/api/home.js'
export default createStore({
  state: {
    playlist: [{
      al: {
        id: 2685081,
        name: "Remedy",
        pic: 6620159511469878,
        picUrl: "https://p1.music.126.net/RHeFa66bS0IYKDKOjUJyPA==/6620159511469878.jpg",
        // pic_str: "109951164439091720"
      },
      ar: [{ id: 1024390, name: "Reagan James", tns: Array(0), alias: Array(0) }],  //作者信息
      id: 27836653,   //歌曲的播放id
      name: "Where Did You Go",    // 歌曲名称
      lyricList: {}   //歌词列表
    }],
    avatarAndName:{}, // 深层次的creator数据
    searchList_vux: {},
    // tempVuex:[],//搜索后的歌单数据暂存
    currentTime: 0, // 歌曲当前时间
    duration: 0, // 歌曲总时长
    playListIndex: 0,//歌曲索引默认为0
    isbtnShow: true, // 控制暂停图标显示
    isDetailShow: false, // 控制歌曲详情弹出层
    isLogin: false,  //判断是否登录
    isFooterShow: true, // 判断底部组件是否显示
    token: '', // 登录标志
    userInfo: {} // 用户详情 
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow(state,value) {
      state.isbtnShow = value
    },
    updatePlayList(state, value) {
      state.playlist = value
      // console.log(state.playlist);
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    updateIsDetailShow(state) {
      state.isDetailShow = !state.isDetailShow
    },
    updatelyricList(state, value) {
      state.lyricList = value
    },
    updateCurrentTime(state, value) {
      state.currentTime = value
      console.log(state.currentTime);
    },
    updateDuration(state,value) {
      state.duration = value
    },
    updateSearchList_vux(state, value) {
      state.searchList_vux = value
    },
    pushPlayList(state, value) {
      state.playlist.push(value)
    },
    updateIsLogin(state, value) {
      state.isLogin = value
    },
    updateToken(state, value) {
      state.token = value
      localStorage.setItem('token',state.token)
    },
    updateUserInfo(state, value) {
      state.userInfo = value
      // console.log(state.userInfo);
    },
    updateAvatarAndName(state, value) {
      state.avatarAndName = value
    },
    // updatePlayListFromSearchList(state, value) {
    //   state.playlist.al.id = value.album.id
    //   state.playlist.al.name = value.album.alias[0]
    //   state.playlist.al.pic = value.album.picId
    //   state.playlist.al.picUrl = value.album.artists.img1v1Url
    //   state.playlist.ar = value.album.artists
    //   state.name = value.name
    //   state.id = value.id
    // }

  },
  actions: {
    getLyric: async function (context, value) { 
      let res = await getMusicLyric(value);
      // console.log('显示的歌词',res);
      context.commit("updatelyricList",res.data.lrc)
    },
    getLogin: async function (context, value) { 
      let res = await getLoginInfo(value);
      // console.log(res);
      return res
    },
  },
  modules: {
  }
})
