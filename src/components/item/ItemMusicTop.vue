<template>
  <div class="item-top-container">
    <img :src="musiclist.coverImgUrl" class="bgImg">
    <div class="itemTopLeft">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
      <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemTopRight">
      <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="item-middle-container">
    <div class="coverImg">
      <img :src="musiclist.coverImgUrl" alt="">
              <div class="PlayCount">
               <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang101-white-copy"></use>
                </svg>
             <span>{{NumFormat(musiclist.playCount)}}</span> 
            </div>
    </div>
    <div class="middleRight">
      <p class="music_title">{{musiclist.name}}</p>
      <div class="userInfo">

        <!-- <img :src="musiclist.creator.avatarUrl" alt="">
        <span>{{musiclist.creator.nickname}}</span> -->

        <!-- <img :src="uploaderInfo.avatarUrl" alt="">
        <span>{{uploaderInfo.nickname}}</span> -->

        <img :src="avatarAndName.avatarUrl" alt="">
        <span>{{avatarAndName.nickname}}</span>

        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg> 
      </div>
      <div class="bottomRight">
        <p>{{musiclist.description}}</p>
       <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg> 
      </div>
    </div>
  </div>
  <div class="item-bottom-container">
       <div class="IconItem">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <span>{{musiclist.commentCount}}</span>
    </div>
    <div class="IconItem">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-13"></use>
        </svg>
        <span>{{musiclist.shareCount}}</span>
    </div>
    <div class="IconItem">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-w_xiazai"></use>
        </svg>
        <span>下载</span>
    </div>
    <div class="IconItem">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name:"ItemMusicTop",

  computed:{
  ...mapState(['avatarAndName']),
  // 已废弃 后续使用updated来更新每次进入的歌单数据
  // 因为musiclist.creator的层级比较深，当页面来不及更新时，就需要从sessionStorage中获取数据。因此，在点击进入歌单页面后，就存储此歌单列表数据，再使用vuex更新仓库里的数据再利用计算属性来使用
    // uploaderInfo(){
    //   //  if((!this.musiclist.creator)){
    //   this.updateAvatarAndName(JSON.parse(sessionStorage.getItem('findMusicList')).creator)
    // // }
    // return this.avatarAndName
    // }
  },
  methods:{
  ...mapMutations(['updateAvatarAndName'])
  },
  // props
  setup() {
         function NumFormat(num){
         if(num>= 100000000) {
           return num = (num/100000000).toFixed(1)+'亿'
         }else if(num>= 10000){
             return num = (num/10000).toFixed(1)+'万'
         }else if(num <10000){
           return num
         }
     }

  return {NumFormat}
  },
    props:['musiclist'],
  created(){
    this.updateAvatarAndName(JSON.parse(sessionStorage.getItem('findMusicList')).creator)
  },
  // updated(){
    // 会重复递归调用报错
  //     console.log('存放的creator', JSON.parse(sessionStorage.getItem('findMusicList')).creator);
  //       this.updateAvatarAndName(JSON.parse(sessionStorage.getItem('findMusicList')).creator)
  // }
}
</script>
<style lang="less" scoped>
.item-top-container{
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 1rem;

  // background: blue;
  .itemTopLeft,.itemTopRight{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .2rem;
    width: 25%;
    height: 100%;
    span{
      color: white;
      font-size: .4rem;
    }
    .icon{
      fill: white;
      font-size: .4rem;
    }
  }
  .bgImg{
    position: absolute;
    width: 100%;
    height: 8rem;
    z-index: -1;
    filter: blur(.5rem) brightness(0.7);
    transform: translateY(-1.9rem);
  }
}

.item-middle-container{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 3.5rem;
  padding: .2rem;
  // background: red;
  .coverImg{
    position: relative;
    width: 3rem;
    height: 3rem;
    img{
      width: 100%;
      height: 100%;
      border:.02rem solid transparent; 
      border-radius: .4rem;
    }
   .PlayCount{
               position:absolute;
               top:.14rem;
               right:.16rem;    
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
  .middleRight{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 4rem;
    height: 3rem;
    margin-left:.4rem;
    .music_title{
         color: white;
         font-weight: 900;
    }
    .userInfo{
      display: flex;
      margin:.2rem 0;
      align-items: center;     
      img{
        width: .7rem;
        height: .7rem;
        border: .02rem solid transparent;
        border-radius: 50%;
      }
      span{
        margin-left: .1rem;
        color: #c8c8c8;
 
      }
        .icon{
            width: .3rem;
            height: .3rem;
            fill:#c8c8c8; 
        }
    }
  }
  .bottomRight{
    display: flex;
    width: 100%;
    height: 1rem;
    color: #c8c8c8;
    p:nth-child(1){
      width: 80%;
      height: 100%;
      overflow: hidden;
      font-size: .25rem;
    } 
    p:nth-child(2){
      width: 20%;
      height: 100%;
      text-align: center;
      line-height: 1rem;
    } 
    .icon{
      width: .3rem;
      height: .3rem;
      fill:#c8c8c8;
    }
  }
}
.item-bottom-container{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 1.5rem;
  margin-bottom: .6rem;
  // background-color: lightblue;
  margin-top:.1rem;
      .IconItem{
        display: flex;
        width: 25%;
        flex-direction: column;
        align-items: center;
        height: 80%;
        color: white;
        .icon{
          width: .6rem;
          height: .6rem;
          fill: white;
        }
        span{
          margin-top:.1rem;
        }
      }
}
</style>