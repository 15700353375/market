<!--
 * @Author:      changh
 * @DateTime:    2018-04-25 13:53:30
 * @Description: 登录弹窗
 -->

<template>

  <div class="formBox">

    <form @submit.prevent="validateBeforeSubmit" autocomplete="off">
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
        <div class="input-group border_radius_none">
          <span class="input-group-addon agent-login_icon_identifying_code" id="basic-addon1"></span>
            <bs-input v-model.trim="validCodes"
                      v-validate="'required|numeric|digits:4|isCorrect:' + codes"
                      name="validCodes"
                      autocomplete="off"
                      placeholder="请输入验证码"
                      type="text">              
            </bs-input>
            <span  class="input-group-addon getCode cur-p" @click="changeCode">
                {{codes}}
            </span>
        </div>
        <span v-show="errors.has('validCodes')"
              class="is-danger">{{ errors.first('validCodes') }}
        </span>
      </div>


      <div class="vee-form-grop">              
        <div class="input-group">
          <span class="input-group-addon glyphicon glyphicon-phone" id="basic-addon1"></span>
          <bs-input v-model.trim="user"
                  v-validate="'required|phone'"
                  name="user"
                  :class="{'input': true, 'is-danger': errors.has('user') }"
                  autocomplete="user"
                  placeholder="请输入手机号"
                  type="text">
        </bs-input>
        </div>
        <span v-show="errors.has('user')"
              class="is-danger">{{ errors.first('user') }}
        </span>
      </div>

      <div class="vee-form-grop">              
        <div class="input-group border_radius_none">
          <span class="input-group-addon agent-login_icon_identifying_code" id="basic-addon1"></span>
            <bs-input v-model.trim="validateCode"
                      v-validate="'required|numeric|digits:4'"
                      name="validateCode"
                      autocomplete="off"
                      placeholder="请输入手机验证码"
                      type="text">
              
            </bs-input>
            <span  class="input-group-addon getCode">
                <input class="btn btn-default"
                        type="button"
                        :disabled="validateDisabled"
                        :value="validateText"
                        @click="Reciprocal"/>
              </span>
        </div>
        <span v-show="errors.has('validateCode')"
              class="is-danger">{{ errors.first('validateCode') }}
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

      <div class="vee-form-grop">        
        <div class="input-group invite">
          <span class="input-group-addon" id="basic-addon1">邀请码</span>
          <bs-input v-model.trim="inviteCode"
                  name="inviteCode"
                  :class="{'input': true, 'is-danger': errors.has('inviteCode') }"
                  autocomplete="new-password"
                  placeholder="请输入邀请码"
                  type="text">
          </bs-input>
        </div>
      </div>

        <div class="vee-form-grop text-right">
          <button class="btn btn-default submit"
                  :class="{'loading':btn.loading}"
                  :disabled="btn.loading"
                  type="submit">注册
          </button>
        </div>
      </form>

    
  </div>

</template>

<script>
  //加载相关依赖
  import { mapState } from 'vuex';
  import comUtil from '@Util/comUtil';

  export default {
    props: ['navData'],
    data() {
      return {
        // 用户名
        account:'',

        // 前端验证码
        codes: '',

        // 前端验证的验证码
        validCodes: '',

        // 手机号
        user: '',

        // 密码
        password: '',

        // 验证码
        validateCode: '',

        // 邀请码
        inviteCode: '',

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
    mounted(){
      this.codes = comUtil.RndNum(4);
    },
    methods: {

      changeCode(){
        this.codes = comUtil.RndNum(4);
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
            // debugger
            this.$ajaxQsPost('http://bitcoin.xxw360.com/sms', params)
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
              username: this.account,
              mobile: this.user,
              password: this.password,
              code: this.validateCode,
              invite_code: this.inviteCode
            };
            // debugger
            this.$ajaxQsPost('http://bitcoin.xxw360.com/register', params)
                .then((res)=>{
                  
                  if( res && res.code == 200){
                    this.$message.success(res.msg);
                    this.$emit('closeModel', true);
                  }else{
                    this.errorTip = res.message;
                    this.confirmError = true;
                  }
                })
          }
        });
      }
    },
    components: {
    }
  }

</script>



