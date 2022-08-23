<template>
  <NavTop></NavTop>
  <Carousel></Carousel>
  <IconList></IconList>
  <MusicList></MusicList>
</template>

<script>
import NavTop from '@/components/home/NavTop.vue'
import Carousel from '@/components/home/CarouselTop.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'
export default {
  name: 'HomeView',
  components: { 
    NavTop,
    Carousel,
    IconList,
    MusicList
  }
}
</script>

<style lang="less">

</style>
