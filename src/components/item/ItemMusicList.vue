<template>
  <div class="songs-list">
    <div class="listTop">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <div class="listTopTitle">
          <span>播放全部</span>
          <span>(共{{songs.length}}首)</span>
        </div>
        <div class="subscribe-box">
          <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-jiahao-white-copy"></use>        
        </svg>
           <span>收藏({{subscribedCount}})</span>
        </div>
    </div>
    <div class="listContent" v-for="(item,index) in songs" :key="item.al.id">
      
      <div class="listIndex" @click="musChange(index)" >{{index+1}}</div>
      <div class="songDetail" @click="musChange(index)">
        <p>{{item.name}}</p>
        <span v-for="(aurthor,index1) in item.ar" :key="aurthor.id"  >
          <span v-if="index1 + 1 <= 5" class="singesrName">{{aurthor.name}} </span> 
          <!-- {{item.ar.length}}    -->
          <span v-if="(index1 + 1 < 5 && item.ar.length>1 && index1 + 1 - item.ar.length != 0)">、</span>
        </span>
        <span v-if="item.ar.length > 5" class="singesrName">等</span>
      </div>
         <svg class="icon" aria-hidden="true" v-if="item.mv !== 0">
             <use xlink:href="#icon-shipin"></use>        
        </svg>

        <svg class="icon icon_list" aria-hidden="true">
             <use xlink:href="#icon-31liebiao"></use>        
        </svg>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name:"ItemMusicList",
  setup(props) {
    console.log(props);
// 对象转数组，想要转成什么字段根据需求
// function fmObjToArr (object) {
//   let arr = []
//       var i = 0;
//       for (var k in object) {
//          arr[i] = object[k];
//          i++;
//       }
//     arr.push('结束循环了')
//     console.log(arr);
//     return arr
 
// }
    return{}
  },
  props:['songs','subscribedCount'],
  methods: {
    musChange(index){
    this.updatePlayList(this.songs)
    this.updatePlayListIndex(index)
    },
      ...mapMutations(['updatePlayList','updatePlayListIndex'])
  },
  mounted(){
    // console.log(this.$refs.audio);
  }

}
</script>
<style lang="less" scoped>
.songs-list{
  width: 100%;
  margin-bottom: 1.40rem;
  .listTop{
    display: flex;
    // justify-content: ;
    align-items: center;
    width: 100%;
    height: 1.2rem;
    padding: 0 .2rem ;
    margin-bottom: .3rem;
    border-top-left-radius: .4rem;
    border-top-right-radius: .4rem;
    background-color: white;
    // margin-bottom: .2rem;
    .icon{
      width: .5rem;
      height: .5rem;
    }
    .listTopTitle{
      flex: 1;
      padding-left:.4rem;
      span:nth-child(1){
        font-weight: 600;
        font-size: .32rem;  
      }
      span:nth-child(2){
        font-size: .1rem;
        color: gray;
      }
    }
    .subscribe-box{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38%;
      height: 1rem;
      background-color: red;
      border-radius: 1rem;
      .icon{
        width: .35rem;
        height: .35rem;

      }
      span{
        margin-left:.1rem;
        color: white;
        font-size: .3rem;
      }
    }
  }
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