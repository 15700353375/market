<!--
 * @Author:      changh
 * @DateTime:    2018-04-25 13:53:30
 * @Description: 登录弹窗
 -->

<template>
  <transition name="fade">
        <div class="loginRegister" v-show="dengluyemianShow">
          <img src="/agentStatic/img/close.png" class="close" @click="close" alt="">
          <div class="loginNav">
              <span :class="[formShows ==true?'active':'']" :data-hi= "1" @click='change(true)'>登录</span>
              <span :class="[formShows ==false?'active':'']" :data-hi = "2" @click='change(false)'>注册</span>
          </div>
          <div class="formBox">
            <!--登录表单-->
              <!--登录表单-->
            <form action="" id="sigin-form" v-if="formShows"  @submit.prevent="siginsubmit">
                <div class="heng" >
                  <div>
                    <input type="text" class="input" 
                          @click="userClick" 
                          @blur="userblur" 
                          name="username" 
                          v-model="user.name" 
                          placeholder="" 
                          required maxlength="254">
                    <transition name="slide-fade">
                        <span class="signPla" :class="[userFocus || user.name == true?'top':'']">手机号</span>
                    </transition>
                  </div>
                  <img src="/agentStatic/img/erro.png" class="erro" alt="" v-show="usererroshow">
                </div>
                <div class="heng" :class="[passwordFocus == true?'borderBottom':'']">
                  <div>
                    <input type="password"class="input" 
                          @click="passwordClick" 
                          @blur="passwordblur" 
                          v-model="user.password" 
                          name="password" 
                          placeholder="" 
                          required maxlength="254">
                    <span class="signPla" :class="[passwordFocus || user.password == true?'top':'']">密码(8-16位数字和字母组成)</span>
                  </div>
                  <img src="/agentStatic/img/erro.png" class="erro" alt="" v-show="paserroshow">
                  <div class="wangjiBtn">忘记密码？</div>
                </div>
                <div class="heng wangji">
                  <div class="jizhumima">
                    <label for="remember" class="clearFloat">
                      <input type="checkbox" name="remember" class="remember fl" v-model='user.ischecked'>
                      <span class="fl">记住我</span>
                    </label>
                  </div>
                  <div class="fr">
                    <button type="submit" class="signBtn">登录</button>
                  </div>
                </div>
            </form>

            <Register v-if="!formShows"></Register>
            
          </div>
      </div>
    </transition>
</template>

<script>
  //加载相关依赖
  import { mapState } from 'vuex';
  import comUtil from '@Util/comUtil';
  import Register from '@Components/Register';
  export default {
    props: ['navData'],
    data() {
      return {
        formShows: false,
        userFocus: true,
        passwordFocus:false,//密码框是否获取焦点
        paserroshow:false,//密码用户名错误提示
        user:{
           name:'',
           password:'',
           email:'',
          ischecked:true
        },
        usererroshow:false,//用户名错误提示
        dengluyemianShow: false,


      }
    },
    mounted(){
      // this.$on('gologin',(val)=>{
        
      //     this.dengluyemian(val);
      // });
      this.dengluyemian(true);
    },
    computed: mapState({

    }),
    methods: {

      //显示登录注册页面
      dengluyemian(){
        this.dengluyemianShow = true
        this.formShows = true
      },
      zhuceyemian(){
        this.dengluyemianShow = true
        this.formShows = false
      },
      //关闭登录注册页面
      close(){
        this.dengluyemianShow = false
      },

      passwordClick(){
        this.passwordFocus = true
      },

      passwordblur(){
        if(this.user.password == ''){
          this.passwordFocus = false
        }else {
          this.passwordFocus = true
        }
      },

      //用户名框获取焦点
      userClick(){
        this.userFocus = true
      },
      //失去焦点
      userblur(){
        if(this.user.name == ''){
          this.userFocus = false
        }else {
          this.userFocus = true
        }
      },


      //登录表单提交
      siginsubmit(){
        let flag_phone = comUtil.test_phone(this.user.name);
        let flag_password = comUtil.test_password(this.user.password);
        var formData = JSON.stringify(this.user);
        console.log(formData);
        if(this.user.name == '' || !flag_phone){
          this.usererroshow = true;
          console.log(1)
          return
        }else {
          this.usererroshow = false
        }
        if(this.user.password == '' || !flag_password){
          this.paserroshow = true
          return
        }else {
          this.paserroshow = false
        }

        // this.$http.post('/path/to', formData).then((response) => {
        //   // success callback
        // }, (response) => {
        //   // error callback
        // });
      },


      // 登录注册切换
      change(flag){
        this.formShows = flag;
      }


    },
    components: {
      Register
    }
  }

</script>



