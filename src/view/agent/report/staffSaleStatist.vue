<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 员工销售统计
 -->

<template>
  <div>
    <div class="condition saleRecord">
      <div class="displayNone">{{AllData}}</div>
      <TimeVue v-model="timeVal"></TimeVue>
      <span>销售员：</span>
      <SelevtVue v-model="staff.value"
                 :options="staff.options"
                 :searchBox="true">
      </SelevtVue>
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
              <th colspan="3">标准版</th>
              <th colspan="3">增值版</th>
              <th is="SortVue"
                  class="verticalCenter sortTh"
                  title="销售总额"
                  attr="total_sale_money"
                  rowspan="2"
                  @sortCallBack="sortCallBack">
              </th>
            </tr>
            <tr >
              <th class="specialColor">销量</th>
              <th class="specialColor">销售额</th>
              <th class="specialColor">客户数</th>
              <th class="specialColor">销量</th>
              <th class="specialColor">销售额</th>
              <th class="specialColor">客户数</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="tableData.length">
              <tr v-for="itemParent in tableData">
                <td>{{itemParent.index}}</td>
                <td>{{itemParent.username}}</td>
                <td>{{itemParent.mobile}}</td>
                <td>{{itemParent.empower_num1}}</td>
                <td>{{itemParent.sale_money1}}</td>
                <td>{{itemParent.shop_num1}}</td>
                <td>{{itemParent.empower_num2}}</td>
                <td>{{itemParent.sale_money2}}</td>
                <td>{{itemParent.shop_num2}}</td>
                <td>{{itemParent.total_sale_money}}</td>
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
            共<b class="textColor">{{pagination.centent.total}}</b>条记录，销售总额:<b class="textColor bold">{{comUtil.formatMoney(tableCount)}}</b>元
          </span>
          <PaginationVue :pagination.sync="pagination"
                         @changeCurrentPage="changeCurrentPage">
          </PaginationVue>
        </div>
    </div>
  </div>
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import comUtil from '@Util/comUtil';
  import SortVue from '@Components/SortVue';
  import TimeVue from '@Components/TimeVue';
  import SelevtVue from '@Components/SelevtVue';
  import CascadeVue from '@Components/CascadeVue';
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

        // 员工
        staff: {
          value: '',
          options: []
        },

        // 表格数据
        tableData: [],

        // 排序
        sort_index: '',

        // 表格统计
        tableCount: 0,

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

          // 员工
          user_id: this.staff.value,

          // 排序
          sort_index: this.sort_index,

          // 分页信息
          limit: this.pagination.centent.limit,
          page: this.pagination.centent.current_page,
        };

        this.queryList(param);
      }
    },
    methods: {

      //获取查询结果数据
      queryList(param){
        let tablePromsie = this.$ajaxPost(urls.SALE_EMPLOYEE_SALELIST, param);
        if(tablePromsie){
          tablePromsie.then((res) =>{
            if(res){
              if(res.code == 200){
                this.tableData = res.data.list;
                this.tableCount = res.data.sum_sale_money;
                this.pagination.centent.total = res.data.pagination.total_num;
                // this.pagination.centent.current_page = res.data.pagination.page;
                this.pagination.centent.last_page = res.data.pagination.total_page;
              }
            }
          })
        }
      },

      // 排序
      sortCallBack(value){
        this.sort_index = value;
      },

      // 分页输入框跳转事件
      changeCurrentPage(page){
        this.pagination.centent.current_page = page;
      }

    },
    components:{
      SortVue,
      TimeVue,
      SelevtVue,
      CascadeVue,
      PaginationVue,
      SearchVue
    }
  }
</script>
