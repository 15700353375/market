<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 申请授权数
 -->

<template>
  <div class="applyPower">
    <div class="condition">
      <div class="displayNone">{{AllData}}</div>
      <div class="displayNone">{{countLocalState}}</div>
    </div>

    <div class="result">
        <table class="table table-bordered table-hover text-center"
               :class="{'marginB-20': !tableData.length }">
          <thead>
            <tr>
                <th>序号</th>
                <th>申请时间</th>
                <th>申请数量</th>
                <th>申请版本</th>
                <th>备注</th>
                <th>申请人</th>
                <th>申请进度</th>
                <th>进度说明</th>
              </tr>
          </thead>
          <tbody>
            <template v-if="tableData.length">
              <tr v-for="itemParent in tableData">
                <td>{{itemParent.index}}</td>
                <td>{{itemParent.createTimeName}}</td>
                <td>{{itemParent.empower_num}}个</td>
                <td :class="{'standard': itemParent.version_type == 1,
                             'increment': itemParent.version_type == 2}">{{itemParent.versionName}}
                <td>{{itemParent.remarks}}</td>
                <td>{{itemParent.create_user_name}}</td>
                <td :class="{'pass': itemParent.flag == 1,
                             'refuse': itemParent.flag == 3}">{{itemParent.flagDetail}}
                <td>{{itemParent.maketing_remarks}}</td>
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
  import PaginationVue from '@Components/PaginationVue';
  import { mapState } from 'vuex';
  export default {
    data(){
      return {
        // 公共方法
        comUtil: comUtil,

        // 表格数据
        tableData: [],

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        refresh: false,

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
        let tablePromsie = this.$ajaxGet(urls.AGENT_APPLY_LIST, param);
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
          item.versionName = item.version_type == 1 ? '标准版' : '增值版';
          item.createTimeName = comUtil.formatTime(item.create_time, 'YYYY-MM-DD');
          switch (item.flag)
            {
              case '0':
              item.flagDetail = '提交';
              break;
              case '1':
              item.flagDetail = '审核中';
              break;
              case '2':
              item.flagDetail = '通过';
              break;
              case '3':
              item.flagDetail = '驳回';
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
      PaginationVue
    }
  }
</script>
