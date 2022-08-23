<template>
  <div class="MusicList">
    <div class="MusicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="MusicContent">
      <van-swipe :loop="false" :width="170" :show-indicators="false" class="MusicList-Swipe">
      <van-swipe-item v-for="(item,index) in state.MusicArr" :key="item.id" class="MusicList-item">
        <!-- 定义路由链接 -->
        <!-- 跳转到ItemMusic组件 显示对应歌单 -->
        <router-link :to="{path:'/itemmusic',query:{id: item.id}}" @click="saveDetail(index)">
          <img :src="item.picUrl" alt="">
          <div class="PlayCount">
               <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang101-white-copy"></use>
                </svg>
             <span>{{NumFormat(item.playCount)}}</span> 
            </div>
           <span>{{item.name}}</span>
        </router-link>
      </van-swipe-item>
</van-swipe>
    </div>
  </div>
</template>

<script>

import {getMusicList,getAlbum} from "@/request/api/home.js"
import {getMusicItem} from '@/request/api/item.js'
import {reactive,onMounted} from 'vue'
import { mapMutations, mapState } from 'vuex'

export default {
  // VUE2调用API函数的方法
    // data() {
    //   return {
    //     MusicArr:[]
    //   }
    // },
    // methods:{
    //   async getNewMusicList(){
    //     const {data:res} = await getMusicList();
    //     console.log(res.result);
    //     this.MusicArr = res.result
    //   },
    //   NumFormat(num){
    //      if(num>= 100000000) {
    //        return num = (num/100000000).toFixed(1)+'亿'
    //      }else if(num>= 10000){
    //          return num = (num/10000).toFixed(1)+'万'
    //      }else if(num <10000){
    //        return num
    //      }
    //  }
    // },
    // mounted(){
    //    this.getNewMusicList();
    // }

    // vue3调用API函数的方法
    name:"MusicList",
    computed:{
      ...mapState(['avatarAndName'])
    },
    data() {
      return {
        
      }
    },
    setup() {
      const state = reactive({
         MusicArr:[]
      });
      function NumFormat(num){
         if(num>= 100000000) {
           return num = (num/100000000).toFixed(1)+'亿'
         }else if(num>= 10000){
             return num = (num/10000).toFixed(1)+'万'
         }else if(num <10000){
           return num
         }
     }
     onMounted(async ()=>{
       const {data:res} = await getMusicList();
        console.log('获取歌单列表',res.result);
        state.MusicArr = res.result
        const {data:test} = await getAlbum(6434)
        console.log('测试获取专辑',test);
     })
      return{state,NumFormat}
    },
   methods: {
     ...mapMutations(['updateAvatarAndName']),
    async saveDetail(index){
        console.log('点击的列表索引',index);
        const {data:res} = await getMusicItem(this.state.MusicArr[index].id);
        console.log('点进的',res.playlist);
         sessionStorage.setItem('findMusicList',JSON.stringify(res.playlist))
        //  console.log(res.playlist.creator);
        //  由于层级较深，故点击时把歌单上传者的昵称和头像数据存放到vuex中，在进入歌单页时直接取出调用
        this.updateAvatarAndName(res.playlist.creator)

    // console.log(this.state.MusicArr[index]);
    }
  },
}
</script>

<style lang="less" scoped>
    .MusicList{
      width: 100%;
      height: 5rem;
      margin-bottom: .8rem;
      padding: .2rem;
      .MusicTop{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: .6rem;
        margin-bottom: .2rem;
      .title{
        font-size: .4rem;
        font-weight: 900;
        }
      .more{
        border:.02rem solid #ccc;    
        text-align:center;
        line-height: .6rem;
        padding: 0 .2rem;
        border-radius: .4rem;
      }
      }
      .MusicContent{
        width: 100%;
        height: 5rem;

        .MusicList-Swipe{
          height: 100%;
      
          .MusicList-item{
              position:relative;    
              padding: 0 .2rem;
              .PlayCount{
               position:absolute;
               top:.08rem;
               right:.28rem;
               z-index: 100;
               width: 1.6rem;
               height: .45rem;
               line-height: .5rem;
               text-align: center;
               border-radius: .2rem ;
               background-color: rgba(0, 0, 0, .3);
               color: white;
                  .icon {
                   width: .3rem;
                    height: .3rem;
               }
               span{
                  margin-left: .08rem;
               }             
              }
          }
           img{
             width: 100%;
             border-radius: .2rem;
             height: 3rem;
           }
        }
      }
    }
</style>