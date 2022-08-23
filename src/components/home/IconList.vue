<template>
  <div class="IconList">
    <div class="IconItem">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-tuijian"></use>
        </svg>
        <span>每日推荐</span>
    </div>
    <div class="IconItem">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-zhibo"></use>
        </svg>
        <span>私人FM</span>
    </div>
    <div class="IconItem">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-gedan"></use>
        </svg>
        <span>歌单</span>
    </div>
    <div class="IconItem">
        <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-paihangbang"></use>
        </svg>
        <span>排行榜</span>
    </div>
  </div>
</template>
<script>
export default {
  name:"IconList"
}
</script>
<style lang="less" scoped>
  .IconList{
     display: flex;
     justify-content: space-around;
     align-items: center;
     width: 100%;
     height: 2rem;
     margin-top:.4rem;
      .IconItem{
        display: flex;
        width: 25%;
        flex-direction: column;
        align-items: center;
        height: 100%;
        .icon{
          width: 1rem;
          height: 1rem;
        }
      }
  }
</style>