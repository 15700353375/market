<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 系统日志
 -->

<template>
  <div class="main">
    <div class="tabs">
      <ul>
        <i class="iconTitle"></i>
        <li class="text-center pull-left">日志列表</li>
      </ul>
    </div>

    <div class="customerList">
      <div class="condition">
        <div class="displayNone">{{AllData}}</div>
        <TimeVue v-model="timeVal"></TimeVue>
        <div class="hr">

          <SearchVue v-model="searchText"></SearchVue>

          <span>操作人：</span>
          <SelevtVue v-model="staff.value"
                     :options="staff.options"
                     :searchBox="true">
          </SelevtVue>

          <span>日志类型：</span>
          <SelevtVue v-model="systemType.value"
                     :options="systemType.options">
          </SelevtVue>

        </div>




      </div>

      <div class="result">
          <table class="table table-bordered table-hover text-center"
                 :class="{'marginB-20': !tableData.length }">
            <thead>
              <tr>
                <th>序号</th>
                <th>时间</th>
                <th>操作人</th>
                <th>手机号</th>
                <th>日志类型</th>
                <th class="width-500">详情</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="tableData.length">
                <tr v-for="itemParent in tableData">
                  <td>{{itemParent.index}}</td>
                  <td>{{itemParent.createTimeName}}</td>
                  <td>{{itemParent.username}}</td>
                  <td>{{itemParent.mobile}}</td>
                  <td>{{itemParent.type_name}}</td>
                  <td>{{itemParent.content}}</td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="13">暂无数据</td>
              </tr>
            </tbody>
          </table>

          <div v-if="tableData.length"
               class="paginationDiv">
            <span class="paginationTitle">
              共<b class="textColor">{{pagination.centent.total}}</b>条记录
            </span>
            <PaginationVue :pagination.sync="pagination"
                           @changeCurrentPage="changeCurrentPage">
            </PaginationVue>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import comUtil from '@Util/comUtil';
  import TimeVue from '@Components/TimeVue';
  import SelevtVue from '@Components/SelevtVue';
  import PaginationVue from '@Components/PaginationVue';
  import SearchVue from '@Components/SearchVue';
  export default {
    data(){
      return {
        // 公共方法
        comUtil: comUtil,

        // 时间
        timeVal: {
          startTime:  Moment().startOf('day').unix(),
          endTime: Moment().unix()
        },

        // 搜索key
        searchText: '',

        // 员工
        staff: {
          value: '',
          options: []
        },

        // 日志类型
        systemType: {
          value: '',
          options: [
            {
              value: 1,
              label: '登录'
            },
            {
              value: 2,
              label: '超市授权'
            },
            {
              value: 3,
              label: '授权数分配'
            },
            {
              value: 4,
              label: '授权数回收'
            },
            {
              value: 5,
              label: '申请授权数'
            },
            {
              value: 6,
              label: '新增员工'
            },
            {
              value: 7,
              label: '编辑员工'
            },
            {
              value: 8,
              label: '删除员工'
            },
            {
              value: 9,
              label: '修改销售员'
            }
          ]
        },


        // 表格数据
        tableData: [],


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

      }
    },
    mounted(){

      // 获取员工下拉菜单
      let employeePromsie = this.$ajaxPost(urls.EMPLOYEE_ALL_EMPLOYEE);
      if(employeePromsie){
        employeePromsie.then((res) =>{
          if(res){
            if(res.code == 200){
              this.staff.options = comUtil.formatEmployee(res.data);
            }
          }
        })
      }

    },
    computed:{
      //计算属性，任意数据改变，更改表格数据tableData
      AllData(){
        let param = {
          //日期查询
          start_time: this.timeVal.startTime,
          end_time: this.timeVal.endTime,

          // 搜索key
          keywords: this.searchText,

          // 操作人
          user_id: this.staff.value,

          // 日志类型
          type: this.systemType.value,

          // 分页信息
          limit: this.pagination.centent.limit,
          page: this.pagination.centent.current_page,
        };

        this.queryList(param);
      }
    },
    methods: {

      // 格式化服务器数据
      formatTable(list){
        list.forEach((item)=>{
          item.createTimeName = comUtil.formatTime(item.create_time, 'YYYY-MM-DD HH:mm');
        })
        return list;
      },

      //获取查询结果数据
      queryList(param){
        let tablePromsie = this.$ajaxGet(urls.LOG_LIST, param);
        if(tablePromsie){
          tablePromsie.then((res) =>{
            if(res &&res.code == 200){
              this.tableData = this.formatTable(res.data.list);
              this.pagination.centent.total = res.data.pagination.total_num;
              // this.pagination.centent.current_page = res.data.pagination.page;
              this.pagination.centent.last_page = res.data.pagination.total_page;
            }
        })
        }
      },

      // 分页输入框跳转事件
      changeCurrentPage(page){
        this.pagination.centent.current_page = page;
      }
    },
    components:{
      TimeVue,
      SelevtVue,
      PaginationVue,
      SearchVue
    }
  }
</script>
