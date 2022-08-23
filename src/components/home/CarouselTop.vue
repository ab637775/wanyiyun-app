<template>
  <div id="CarouselTop">
   <van-swipe :autoplay="3000" lazy-render>
  <van-swipe-item v-for="image in state.images" :key="image">
    <img :src="image.pic" />
  </van-swipe-item>
</van-swipe>
  </div>
</template>

<script>
import {reactive,onMounted} from 'vue'
import { getTopBanner } from '@/request/api/home.js'
export default {
  name:"CarouselTop",
    setup() {
    const state = reactive ({
      images:[]
    })

    onMounted(async () => {
    const { data: res } = await getTopBanner();
    // console.log(res);
    state.images = res.banners
  })
    return { state };
  },
 
}
</script>

<style lang="less">
#CarouselTop{
.van-swipe{
  width: 100%;
  height: 3rem;
  .van-swipe-item{
  padding: 0 .2rem;
  img{
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
  }
  }
  .van-swipe__indicator--active{
    background-color: rgb(219,130,130);
  }
}
}

</style>