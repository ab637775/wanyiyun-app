<template>
  <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
      <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input type="text" name="" id="" placeholder="陈奕迅" class="searchBox" v-model="keyWord" @keydown.enter="sendKeyWord">
  </div>
  <div class="searchTitle">
   <span>历史</span>
        <svg class="icon" aria-hidden="true" @click="removeKeyWord">
      <use xlink:href="#icon-icon-shanchu"></use>
      </svg>
  </div>
  <div class="searchHistory">
      <span v-for="item in keyWordList" :key="item" class="searchKeyWord" @click="gotoKeyWord(item)">
        {{item}}
      </span>
  </div>
  <!-- this.searchList -->
    <SearchList></SearchList>
</template>
<script>
import SearchList from '@/components/search/SearchList.vue'
import {getSearchMusic} from '@/request/api/home.js'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
       keyWordList:[],
       keyWord:'',
       searchList:[]
    }
  },
  components:{
      SearchList
  },
  setup() {
  },
  mounted(){
   this.keyWordList = JSON.parse(localStorage.getItem("searchKWList")) || []
  },
  methods:{
    async sendKeyWord(){
      // 利用正则表达式过滤纯空格输入内容
      const reg1 = /(^\s+$)/
      if(reg1.test(this.keyWord)){
       return
      }
      this.keyWordList.unshift(this.keyWord.trim());
      // 利用Set来去重
      this.keyWordList = [...new Set(this.keyWordList)]
      // 固定长度，总记录超过一定长度就删除旧的记录,从最早的记录开始删除
      if(this.keyWordList.length > 10){
        this.keyWordList.splice(this.keyWordList.length-1,1);
      }
      localStorage.setItem("searchKWList",JSON.stringify(this.keyWordList));
      // 调用搜索接口函数
      let res = await getSearchMusic(this.keyWord.trim());
      // console.log(res);
      this.searchList = res.data.result.songs;
      console.log(this.searchList);
      this.updateSearchList_vux(this.searchList);
      this.keyWord="";
    },
    removeKeyWord(){
      localStorage.removeItem("searchKWList");
      this.keyWordList=[];
    },
    async gotoKeyWord(item){
      let res = await getSearchMusic(item);
      this.searchList = res.data.result.songs;
      this.updateSearchList_vux(this.searchList);
    },
    ...mapMutations(['updateSearchList_vux'])
  }
}
</script>
<style lang="less" scoped>
 .searchTop{
   display: flex;
   align-items: center;
   width: 100%;
   height: 1rem;
   padding: 0 .2rem;
   .icon{
     width: .4rem;
     height: .4rem;
     margin-right: .2rem;
     
   }
   .searchBox{
     width: 90%;
     border: none;
     border-bottom: 1px solid #999;
     padding: .1rem;
   }

 }
   .searchTitle{
     display: flex;
     justify-content: space-between;
     width: 100%;
     padding: .2rem;
    span{
       font-weight: 700;
     }
      .icon{
      width: .45rem;
      height: .45rem;
    }
  }
    .searchHistory{
     width: 100%;
     padding: .2rem;

    .searchKeyWord{
      display: inline-block;
      padding: .1rem .2rem;
      background-color: #c8c8c8;
      border-radius: .4rem;
      margin: .1rem .1rem;
    }

   }
</style>