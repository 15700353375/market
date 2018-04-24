<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 授权管理-员工详情-标准版授权记录
 -->

<template>
  <div class="authorizeUserStandard">
    <div class="condition">
      <div class="displayNone">{{countLocalState}}</div>
      <div class="displayNone">{{AllData}}</div>
      <TimeVue v-model="timeVal"></TimeVue>
      <span>变动类型：</span>
      <SelevtVue v-model="changeType.value"
                 :options="changeType.options">
      </SelevtVue>
    </div>

    <div class="result">
        <table class="table table-bordered table-hover text-center"
               :class="{'marginB-20': !tableData.length }">
          <thead>
            <tr>
              <th>序号</th>
              <th>变动类型</th>
              <th>变动前数量</th>
              <th>变动数量</th>
              <th>变动后数量</th>
              <th>时间</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="tableData.length">
              <tr v-for="itemParent in tableData">
                <td>{{itemParent.index}}</td>
                <td>{{itemParent.typeName}}</td>
                <td>{{itemParent.action_before}}</td>
                <td :class="{'decline': itemParent.actionName < 0,
                             'rise': itemParent.actionName > 0}">{{itemParent.actionName}}
                </td>
                <td>{{itemParent.action_after}}</td>
                <td>{{itemParent.createTimeName}}</td>
                <td>{{itemParent.description}}</td>
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
            共<b class="textColor">{{pagination.centent.total}}</b>条记录
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
  import TimeVue from '@Components/TimeVue';
  import SelevtVue from '@Components/SelevtVue';
  import PaginationVue from '@Components/PaginationVue';
  import { mapState } from 'vuex';
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

        // 变动类型
        changeType: {
          value: '',
          options: [
            {
              value: 1,
              label: '分配'
            },
            {
              value: 2,
              label: '回收'
            },
            {
              value: 3,
              label: '销售'
            }
          ]
        },

        // 表格数据
        tableData: [],

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        refresh: '',

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
        }
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
          // 版本
          version_type: 1,

          // 操作类型
          action_type: this.changeType.value,

          //日期查询
          start_time: this.timeVal.startTime,
          end_time: this.timeVal.endTime,

          // 员工
          user_id: this.$route.query.userId,

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
        let tablePromsie = this.$ajaxPost(urls.EMPLOYEE_EMPLOYEE_ASSIGNED, param);
        if(tablePromsie){
          tablePromsie.then((res) =>{
            if(res){
              if(res.code == 200){
                this.tableData = this.formatTable(res.data.list);
                this.pagination.centent.total = res.data.pagination.total_num;
                // this.pagination.centent.current_page = res.data.pagination.page;
                this.pagination.centent.last_page = res.data.pagination.total_page;
              }
            }
          })
        }
      },

      // 格式化服务器数据
      formatTable(list){
        list.forEach((item)=>{
          item.createTimeName = comUtil.formatTime(item.create_time, 'YYYY-MM-DD HH:mm');
          item.actionName = item.action_before - item.action_after > 0 ? `-${item.empower_num}`:`+${item.empower_num}`;
          switch (item.action_type){
            case  '1':
            item.typeName = '分配';
            break;
            case  '2':
            item.typeName = '回收';
            break;
            case  '3':
            item.typeName = '销售';
            break;
          }
        })
        return list;
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
    }
  }
</script>
