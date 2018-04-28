<!--
 * @Author:      cyzeng
 * @DateTime:    2017-06-16 23:09:45
 * @Description: 登录页面
 -->
<template>
  <div class="login">
    <header class="login-header">
      <div class="wrapper clearfix">
        <div class="logo pull-left"></div>
        <div class="link pull-right">
          <a target="_blank" href="http://www.izhangmai.com/index.html">进入官网</a>
        </div>
      </div>
    </header>
    <section class="login-content">
       <div class="wrapper clearfix">
         <div class="pic pull-left"></div>
         <div class="signIn pull-right">
          <h3>代理商平台</h3>
          <h5
              class="loginlaber">账号登录
          </h5>
          <div v-if="loginError"
              class="loginlaber loginError">
              <span class="agent-common_icon_error_tip"></span>
              {{errorTip}}
          </div>
          <form @submit.prevent="validateBeforeSubmit" autocomplete="off">
            <div class="vee-form-grop">
              <bs-input v-model.trim="user"
                        v-validate="'required|phone'"
                        name="user"
                        :class="{'input': true, 'is-danger': errors.has('user') }"
                        autocomplete="off"
                        placeholder="请输入账号"
                        type="text">
              </bs-input>
              <span v-show="errors.has('user')"
                    class="is-danger">{{ errors.first('user') }}
              </span>
            </div>

            <div class="vee-form-grop">
              <bs-input v-model.trim="password"
                        v-validate="'required'"
                        name="password"
                        :class="{'input': true, 'is-danger': errors.has('password') }"
                        autocomplete="new-password"
                        placeholder="请输入密码"
                        type="password">
              </bs-input>
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




            <div class="clearfix">
           <!--    <checkbox v-model="rememberPassword"
                        class="inlineBlock pull-left marginT-0">
                        <span class="rememberPassword">记住密码</span>
              </checkbox> -->
              <button type="button"
                      class="btn btn-link pull-right forgetPassword marginB-12"
                      @click="toForgetPasswd">忘记密码？
              </button>
            </div>
            <div class="vee-form-grop">
              <button class="btn btn-default submit"
                      :class="{'loading':btn.loading}"
                      :disabled="btn.loading"
                      type="submit">登录
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <footer class="login-footer">
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
  import {
          urls,
          baseUrl} from '@Util/axiosConfig';
  import comUtil from '@Util/comUtil';

  export default {
    data(){
      return{
        // 用户名
        user: '',

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
        // rememberPassword: false
      }
    },
    mounted(){

    },
    methods: {
      toForgetPasswd(){
        this.$router.push({name: 'forgetPasswd'});
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // 将登录按钮置于loading
            this.btn.loading = true;
            let loginParams = {
              account: this.user,
              password: this.password,
              captcha_code: this.validateCode,
              captcha_key: this.validateIndex
            };
            this.$ajaxPost(urls.LOGIN_LOGIN, loginParams)
                .then((res) =>{
                  if(res && res.code == 200){
                    // 表明登录成功
                    let agentToken = res.data.agentToken;
                    // 将token信息放入sessionStorage中，关闭浏览器，退出登录
                    sessionStorage.setItem('agentToken', agentToken);
                    // 将user_info放入vuex中
                    this.$store.commit('login/setUserInfo', res.data.user_info);
                    // 获取账号区域信息
                    this.$ajaxGet(urls.COMMON_REGION_LIST, null, this.btn)
                        .then((res) =>{
                          if(res && res.code == 200){
                            // 将regionOptions放入vuex中
                            this.$store.commit('common/setRegionOptions', res.data.list);
                            // 在进入的时候再次提交，防止用户没有正常退出
                            this.$store.commit('common/setBread', '销售报表');
                            this.$store.commit('common/setActiveLi', 'staffSaleStatist');
                            this.$store.commit('common/setActiveTab', 'staffSaleStatist');
                            // 跳转首页
                            this.$router.push({name:'staffSaleStatist'});
                          }
                        });
                  }else{
                    this.btn.loading = false;
                    // 表明登录失败
                    this.errorTip = res.message;
                    // 登录失败提示
                    this.loginError = true;
                    // 登录失败验证是否需要验证图片
                    if(res.data.is_check_code){
                      this.isCheckCode = true;
                      this.getValidateImg();
                    }
                  }
                }).catch(e=>{
                  this.btn.loading = false;
                })
          }
        });
      },

      // 获取验证码
      getValidateImg(){
        this.validateIndex = comUtil.randomValidateCode();
        let validateIndexParams = {
          captcha_key: this.validateIndex
        };
        this.$ajaxPost(urls.PUBLIC_CAPTCHA_IMG, validateIndexParams)
            .then((res)=>{
              if(res && res.code == 200){
                this.validateImgUrl =  baseUrl + res.data.captcha_url;
              }
            });
      }
    }
  }
</script>
