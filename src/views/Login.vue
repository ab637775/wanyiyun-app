<template>
   <div class="login">
    <svg class="icon left-arrow" aria-hidden="true" @click="$router.back()">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model="password"
        placeholder="请输入密码"
        @keydown.enter="Login"
      />
      <button class="btn" @click="Login" >登录</button>
    </div>
  </div>
</template>
<script>
import {getUserInfo} from '@/request/api/home.js'
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      phone:'',
      password:''
    }
  },
  methods:{
    ...mapActions(['getLogin']),
    ...mapMutations(['updateIsLogin','updateToken','updateUserInfo']),
    async Login(){
      const res = await this.getLogin({
        phone:this.phone,
        password:this.password
      })
      console.log(res);

      // 判断是否登录成功 
      // 返回的参数res.data.code是200时，登录成功
      if(res.data.code === 200){
        const result = await getUserInfo(res.data.account.id)  
        console.log(result);
        this.updateUserInfo(result.data.profile)
        this.updateIsLogin(true)
        this.updateToken(res.data.token)    
        sessionStorage.setItem('userProfile',JSON.stringify(result.data.profile))
        this.$router.push('/userinfo')
      }else{
        alert('账号或密码输入错误，请重试！')
      }
    }

  }
}
</script>
<style lang="less" scoped>
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  background-color: rgb(248, 97, 97);
  .left-arrow{
    position: absolute;
    top: .1rem;
    left: .1rem;
    fill: #fff;
  }
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn{
        width: 2rem;
        height: .6rem;
    }
  }
}
</style>
