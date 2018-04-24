<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 员工管理-员工列表
 -->

<template>
  <div class="main staffList">
    <div class="tabs">
      <ul>
        <i class="iconTitle"></i>
        <li class="pull-left">客户列表</li>
      </ul>
      <div class="addBtn pull-right">
          <button class="btn"
                  @click="addStaff">
            <i class="agent-common_icon_add pull-left"></i>
            <span>新增员工</span>
          </button>
        </div>
    </div>

    <div>
      <div class="condition">
        <div class="displayNone">{{AllData}}</div>
      </div>
      <div class="result">
          <table class="table table-bordered table-hover text-center"
                 :class="{'marginB-20': !tableData.length }">
            <thead>
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>账号</th>
                <th>手机号</th>
                <th>角色</th>
                <th class="width-140">操作</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="tableData.length">
                <tr v-for="itemParent in tableData">
                  <td>{{itemParent.index}}</td>
                  <td>{{itemParent.username}}</td>
                  <td>{{itemParent.mobile}}</td>
                  <td>{{itemParent.mobile}}</td>
                  <td>{{itemParent.role_name}}</td>
                  <td>
                    <button v-if="itemParent.index != 1"
                            type="button"
                            class="btn btn-link padding-0 edit"
                            :data-id="itemParent.id"
                            @click="addStaff('edit', $event)">编辑
                    </button>
                    <button v-if="itemParent.index != 1"
                            type="button"
                            class="btn btn-link padding-0 deleteStaff"
                            :data-id="itemParent.id"
                            :data-userName="itemParent.username"
                            @click="deleteStaff($event)">删除
                    </button>
                  </td>
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
              共<b class="textColor">{{pagination.centent.total}}</b>条数据
            </span>
            <PaginationVue :pagination.sync="pagination"
                           @changeCurrentPage="changeCurrentPage">
            </PaginationVue>
          </div>
      </div>
    </div>

    <!-- 新增or修改弹窗 -->
    <staffManagerAddorEditDialog v-if="dialogs.staffManagerAddorEditDialog"
                                 :staffInfo="staffInfo"
                                 @close="close">
    </staffManagerAddorEditDialog>

    <!-- dialog -->
    <DialogVue v-if="dialogs.dialogVue"
               title="删除"
               :content="dialogVueContent"
               :comfirmsCallBack="comfirmsCallBack"
               :cancelCallBack="cancelCallBack"
               @close="close">
    </DialogVue>

  </div>
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import PaginationVue from '@Components/PaginationVue';
  import staffManagerAddorEditDialog from '@Components/staffManagerAddorEditDialog';
  import DialogVue from '@Components/DialogVue';

  export default {
    data(){
      return {

        // 员工信息
        staffInfo: '',

        // 表格数据
        tableData: [],

        // 用于回调删除
        userId: '',

        // dialog的提示语
        dialogVueContent: '',

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

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        refresh:false,


        //相关模态框开关
        dialogs: {
          staffManagerAddorEditDialog: false,
          dialogVue: false,
        },

      }
    },
    mounted(){},
    computed:{

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
        this.$ajaxGet(urls.EMPLOYEE_LIST_EMPLOYEE, param)
            .then((res) =>{
              if(res && res.code == 200){
                this.tableData = res.data.list;
                this.pagination.centent.total = res.data.pagination.total_num;
                // this.pagination.centent.current_page = res.data.pagination.page;
                this.pagination.centent.last_page = res.data.pagination.total_page;
              }
            })
      },

      // 编辑员工
      addStaff(editStatus, e){
        // 每次点击之前，清空员工信息
        this.staffInfo = '';
        if(editStatus == 'edit'){
          // 请求数据
          let staffParams = {
            user_id: e.target.dataset.id
          };
          let staffPromsie = this.$ajaxGet(urls.EMPLOYEE_GET_EMPLOYEE_INFO, staffParams);
          if(staffPromsie){
            staffPromsie.then((res) =>{
                if(res && res.code == 200){
                  this.staffInfo = res.data;
                  this.dialogs.staffManagerAddorEditDialog = true;
                }
            })
          }
        }else{
          this.dialogs.staffManagerAddorEditDialog = true;
        }
      },

      // 删除员工
      deleteStaff(e){
        this.userId = e.target.dataset.id;
        this.dialogVueContent = `员工删除后，授权数会自动回收，该员工授权数统计详情将不可查！您确定要删除吗？`;
        this.dialogs.dialogVue = true;
      },

      // 删除员工dialog确认回调
      comfirmsCallBack(btnLoading){
        btnLoading.loading = true;
        let staffParams = {
          user_id: this.userId
        };
        let staffPromsie = this.$ajaxPost(urls.EMPLOYEE_DEL_EMPLOYEE, staffParams, btnLoading);
        if(staffPromsie){
          staffPromsie.then((res) =>{
              if(res && res.code == 200){
                this.$message.success(res.message);
                this.close('dialogVue', true);
              }
          })
        }
      },

      // 删除员工dialog取消回调
      cancelCallBack(){
        this.close('dialogVue');
      },

      // 关闭用户弹窗
      close(dialogs, store){
        this.dialogs[dialogs] = false;
        if(store){
          this.refresh = !this.refresh;
        }
      },

      // 分页输入框跳转事件
      changeCurrentPage(page){
        this.pagination.centent.current_page = page;
      }
    },
    components:{
      PaginationVue,
      staffManagerAddorEditDialog,
      DialogVue
    }
  }
</script>
