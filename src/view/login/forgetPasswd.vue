<!--
 * @Author:      cyzeng
 * @DateTime:    2017-06-16 23:09:45
 * @Description: 重置密码页面
 -->

<template>
  <div class="forgetPasswd">
    <header class="forgetPasswd-header">
      <div class="wrapper clearfix">
        <div class="logo pull-left">

        </div>
        <div class="link pull-right">
          <a target="_blank" href="http://www.izhangmai.com/index.html">进入官网</a>
          <span class="split">|</span>
          <a @click="toLogin">登录</a>
        </div>
      </div>
    </header>
    <section class="forgetPasswd-content">
       <div class="title text-center">
          <span class="agent">代理平台 -</span>
          <span>忘记密码</span>
        </p>
       </div>
       <div class="wrapper clearfix">
         <div class="signIn">
         <div v-if="confirmError"
              class="loginlaber confirmError">
              <span class="agent-common_icon_error_tip"></span>
              {{errorTip}}
          </div>
          <form @submit.prevent="validateBeforeSubmit" autocomplete="off">
            <div class="vee-form-grop">
              <bs-input v-model.trim="user"
                        v-validate="'required|phone'"
                        class="icon"
                        name="user"
                        autocomplete="off"
                        placeholder="请输入账号"
                        type="text">
                <span slot="before" class="input-group-addon">
                  <span class="agent-login_icon_phone"></span>
                </span>
              </bs-input>
              <span v-show="errors.has('user')"
                    class="is-danger">{{ errors.first('user') }}
              </span>
            </div>

            <div class="vee-form-grop">
              <bs-input v-model.trim="validateCode"
                        v-validate="'required|numeric|digits:6'"
                        name="validateCode"
                        autocomplete="off"
                        placeholder="请输入验证码"
                        type="text">
                <span slot="before" class="input-group-addon">
                  <span class="agent-login_icon_identifying_code"></span>
                </span>
                <span slot="after"
                      class="input-group-addon getCode">
                  <input class="btn btn-default width-110"
                         type="button"
                         :disabled="validateDisabled"
                         :value="validateText"
                         @click="Reciprocal"/>
                </span>
              </bs-input>
              <span v-show="errors.has('validateCode')"
                    class="is-danger">{{ errors.first('validateCode') }}
              </span>
            </div>

            <div class="vee-form-grop">
              <bs-input v-model.trim="password"
                        v-validate="'required'"
                        class="validateInput"
                        autocomplete="off"
                        name="password"
                        placeholder="请输入密码"
                        type="text">
                <span slot="before" class="input-group-addon">
                  <span class="agent-login_icon_password"></span>
                </span>
              </bs-input>
              <span v-show="errors.has('password')"
                    class="is-danger">{{ errors.first('password') }}
              </span>
            </div>
            <div class="vee-form-grop">
              <button class="btn btn-default submit"
                      type="submit"
                      :class="{'loading':btn.loading}"
                      :disabled="btn.loading">确认修改
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <footer class="forgetPasswd-footer">
      <div class="wrapper">
        <div class="website-link clearfix">
          <a href="http://www.izhangmai.com/aboutus.html" target="_blank">关于我们</a>
          <a href="http://www.izhangmai.com/service.html" target="_blank">常见问题</a>
          <a href="http://www.izhangmai.com/service.html" target="_blank">新手指南</a>
          <a href="http://www.izhangmai.com/service.html" target="_blank">操作视频</a>
          <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=2&amp;uin=4008815661&amp;site=qq&amp;menu=yes" target="_blank">意见反馈</a>
        </div>
        <p class="copyright">Copyright © 2015 掌麦 - 蜀ICP备14024909号</p>
      </div>
    </footer>
  </div>
</template>

<script>

  import {urls} from '@Util/axiosConfig';

  export default {
    data(){
      return{
        // 用户名
        user: '',

        // 密码
        password: '',

        // 验证码
        validateCode: '',

        // 验证码禁用
        validateDisabled: false,

        // 验证码倒数
        reciprocalNum: 59,

        // 验证码重新获取文字
        validateText: '获取验证码',

        // 错误提示
        errorTip: '',

        // 修改按钮loading
        btn: {
          loading: false
        },

        // 确认是否出现错误
        confirmError: false,

      }
    },
    mounted(){},
    methods: {

      // 跳转login
      toLogin(){
        this.$router.push({name:'login'});
      },

      // 验证码倒数
      Reciprocal(){
        this.$validator.validate('user', this.user).then(result => {
          if(result){
            this.validateDisabled = true;
            let timesRun = setInterval(() => {
              if(this.reciprocalNum > 0){
                this.validateText = `重新获取(${this.reciprocalNum}s)`
                this.reciprocalNum--;
              }else{
                this.reciprocalNum = 59;
                clearInterval(timesRun);
                 this.validateDisabled = false;
                 this.validateText = '重新获取(60s)';
              }
            },1000);
            let params = {
              mobile: this.user
            };
            this.$ajaxPost(urls.PUBLIC_CAPTCHA_SMS, params)
          }
        });
      },
      // 表单提交事件
      validateBeforeSubmit() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // 将修改按钮置于loading
            this.btn.loading = true;
            let params = {
              mobile: this.user,
              password: this.password,
              sms_code: this.validateCode
            };
            this.$ajaxPost(urls.LOGIN_RESET_PASSWD, params, this.btn)
                .then((res)=>{
                  if( res && res.code == 200){
                    this.$message.success(res.message);
                    this.$router.push({name:'login'});
                  }else{
                    this.errorTip = res.message;
                    this.confirmError = true;
                  }
                })
          }
        });
      }
    }
  }
</script>
