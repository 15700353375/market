<!--
 * @Author:      changh
 * @DateTime:    2018-04-25 13:53:30
 * @Description: 登录弹窗
 -->

<template>
  <transition name="fade">
        <div class="login_modal" v-show="dengluyemianShow">
          <img src="/agentStatic/img/close.png" class="close" @click="close" alt="">
          <div class="loginNav">
              <span :class="[formShows ==true?'active':'']" :data-hi= "1" @click='change(true)'>登录</span>
              <span :class="[formShows ==false?'active':'']" :data-hi = "2" @click='change(false)'>注册</span>
          </div>
          <div class="formBox">
            <!--登录表单-->
              <!--登录表单-->
            <form v-if="formShows" @submit.prevent="validateBeforeSubmit" autocomplete="off">
            <!-- <div class="vee-form-grop">
              
              <div class="input-group">
                <span class="input-group-addon glyphicon glyphicon-phone" id="basic-addon1"></span>
                <bs-input v-model.trim="user"
                        v-validate="'required|account'"
                        name="user"
                        :class="{'input': true, 'is-danger': errors.has('user') }"
                        autocomplete="off"
                        placeholder="请输入账号"
                        type="text">
              </bs-input>
              </div>
              <span v-show="errors.has('user')"
                    class="is-danger">{{ errors.first('user') }}
              </span>
            </div> -->

            <div class="vee-form-grop">              
              <div class="input-group">
                <span class="input-group-addon glyphicon glyphicon-user" id="basic-addon1"></span>
                <bs-input v-model.trim="account"
                        v-validate="'required|account'"
                        name="account"
                        :class="{'input': true, 'is-danger': errors.has('account') }"
                        autocomplete="off"
                        placeholder="请输入账号"
                        type="text">
              </bs-input>
              </div>
              <span v-show="errors.has('account')"
                    class="is-danger">{{ errors.first('account') }}
              </span>
            </div>

            

            <div class="vee-form-grop">
              
              <div class="input-group">
                <span class="input-group-addon glyphicon glyphicon-lock" id="basic-addon1"></span>
                <bs-input v-model.trim="password"
                        v-validate="'required'"
                        name="password"
                        :class="{'input': true, 'is-danger': errors.has('password') }"
                        autocomplete="new-password"
                        placeholder="请输入密码"
                        type="password">
                </bs-input>
              </div>
              <span v-show="errors.has('password')"
                    class="is-danger">{{ errors.first('password') }}
              </span>
            </div>

            <div v-if="isCheckCode"
                 class="vee-form-grop">
              <bs-input v-model.trim="validateCode"
                        v-validate="'required|lengthFour'"
                        name="validateCode"
                        class="validateInput"
                        :class="{'input': true, 'is-danger': errors.has('validateCode') }"
                        autocomplete="off"
                        placeholder="请输入验证码"
                        type="text">
              </bs-input><img  class="validateImg" :src="validateImgUrl" @click="getValidateImg">
              <span v-show="errors.has('validateCode')"
                    class="is-danger">{{ errors.first('validateCode') }}
              </span>
            </div>




            <div class="clearfix remember_box">
              <div class="remember">
                <checkbox v-model="rememberPassword"
                        class="inlineBlock pull-left marginT-0">
                        <span class="rememberPassword">记住密码</span>
                </checkbox>
              </div>
              <!-- <button type="button"
                      class="btn btn-link pull-right forgetPassword marginB-12"
                      @click="toForgetPasswd">忘记密码？
              </button> -->
            </div>
            <div class="vee-form-grop text-right">
              <button class="btn btn-default submit"
                      :class="{'loading':btn.loading}"
                      :disabled="btn.loading"
                      type="submit">登录
              </button>
            </div>
          </form>

            <Register v-if="!formShows"  @closeModel="close"></Register>
            
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

        dengluyemianShow: false,
               // 用户名
        account: '',

        // 密码
        password: '',

        // 登录是否出现错误
        loginError: false,

        // 确认按钮loading
        btn: {
          loading: false
        },

        // 验证码
        validateCode: '',

        // 验证码图片地址
        // validateImgUrl: this.baseUrl,
        validateImgUrl: '',

        // 验证码索引，需要传给服务器
        validateIndex: '',

        // 是否需要验证码，登录错误三次，后台返回true
        isCheckCode: false,

        // 错误提示
        errorTip: '',
        
        // 记住密码
        rememberPassword: false,

        formShows: false

      }
    },
    mounted(){
      this.$on('gologin',(val)=>{
        
          this.dengluyemian(val);
      });
      // this.dengluyemian(true);
    },
    computed: mapState({

    }),
    methods: {
 toForgetPasswd(){
        this.$router.push({name: 'forgetPasswd'});
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // 将登录按钮置于loading
            // this.btn.loading = true;
            let loginParams = {
              username: this.account,
              password: this.password,
            };
            // debugger
            this.$ajaxQsPost('http://bitcoin.xxw360.com/login', loginParams)
                .then((res)=>{                  
                  if( res && res.code == 200){
                    this.$message.success(res.msg);
                    this.$store.commit('login/setUserInfo', res.data);
                    this.isVip(res.data.token)
                  }else{
                    this.$message.error(res.msg);
                    // this.errorTip = res.message;
                    // this.confirmError = true;
                  }
                })
          }
        });
      },

      // 判断是否为vip
      isVip(token){
        let parmas = {
          token: token
        }
        this.$ajaxQsPost('http://bitcoin.xxw360.com/isVip', parmas)
              .then((res)=>{                  
                if( res && res.code == 200){
                  this.$store.commit('login/setIsVip', res.msg);
                  this.close()
                }else{
                  this.$message.error(res.msg);
                }
        })
      },



      //显示登录注册页面
      dengluyemian(flag){
        if(flag == 1){
          this.formShows = true
        }else{
          this.formShows = false          
        }

        this.dengluyemianShow = true;
        
        // this.formShows = true
      },

      //关闭登录注册页面
      close(){
        this.dengluyemianShow = false
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



