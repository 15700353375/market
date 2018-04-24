<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 超市管理-员工详情框架
 -->

<template>
  <div class="authorizeUserFrame">
    <div class="main">
    <div class="displayNone">{{countLocalState}}</div>
    <div class="displayNone">{{AllData}}</div>
      <div class="tabs">
        <ul>
          <i class="iconTitle"></i>
          <li class="pull-left">员工详情</li>
        </ul>
        <div class="btnGroup pull-right">
          <button class="btn marginR-15"
                  @click="distribute('allocate')">分配</button>
          <button class="btn"
                  @click="distribute('recycle')">回收</button>
        </div>
      </div>
      <div class="extraUser">
        <div class="info">
          <span class="name">姓名：{{userName}}</span>
          <span>联系方式：{{phone}}</span>
        </div>
        <div class="detail">
          <div class="row">
            <div class="col-md-6 paddingR-7">
              <table class="table table-bordered table-hover text-center">
                <thead>
                  <tr>
                    <th colspan="2">标准版</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="width-140 text-right">标准版剩余：</td>
                    <td class="text-left paddingL-12">{{standard.empower_num_surplus}}</td>
                  </tr>
                  <tr>
                    <td class="width-140 text-right">已使用：</td>
                    <td class="text-left paddingL-12">{{standard.empower_num_used}}</td>
                  </tr>
                  <tr>
                    <td class="width-140 text-right">销售金额：</td>
                    <td class="text-left paddingL-12">{{standard.sale_money}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-6 paddingR-7">
              <table class="table table-bordered table-hover text-center">
                <thead>
                  <tr>
                    <th colspan="2">标准版</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="width-140 text-right">增值版剩余：</td>
                    <td class="text-left paddingL-12">{{increment.empower_num_surplus}}</td>
                  </tr>
                  <tr>
                    <td class="width-140 text-right">已使用：</td>
                    <td class="text-left paddingL-12">{{increment.empower_num_surplus}}</td>
                  </tr>
                  <tr>
                    <td class="width-140 text-right">销售金额：</td>
                    <td class="text-left paddingL-12">{{increment.empower_num_surplus}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main marginT-20">
      <div class="tabsUl">
        <ul>
          <li class="text-center pull-left"
              :class="{active:activeLi.authorizeUserStandard}"
              @click="roRouter('authorizeUserStandard', $event)">标准版授权记录
          </li>
          <li class="text-center pull-left"
              :class="{active:activeLi.authorizeUserincrement}"
              @click="roRouter('authorizeUserincrement', $event)">增值版授权记录
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
    <!-- 用户授权弹窗 -->
    <AuthorizeOrInitStaffDialog v-if="dialogs.AuthorizeOrInitStaffDialog"
                                :staffInfo="staffInfo"
                                @close="close">
    </AuthorizeOrInitStaffDialog>
  </div>
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import comUtil from '@Util/comUtil';
  import AuthorizeOrInitStaffDialog from '@Components/AuthorizeOrInitStaffDialog';
  import { mapState } from 'vuex';

  export default {
    data(){
      return {
        // 公共方法
        comUtil: comUtil,

        // 姓名
        userName: '',

        // 电话
        phone: '',

        // 员工信息
        staffInfo:'',

        // 标准版
        standard: {
          empower_num_surplus: 0,
          empower_num_used: 0,
          sale_money: 0
        },
        // 增值版
        increment: {
          empower_num_surplus: 0,
          empower_num_used: 0,
          sale_money: 0
        },

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        refresh: '',


        // 控制tabsUl:active
        activeLi: {
          "authorizeUserStandard": this.$route.name == "authorizeUserStandard" ? true : false,
          "authorizeUserincrement": this.$route.name == "authorizeUserincrement" ? true : false,
        },

        //相关模态框开关
        dialogs: {
          AuthorizeOrInitStaffDialog: false,
        },

      }
    },

    mounted(){},
    computed:{
      ...mapState({
        // 区域option，从vuex中获取
        countLocalState(state){
          this.refresh = state.authorizeUserFrame.refresh;
        }
      }),
      //计算属性，任意数据改变，更改表格数据tableData
      AllData(){
        let param = {
          // 员工
          user_id: this.$route.query.userId
        };

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        let refresh = this.refresh;

        this.queryList(param);
      }
    },
    methods: {

      // 初始化activeLi
      initActiveLi(){
        for(let key in this.activeLi){
          this.activeLi[key] = false;
        }
      },

      //获取查询结果数据
      queryList(param){
        let staffInfoPromsie = this.$ajaxPost(urls.EMPLOYEE_EMPLOYEE_INFO, param);
        if(staffInfoPromsie){
          staffInfoPromsie.then((res) =>{
            if(res){
              if(res.code == 200){
                this.standard = res.data.version1;
                this.increment = res.data.version2;
                this.userName = res.data.username;
                this.phone = res.data.mobile;
              }
            }
          })
        }
      },

      // 页面跳转
      roRouter(name, e){
        if($(e.target).hasClass('active')){
          return;
        }
        this.initActiveLi();
        switch(name){
          case 'authorizeUserStandard':
            this.activeLi.authorizeUserStandard = true;
            this.$router.push(
              {
                name: 'authorizeUserStandard',
                query: {
                  userId: this.$route.query.userId
                }
              }
            )
            break;
          case 'authorizeUserincrement':
            this.activeLi.authorizeUserincrement = true;
            this.$router.push(
              {
                name: 'authorizeUserincrement',
                query: {
                  userId: this.$route.query.userId
                }
              }
            )
            break;
        }
      },

       // 关闭用户弹窗
      close(dialogs,store){
        this.dialogs[dialogs] = false;
        if(store){
          this.$store.commit('authorizeUserFrame/setRefresh', !this.refresh);
        }
      },

      //分配or回收
      distribute(type){
        this.staffInfo = {
          userId : this.$route.query.userId,
          userName: this.userName,
          type : type
        };
        this.dialogs.AuthorizeOrInitStaffDialog = true;
      },

      // 格式化服务器数据
      formatTable(list){
        list.forEach((item)=>{
          item.regionName = comUtil.formatRegion(item.province_id, item.city_id, this.region.options);
          item.versionName = item.version_type == 1 ? '标准版' : '增值版';
          item.statusName = item.shop_status == 0 ? '禁用' : '正常';
          item.createTimeName = comUtil.formatTime(item.create_time, 'YYYY-MM-DD HH:mm');
        })
        return list;
      },



    },
    components:{
      AuthorizeOrInitStaffDialog
    }
  }
</script>
