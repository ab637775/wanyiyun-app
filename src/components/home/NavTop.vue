<template>
  <div class="nav-container">
<div class="navLeft">
      <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-31liebiao"></use>
  </svg>
</div>
<div class="navContent">
    <span @click="$router.push('/userinfo')">我的</span>
    <span class="active">发现</span>
    <span>云村</span>
    <span>视频</span>
</div>
<div class="navRight">
  <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
      <use xlink:href="#icon-sousuo"></use>
  </svg>
</div>

  </div>
</template>

<script>
export default {
  name:'NavTop'
}
</script>

<style lang="less" scoped>
  .nav-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    .navContent{
      display: flex;
      width: 65%;
      height: 100%;
      justify-content: space-around;   
      font-size: .36rem;
    }
    .active{
      font-weight: 900;
    }
  }
</style>