<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 分配授权数
 -->

<template>
  <div class="distributePower">
    <div class="condition">
      <div class="displayNone">{{countLocalState}}</div>
      <div class="displayNone">{{AllData}}</div>
      <span>销售员：</span>
      <SearchVue v-model="searchText"
                 placeholder="账号/姓名/联系电话"></SearchVue>
    </div>

    <div class="result">
        <table class="table table-bordered table-hover text-center"
               :class="{'marginB-20': !tableData.length }">
          <thead>
            <tr>
              <th class="verticalCenter"
                  rowspan="2">序号
              </th>
              <th class="verticalCenter"
                  rowspan="2">销售员</th>
              <th class="verticalCenter"
                  rowspan="2">联系电话
              </th>
              <th colspan="2">标准版</th>
              <th colspan="2">增值版</th>
              <th class="verticalCenter width-150"
                  rowspan="2">操作
              </th>
            </tr>
            <tr >
              <th is="SortVue"
                  class="specialColor sortTh"
                  title="总授权数"
                  attr="total_empower_num1"
                  @sortCallBack="sortCallBack">
              </th>
              <th is="SortVue"
                  class="specialColor sortTh"
                  title="剩余授权数"
                  attr="empower_num1"
                  @sortCallBack="sortCallBack">
              </th>
              <th is="SortVue"
                  class="specialColor sortTh"
                  title="总授权数"
                  attr="empower_num2"
                  @sortCallBack="sortCallBack">
              </th>
              <th is="SortVue"
                  class="specialColor sortTh"
                  title="剩余授权数"
                  attr="create_time"
                  @sortCallBack="sortCallBack">
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="tableData.length">
              <tr v-for="itemParent in tableData">
                <td>{{itemParent.index}}</td>
                <td>{{itemParent.username}}</td>
                <td>{{itemParent.mobile}}</td>
                <td>{{itemParent.total_empower_num1}}</td>
                <td>{{itemParent.empower_num1}}</td>
                <td>{{itemParent.total_empower_num2}}</td>
                <td>{{itemParent.empower_num2}}</td>
                <td>
                  <button type="button"
                          class="btn btn-link padding-0 detail"
                          :data-userId="itemParent.user_id"
                          @click="staffDetail($event)">详情
                  </button>
                  <button type="button"
                          class="btn btn-link padding-0 power"
                          :data-userId="itemParent.user_id"
                          :data-userName="itemParent.username"
                          data-type="allocate"
                          @click="distribute($event)">分配
                  </button>
                  <button type="button"
                          class="btn btn-link padding-0 power"
                          :data-userId="itemParent.user_id"
                          :data-userName="itemParent.username"
                          data-type="recycle"
                          @click="distribute($event)">回收
                  </button>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="12">暂无数据</td>
            </tr>
          </tbody>
        </table>

        <div v-if="tableData.length"
             class="paginationDiv">
          <span class="paginationTitle">
            共<b class="textColor">{{pagination.centent.total}}</b>条记
          </span>
          <PaginationVue :pagination.sync="pagination"
                         @changeCurrentPage="changeCurrentPage">
          </PaginationVue>
        </div>
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
  import SortVue from '@Components/SortVue';
  import PaginationVue from '@Components/PaginationVue';
  import SearchVue from '@Components/SearchVue';
  import AuthorizeOrInitStaffDialog from '@Components/AuthorizeOrInitStaffDialog';
  import { mapState } from 'vuex';
  export default {
    data(){
      return {
        // 公共方法
        comUtil: comUtil,

        // 搜索key
        searchText: '',

        // 表格数据
        tableData: [],

        // 员工详情
        staffInfo: '',

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        refresh: '',

        // 排序
        sort_index: '',

        // 分页信息
        pagination: {
          centent: {
            total: 0,
            current_page: 1,
            last_page: 0,
            limit: 10,
            options: [
              {
                value: 10,
                label: '10条/页'
              },
              {
                value: 20,
                label: '20条/页'
              },
              {
                value: 50,
                label: '50条/页'
              }
           ]
          },
          paginationOptions: {
            offset: 3,
            previousText: '<',
            nextText: '>',
            alwaysShowPrevNext: true
          }
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
          this.refresh = state.authorizeFrame.refresh;
        }
      }),

      //计算属性，任意数据改变，更改表格数据tableData
      AllData(){
        let param = {

          // 搜索key
          keywords: this.searchText,

          // 排序
          sort_index: this.sort_index,

          // 分页信息
          limit: this.pagination.centent.limit,
          page: this.pagination.centent.current_page,
        };

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        let refresh = this.refresh;

        this.queryList(param);
      }
    },
    methods: {

      //获取查询结果数据
      queryList(param){
        let tablePromsie = this.$ajaxPost(urls.EMPLOYEE_EMPLOYEE_LIST, param);
        if(tablePromsie){
          tablePromsie.then((res) =>{
            if(res){
              if(res.code == 200){
                this.tableData = res.data.list;
                this.pagination.centent.total = res.data.pagination.total_num;
                // this.pagination.centent.current_page = res.data.pagination.page;
                this.pagination.centent.last_page = res.data.pagination.total_page;
              }
            }
          })
        }
      },

      // 员工详情页面
      staffDetail(e){
        this.$store.commit('common/setActiveTab', 'authorizeUserStandard');
        this.$router.push({
          name: 'authorizeUserStandard',
          query: {
            userId: e.target.dataset.userid
          }
        })
      },

      //分配or回收
      distribute(e){
        this.staffInfo = {
          userId : e.target.dataset.userid,
          userName: e.target.dataset.username,
          type :e.target.dataset.type
        };
        this.dialogs.AuthorizeOrInitStaffDialog = true;
      },

      // 排序
      sortCallBack(value){
        this.sort_index = value;
      },

      // 关闭用户弹窗
      close(dialogs, store){
        this.dialogs[dialogs] = false;
        if(store){
          this.$store.commit('authorizeFrame/setRefresh', !this.refresh);
        }
      },

      // 分页输入框跳转事件
      changeCurrentPage(page){
        this.pagination.centent.current_page = page;
      }

    },
    components:{
      SortVue,
      PaginationVue,
      SearchVue,
      AuthorizeOrInitStaffDialog
    }
  }
</script>
