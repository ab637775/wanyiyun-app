<template>
  <div class="user-container">
    <div class="userTop">
    <svg class="icon left-arrow" aria-hidden="true" @click="$router.push('/')">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
     <p @click="removeToken">退出登录</p>
    </div>

   <div class="userBox">
     <div class="avatarBox">
        <img :src="userInfo.avatarUrl" alt="">
           <p>{{userInfo.nickname}}</p>
      </div>
   </div>

   
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed:{
  ...mapState(['userInfo'])
  // userProfile
  },
  mounted() {

    this.updateUserInfo(JSON.parse(sessionStorage.getItem('userProfile')))
  
   console.log(this.userInfo);
  // console.log(JSON.parse(sessionStorage.getItem('userProfile')));
  },

  methods:{
    ...mapMutations(['updateIsLogin','updateToken','updateUserInfo']),
    removeToken(){
      localStorage.removeItem('token')
      this.updateIsLogin(false)
      this.updateToken('')
      this.$router.push('/')
    }
  }

}
</script>
<style lang="less" scoped>
.user-container{
  // display: flex;
  // justify-content: center;
  // align-items: center;
  width: 100%;
  // height: 5rem;
  .userTop{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: .2rem;
  }
    .userBox{
      display: flex;
      // flex-direction: column;
      // align-items: center;
      justify-content: center;

      width: 100%;
      height: 6rem;

      margin-top: 1rem;
      // background: red;
    .avatarBox{
      width: 4rem;
      height: 4rem;
      text-align: center;
      font-size: .4rem;
      font-weight: 700;
   
       img{
      width: 100%;
      height: 100%;
        //  border-radius: 50%!important;
      }
      }

    }

}

 
</style>
