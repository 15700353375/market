<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>

<div class="clearfix">
    <div class="ctit">
        <em>修改密码</em>
    </div>
    <div class="quota clear">
        <form style="margin-top:30px;" @submit.prevent="validateBeforeSubmit" autocomplete="off">
            
            <div class="chang_item">
                <span class="tit">原密码：</span>
                <div class="vee-form-grop">
                <bs-input v-model.trim="agoPassWord"
                            v-validate="'required'"
                            name="agoPassWord"
                            :class="{'input': true, 'is-danger': errors.has('agoPassWord') }"
                            autocomplete="new-password"
                            placeholder="请输入原密码"
                            type="password">
                </bs-input>
                <span v-show="errors.has('agoPassWord')"
                        class="is-danger">{{ errors.first('agoPassWord') }}
                </span>
                </div>
            </div>

            <div class="chang_item">
                <span class="tit">新密码：</span>
                <div class="vee-form-grop">
                <bs-input v-model.trim="newPassWord"
                            v-validate="'required'"
                            name="newPassWord"
                            :class="{'input': true, 'is-danger': errors.has('newPassWord') }"
                            autocomplete="new-password"
                            placeholder="请输入新密码"
                            type="password">
                </bs-input>
                <span v-show="errors.has('newPassWord')"
                        class="is-danger">{{ errors.first('newPassWord') }}
                </span>
                </div>
            </div>

            <div class="chang_item">
                <span class="tit">新密码：</span>
                <div class="vee-form-grop">
                <bs-input v-model.trim="comfirmPassWord"
                        v-validate="'required|confirmed:' + newPassWord"
                        placeholder="确认新密码"
                        name="comfirmPassWord"
                        class="inlineBlock width-260"
                        :class="{'input': true, 'is-danger': errors.has('comfirmPassWord') }"
                        autocomplete="off"
                        type="password">
                </bs-input>
                <span v-show="errors.has('comfirmPassWord')"
                        class="is-danger">{{ errors.first('comfirmPassWord') }}
                </span>
                </div>
            </div>
            <div class="chang_item" style="text-align:center;">
                <button class="btn btn-default submit "
                        type="submit">修改密码
                </button>
            </div>
        </form>
    </div>
</div>

</template>

<script>
  //加载相关依赖
  import { mapState } from 'vuex';
  import LoginVue from '@Components/LoginVue';
  export default {
    props: ['navData'],
    data() {
      return {

          agoPassWord: '',

          newPassWord: '',

          comfirmPassWord: '',


      }
    },
    mounted(){

    },
    computed: mapState({
        user: state => state.login.userInfo,

    }),
    methods: {
        // 表单提交事件
      validateBeforeSubmit() {
        this.$validator.validateAll().then(result => {
          if (result) {
            let params = {
              password: this.agoPassWord,
              new_password: this.newPassWord,
              token: this.user.token
            };
            // debugger
            this.$ajaxQsPost('http://bitcoin.xxw360.com/pwd', params)
                .then((res)=>{
                  
                  if( res && res.code == 200){
                    this.$message.success(res.msg);
                  }else{
                    this.$message.error(res.msg);
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


<style scoped lang='less'>
    .ctit{
    border-bottom: 2px solid #ccc;
    height: 40px;
    line-height: 40px;
    width: 100%;
}
.ctit em{
    border-bottom: 2px solid #ff6000;
    color: #ff6000;
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
    font-style: normal;
    line-height: 38px;
}
.quota{
    padding: 15px 0;
}

.chang_item{
    width:250px;
    height: 60px;
    margin:0 auto;
    .form-group{
        margin-bottom: 0px;
        
    }
    .tit{
        display: inline-block;
        height: 34px;
        line-height: 34px;
        float: left;
    }
    .vee-form-grop{
        width:150px;
        float: left;
        height: 35px;
        .input{
            height: 35px;
            padding:0px;
            
        }
    }
}


</style>

