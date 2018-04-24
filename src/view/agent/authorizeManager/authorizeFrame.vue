<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 授权框架
 -->

<template>
  <div>
    <div class="container-fluid extra">
      <div class="displayNone">{{countLocalState}}</div>
      <div class="displayNone">{{AllData}}</div>
      <div class="row">

        <div class="col-md-6 paddingR-7">
          <div class="part">
            <div class="description">
              <img class="img userFirst"
                   src="/agentStatic/img/empower_img_standard.png">
              <div class="icon">
                <i class="agent-empower_icon_standard"></i>
              </div>
              <div class="total">
                <p class="title">总授权数（标准版）</p>
                <p class="number">{{standard.total_empower_num}}</p>
              </div>
            </div>
            <div class="tip">
              <div class="row margin-0">
                <div class="col-md-4 tipDetail paddingL-24">已使用：{{standard.empower_num_used}}</div>
                <div class="col-md-4 tipDetail divide paddingL-24">剩余：{{standard.empower_num_surplus}}</div>
                <div class="col-md-4 tipDetail paddingL-24">可分配：{{standard.assign_num}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 paddingL-7">
          <div class="part">
            <div class="description">
              <img class="img"
                   src="/agentStatic/img/empower_img__appreciation.png">
              <div class="icon">
                <i class="agent-empower_icon_appreciation"></i>
              </div>
              <div class="total">
                <p class="title">总授权数（增值版）</p>
                <p class="number">{{increment.total_empower_num}}</p>
              </div>
            </div>
            <div class="tip">
              <div class="row margin-0">
                <div class="col-md-4 tipDetail paddingL-24">已使用：{{increment.empower_num_used}}</div>
                <div class="col-md-4 tipDetail divide paddingL-24">剩余：{{increment.empower_num_surplus}}</div>
                <div class="col-md-4 tipDetail paddingL-24">可分配：{{increment.assign_num}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="main authorizeFrame">

      <div class="tabsUl">
        <ul>
          <li class="text-center pull-left"
              :class="{active:activeLi.distributePower}"
              @click="roRouter('distributePower', $event)">分配授权数
          </li>
          <li class="text-center pull-left"
              :class="{active:activeLi.applyPower}"
              @click="roRouter('applyPower', $event)">申请授权数
          </li>
        </ul>
        <div v-if="activeLi.applyPower"
             class="applyBtn pull-right">
          <button class="btn"
                  @click="apply">
            <i class="agent-common_icon_add pull-left"></i>
            <span>申请</span>
          </button>
        </div>
      </div>
      <router-view></router-view>

    </div>

    <!-- 申请授权弹框 -->
    <AuthorizeApplyDialog v-if="dialogs.AuthorizeApplyDialog"
                          @close="close"></AuthorizeApplyDialog>
  </div>
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import AuthorizeApplyDialog from '@Components/AuthorizeApplyDialog';
  import { mapState } from 'vuex';
  export default {
    data(){
      return {
        // 标准版
        standard: {
          total_empower_num: 0,
          empower_num_used: 0,
          empower_num_surplus: 0,
          assign_num: 0
        },
        // 增值版
        increment: {
          total_empower_num: 0,
          empower_num_used: 0,
          empower_num_surplus: 0,
          assign_num: 0
        },

        // 导航条
        activeLi: {
          "distributePower": this.$route.name == "distributePower" ? true : false,
          "applyPower": this.$route.name == "applyPower" ? true : false,
        },

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        refresh: '',

        //相关模态框开关
        dialogs: {
          AuthorizeApplyDialog: false
        }
      }
    },
    computed:{
      ...mapState({
        countLocalState(state){
          this.refresh = state.authorizeFrame.refresh;
        }
      }),
      // 获取获取代理商授权统计
      AllData(){
        let param = {};

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        let refresh = this.refresh;

        this.queryList(param);
      }

    },
    methods: {

      //获取查询结果数据
      queryList(param){
        let agentPromise = this.$ajaxPost(urls.EMPLOYEE_EMPLOYEE_COUNT);
        if(agentPromise){
          agentPromise.then( (res)=>{
            if(res && res.code == 200){
              this.standard = res.data.version1;
              this.increment = res.data.version2;
            }
          })
        }
      },

      // 初始化activeLi
      initActiveLi(){
        for(let key in this.activeLi){
          this.activeLi[key] = false;
        }
      },

      //申请授权数
      apply(){
        this.dialogs.AuthorizeApplyDialog = true;
      },

      // 页面跳转
      roRouter(name, e){
        if($(e.target).hasClass('active')){
          return;
        }

        this.initActiveLi();
        switch(name){
          case 'distributePower':
            this.activeLi.distributePower = true;
            this.$router.push({name:'distributePower'})
            break;
          case 'applyPower':
            this.activeLi.applyPower = true;
            this.$router.push({name:'applyPower'})
            break;
        }
      },

      // 关闭用户弹窗
      close(dialogs,store){
        this.dialogs[dialogs] = false;
        if(store){
          this.$store.commit('authorizeFrame/setRefresh', !this.refresh);
        }
      },
    },
    components:{
      AuthorizeApplyDialog
    }
  }
</script>
