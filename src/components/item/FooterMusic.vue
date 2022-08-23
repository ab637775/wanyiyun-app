<template>
  <div class="footer-container">
    <img :src="playlist[playListIndex].al.picUrl" alt="" class="musicIcon" @click="updateIsDetailShow">
      <div class="footer-content" @click="updateIsDetailShow">
      <p>{{playlist[playListIndex].name}}</p>
      <span>横滑可以切换上下首哦</span>
         <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playListIndex].id}.mp3`"></audio>
      </div>
          <div class="footerRight" >
            <!-- 播放按键默认显示 -->
              <svg class="icon" aria-hidden="true" @click="playMusic"  v-if="isbtnShow">
                   <use xlink:href="#icon-bofanganniu"></use>        
              </svg>
              <!-- 暂停按键切换显示 -->
              <svg class="icon" aria-hidden="true" @click="playMusic"  v-else>
                   <use xlink:href="#icon-zanting"></use>        
              </svg>
              <svg class="icon" aria-hidden="true">
                   <use xlink:href="#icon-zu"></use>        
              </svg>
         </div>
         <!-- 弹出层 显示歌曲详情 -->
        <van-popup v-model:show="isDetailShow" position="right" :style="{ height: '100%',width:'100%' }">
        <MusicDetail :detailList="playlist[playListIndex]" :playMusic="playMusic" :isbtnShow="isbtnShow" :addDuratin="addDuratin"></MusicDetail>
        </van-popup>
  </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
  data() {
    return {
    }
  },
  components:{
    MusicDetail
  },
  computed:{
  ...mapState(['playlist','playListIndex','isbtnShow','isDetailShow'])
  },
  mounted(){
    // console.log(this.$refs);
       this.currentTimeUpdate();
  },
  updated(){
        this.$store.dispatch("getLyric",this.playlist[this.playListIndex].id);
        this.addDuratin();
  },
  methods: {
    playMusic(){
      // 如果处于暂停状态，点击按钮就让它播放,图标变成暂停图标，反之亦然
      console.log([this.$refs.audio]);
      if(this.$refs.audio.paused){
      this.$refs.audio.play();
      this.updateIsbtnShow(false);
      // document.querySelector('audio')
       this.currentTimeUpdate();
      }else{
           this.$refs.audio.pause();
           this.updateIsbtnShow(true);
      }
      console.log('playlist[playListIndex]',this.playlist[this.playListIndex]);
    },
    // 定义audio标签播放数据更新函数，用来监听currentTime的变化，从而显示对应时间段的歌词，实现歌词滚动效果
    currentTimeUpdate(){
      this.$refs.audio.addEventListener('timeupdate',()=>{
        this.updateCurrentTime(this.$refs.audio.currentTime)
        // console.log('ok');
      })
    },
    addDuratin(){
    this.updateDuration(this.$refs.audio.duration)
    },
      ...mapMutations(
        ['updateIsbtnShow',
        'updateIsDetailShow',
        'updateCurrentTime',
        'updateDuration',
        ]),
  },
  watch:{
    playListIndex(){
      this.$refs.audio.autoplay = true
      if(this.$refs.audio.paused){
      this.updateIsbtnShow(false);
      }
      },
      playlist(){
        if(this.isbtnShow){
            this.$refs.audio.autoplay = true
            this.updateIsbtnShow(false);
        }
      }

    }
  }
</script>
<style lang="less" scoped>
.footer-container{
  position: fixed!important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0!important;
  width: 100%;
  height: 1.4rem;
  background-color: white;
  border-top: 1px solid #999;
  padding: 0 .2rem;
  // margin-top:.6rem;

    .musicIcon{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .footer-content{
    flex: 1;
    padding-left: .2rem;
    overflow: hidden;

      p{
        overflow: hidden;
        white-space:nowrap; 
        font-weight: 600;
        font-size: .28rem;  
        margin-bottom: .06rem;
      }
    span{
        font-size: .24rem;
        color: gray;
    }
  }
  .footerRight{
    .icon:last-child{
      margin-left: .2rem;
    }
    .icon{
      width: .6rem;
      height: .6rem;

    }
  }
  

}
</style>