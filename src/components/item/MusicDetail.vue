<template>
  <img :src="detailList.al.picUrl" alt="" class="bgimg">
  <div class="detailTop">
 <div class="detailTopLeft">
      <svg class="icon icon-white" aria-hidden="true"  @click="backToMusicList">
      <use xlink:href="#icon-zuojiantou"></use>
      </svg>
  <div class="detailTopContent">
     <Vue3Marquee style="color:white;">{{detailList.name}}</Vue3Marquee>
      <p class="singer-content">
            <span v-for="(item,index) in detailList.ar" :key="index"  >
                    <!-- {{detailList.ar.length}} -->
            <span v-if="index + 1 <= 2" class="singesrName">{{item.name}} </span> 
            <span v-if="(index + 1 < 2 && detailList.ar.length>1 && index + 1 - detailList.ar.length != 0)" class="singesrName">、</span>
          </span>
         <span v-if="detailList.ar.length > 2" class="singesrName">等</span>
         
           <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg> 
      </p>
</div>
</div>

<div class="detailTopRight">
        <svg class="icon icon-white" aria-hidden="true">
      <use xlink:href="#icon-13"></use>
  </svg>
</div>
  </div>
  <!-- 显示可旋转的唱片和指针以及歌曲封面 -->
  <div class="detailMiddle" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
    <img src="@/assets/cd.png" alt="" class="img_cd">
    <img :src="detailList.al.picUrl" alt="" class="img_ar" :class="{img_ar_actived:!isbtnShow,img_ar_paused:isbtnShow}" @click="isLyricShow=true">
  </div>
  <!-- 显示歌词 -->
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=false">
    <p v-for="item in lyric" :key="item" :class="{lyric_active:(currentTime*1000>=item.totalTime && currentTime*1000<item.pre)}">
      {{item.lrc}}
    </p>
  </div>
  <div class="detailFooter">
    <div class="detailFooter-top" >
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-w_xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-liebiao-"></use>
        </svg>
    </div>
    <!-- 显示进度条 -->
    <div class="detailFooter-middle">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="detailFooter-bottom">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="changeSong(-1)">
             <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="playMusic" v-if="isbtnShow">
             <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon icon-larger" aria-hidden="true" @click="playMusic" v-else >
             <use xlink:href="#icon-zanting1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="changeSong(1)">
             <use xlink:href="#icon-xiayigexiayishou" ></use>
        </svg>
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-zu"></use>
        </svg>
    </div>
  </div>
  
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import {mapMutations, mapState} from 'vuex'
export default {
  data() {
    return {
      isLyricShow:false,
      isChangeScroll:true
    }
  },
  computed:{
    ...mapState(['isDetailShow','lyricList','currentTime','playListIndex','playlist','duration']),
    lyric:function(){
      let arr;
      console.log(this.lyricList.lyric);
    if(this.lyricList.lyric){
      // 正则里不要加(\r\n)，不然歌词里的括号会被截断
     arr = this.lyricList.lyric.split(/[\r\n]+/).map((item,i)=>{
      let min = item.slice(1,3);
      let sec = item.slice(4,6);
      let mill = item.slice(7,10);
      let lrc = item.slice(11,item.length);
      let totalTime = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill);
      // 若mill只有两位数字
      if(isNaN(Number(mill))){
        mill = item.slice(7,9);
        lrc = item.slice(10,item.length);
        totalTime = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill);
      }
      // console.log(min,':',sec,':',mill,lrc);
      return {min,sec,mill,lrc,totalTime}
    })
    }
    // 判断这首歌是否为纯音乐，然后添加相关歌词属性
    if(typeof arr == 'undefined')
    {
      arr=[{min: "99", sec: "00", mill: "000", lrc: "纯音乐，请欣赏", totalTime: 5940000,pre: 5940001},{min: "",sec: "",mill: "",lrc: "",totalTime: NaN,pre: NaN}]
    }else{
      arr.forEach((item,i)=>{
      if (i === arr.length - 1 || isNaN(arr[i + 1].totalTime)) {
            item.pre = 100000;
      }else{
        item.pre= arr[i+1].totalTime
      }
    })

    }
    // console.log(typeof arr);
    console.log(arr);
    return arr
    }
  },
  mounted() {
    // let lyricArr = split(this.lyricList.lyric)
    console.log(this.lyricList.lyric);
    console.log('detailList',this.detailList);
    this.addDuratin();

    window.addEventListener('scroll',()=>{
            console.log('触发了scroll事件');
            this.isChangeScroll = false;
            setTimeout(()=>{
              this.isChangeScroll = true;
            },8000)
        })
  },
  watch:{
    currentTime(newValue){
      let p = document.querySelector('p.lyric_active');
      // let musicLyric = document.querySelector('.musicLyric');
      // let flag =true
      // console.log(p.offsetTop);
      // console.log([this.$refs.musicLyric]);
      console.log(this.$refs.musicLyric.scrollTop);
      if(p){
        //使用节流的方法自由查看歌词移动，每隔5秒歌词就能自动复位
        if(this.isChangeScroll){
          this.isChangeScroll = false
          setTimeout(()=>{
          this.isChangeScroll = true;
         if(p.offsetTop>300){
        // 自动调整歌词滚动条高度
        this.$refs.musicLyric.scrollTop = p.offsetTop - 250;
      }
          },5000)
        }
      //   if(p.offsetTop>300 && this.isChangeScroll == true){
      //    自动调整歌词滚动条高度
      //   this.$refs.musicLyric.scrollTop = p.offsetTop - 250;
      // }
      }
      // 歌曲走到末尾就切至下一首歌
      if(newValue == this.duration){
        this.changeSong(1);
          // this.updatePlayListIndex(this.playListIndex + 1);
          // if(this.playListIndex == this.playlist.length - 1){
          //       this.updatePlayListIndex(0);
          // }
      }
    }
  },
  components:{
    Vue3Marquee,
  },
  setup(props) {
    console.log(props);
  },
  // props:['detailList','playMusic','isbtnShow','addDuratin'],
  props:{
      detailList:{
        type:Object,
        default:()=>({})
      },
      playMusic:{
        type:Function,
        default:function(){}
      },
      isbtnShow:{
        type: Boolean,
        default: true
      },
      addDuratin:{
        type:Function,
        default:function(){}       
      }
  },
  methods: {
    backToMusicList(){
        this.updateIsDetailShow();
        this.isLyricShow = false
    },
    // 切歌
    changeSong(num){
      let index = this.playListIndex + num;
      if(index < 0){
        index = this.playlist.length-1;
      }else if(index == this.playlist.length){
        index = 0;
      }
       this.updatePlayListIndex(index);
    },
    ...mapMutations(['updateIsDetailShow','updateIsbtnShow','updatePlayListIndex'])
  },
}
</script>
<style lang="less" scoped>
     .icon-white{
        fill: white;
      }
     .bgimg{
       position: absolute;
       width: 100%;
       height: 100%;
       z-index: -99;
       filter: blur(.5rem) brightness(0.4);
       
     }
    .detailTop{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1rem;
      padding: .2rem;
 .detailTopLeft{
        display: flex;
        width: 4rem;
        justify-content: space-between;
        align-items: center;
 
    .detailTopContent{
          width: 3rem;
          height: 100%;

       .singer-content{
         display: flex;
         align-items: center;
          width: 100%;
          height: .4rem;
          overflow: hidden;
          white-space: nowrap;

        .singesrName{
        font-size: .3rem;   
        color: #c8c8c8;
      }
      .icon{
         width: .3rem;   
         height: .3rem;
         fill:#c8c8c8
      }
          }
        }
      }
    }
    .detailMiddle{
      position: relative;
      display: flex;
      width: 100%;
      height: 9rem;
      flex-direction: column;
      align-items: center;
      .img_needle{
        position: absolute;
        left: 46%;
        width: 2rem;
        height: 3rem;
        transform-origin: 0 0;
        transform: rotate(-13deg);
        transition: all 2s;
      }
      .img_needle_active{
        position: absolute;
        left: 46%;
        width: 2rem;
        height: 3rem;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
      }
      .img_cd{
        position: absolute;
        bottom:2.3rem;
        width: 5rem;
        height: 5rem;
        z-index: -1;
      }
      .img_ar{
        position: absolute;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        bottom: 3.14rem;
        animation: rotate_ar 10s linear infinite;
      }
      .img_ar_actived{
        animation-play-state: running;
      }
      .img_ar_paused{
        animation-play-state: paused;
      }
      @keyframes rotate_ar{
        0%{
           transform: rotate(0);
        }
        100%{
          transform: rotate(360deg);
        }
      }
    }
    .musicLyric{
      display: flex;
      flex-direction: column;
      // justify-content: space-around;
      align-items: center;
      overflow:scroll;
      width: 100%;
      height: 8rem;
      margin-top: .4rem;
      padding: 0 .2rem;
      color: #c8c8c8;
      p{
        text-align: center;
        margin-top: .4rem;
      }
      .lyric_active{
        color: #fff;
        font-size: .5rem;
      }
     
    }
  .detailFooter{
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    height: 5rem;
    flex-direction: column;
    bottom: 0;
    width: 100%;
    height: 3rem;
   .detailFooter-top{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 1rem;
      margin-bottom: 0.4rem;
      // background: red;
      padding: 0 .2rem;
      .icon{
        width: .6rem;
        height: .6rem;
        fill: #c8c8c8;
      }
    }
    .detailFooter-middle{
      width: 100%;
      flex: 1;
      .range{
        width: 100%;
        height: .06rem;
      }
    }
    .detailFooter-bottom{
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      height: 1.4rem;
      margin-top: 0.4rem;
      margin-bottom: .3rem;
      // background: lightblue;
      .icon{
        width: .5rem;
        height: .5rem;
        fill: #c8c8c8;
      }
      .icon:nth-child(3){
        width: 1rem;
        height: 1rem;
      }
    }
    }
 
</style>