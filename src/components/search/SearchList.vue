<template>
<!-- <div v-for="item in searchList_vux" :key="item">
  {{item}}
</div> -->
<div class="songs-list">
       <div class="listContent" v-for="(item,index) in searchList_vux" :key="item">    
        <div class="listIndex" @click="musChange(searchList_vux)" >{{index+1}}</div>
        <div class="songDetail" @click="musChange(item)">
          <p>{{item.name}}</p>
          <span v-for="(aurthor,index1) in item.artists" :key="aurthor">
            <span v-if="index1 + 1 <= 5" class="singesrName">{{aurthor.name}} </span> 
            <span v-if="(index1 + 1 < 5 && item.artists.length>1 && index1 + 1 - item.artists.length != 0)">、</span>
          </span>
          <span v-if="item.artists.length > 5" class="singesrName">等</span>
        </div>
           <svg class="icon" aria-hidden="true" v-if="item.mvid !== 0">
               <use xlink:href="#icon-shipin"></use>        
          </svg>
  
          <svg class="icon icon_list" aria-hidden="true">
               <use xlink:href="#icon-31liebiao"></use>        
          </svg>
      </div> 
</div>

</template>

<script>
import { mapState,mapMutations } from 'vuex';
import {getAlbum} from "@/request/api/home.js"
// import {getMusicLyric} from '@/request/api/item.js'
export default {
  computed:{
    ...mapState(['searchList_vux','playlist'])
  },
  methods: {
  async musChange(item){
    const {data:res} = await getAlbum(item.album.id)
    //  console.log('处理后的temp',temp);
    // console.log('搜索专辑结果',res);

    // 测试数据调试用
    // let temp = []
    // this.searchList_vux.forEach(async val=>{
    //   console.log(val.album.id);
    //    let {data:res} = await getAlbum(val.album.id)   
    //    let obj = res.album
    //    obj.al = obj
    //    obj.al.picUrl = obj.picUrl
    //    obj.ar = obj.artists
    //    console.log(obj);
    //    temp.push(obj)
    //   })

    // 歌词显示调试用
    // const {data:res_ly} = await getMusicLyric(item.id)
    // console.log('搜索歌词结果',res_ly.lrc.lyric);
    item.al = item.album
    item.al.picUrl = res.album.picUrl
    item.ar = res.album.artists
    console.log('item',item);

    this.pushPlayList(item)
    this.updatePlayListIndex(this.playlist.length-1)
    // console.log('this.playlist.length-1',this.playlist.length-1);  
    console.log('playlist',this.playlist);
    },


      ...mapMutations(['updatePlayList','updatePlayListIndex','pushPlayList','updatelyricList'])
  },
  mounted() {
    // console.log(this.searchList_vux);
  },
  updated(){
        console.log(this.searchList_vux);
  }

}
</script>

<style lang="less" scoped>
.songs-list{
  width: 100%;
  margin-bottom: 1.40rem;
  .listContent{
    display: flex;
    width: 100%;
    height: 1.8rem;
    // background-color: lightblue;
    padding:.3rem .3rem 0 0;
    
    .listIndex{
      width: 1rem;
      height: 100%;
      text-align: center;
      // margin-right: .4rem;
      line-height: 0.8rem;
    }
    .songDetail{
      flex: 1;
         overflow: hidden; 
      p{
        font-weight: 600;
        font-size: .32rem;  
        margin-bottom: .06rem;
      }
    .singesrName{
        font-size: .24rem;
        color: gray;
    }
    }
    .icon_list{
     margin-left: .4rem;
    }
  }
}
</style>