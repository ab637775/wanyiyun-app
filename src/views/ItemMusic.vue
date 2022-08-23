<template>
<!-- 父组件向子组件传递props自定义属性 -->
<ItemMusicTop :musiclist="state.musiclist"></ItemMusicTop>
<ItemMusicList :songs="state.songs" :subscribedCount="state.musiclist.subscribedCount"></ItemMusicList>
</template>

<script>
import ItemMusicTop from "@/components/item/ItemMusicTop.vue"
import ItemMusicList from "@/components/item/ItemMusicList.vue"
import {useRoute} from 'vue-router'
import {getMusicItem, getMusicItemList} from '@/request/api/item.js'
import {reactive,onMounted} from 'vue'
export default {
  name:"ItemMusic",
  components:{
    ItemMusicTop,
    ItemMusicList
  },
  setup(){
    const state = reactive({
      musiclist:{},
      songs:{}
    })
    
    onMounted(async ()=>{
      // 获取携带来的id参数
      const id =  useRoute().query.id;
      // console.log(id);
      // 获取歌单详情
      const {data:res} = await getMusicItem(id);
      // 获取歌单列表信息
      const {data:res_list} = await getMusicItemList(id);
      state.musiclist = res.playlist
      state.songs = res_list.songs
      console.log( state.musiclist);
      console.log(state.songs);
      // 为了防止页面刷新时，axios获取接口数据的速度跟不上页面渲染速度，所以需要把数据缓存到本地的sessiionStorage中
      sessionStorage.setItem('itemDetail',JSON.stringify(state))
    })

    return {state}
    
  }
}
</script>

<style lang="less" scoped>

</style>