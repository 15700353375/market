<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 超市管理-超市列表
 -->

<template>
  <div class="main">
    <div class="displayNone">{{countLocalState}}</div>
    <div class="tabs">
      <ul>
        <i class="iconTitle"></i>
        <li class="pull-left">超市列表</li>
      </ul>
    </div>

    <div class="customerList">
      <div class="condition">
        <div class="displayNone">{{AllData}}</div>
        <div class="hr">
          <SearchVue v-model="searchText"
                     placeholder="超市名称/联系电话">
          </SearchVue>

          <span>状态：</span>
          <SelevtVue v-model="status.value"
                     :options="status.options">
          </SelevtVue>

          <span>区域：</span>
          <CascadeVue v-model="region.value"
                      :options="region.options">
          </CascadeVue>

          <span>版本：</span>
          <SelevtVue v-model="version.value"
                     :options="version.options">
          </SelevtVue>

          <span>销售员：</span>
          <SelevtVue v-model="staff.value"
                     :options="staff.options"
                     :searchBox="true">
          </SelevtVue>
        </div>
      </div>

      <div class="result">
          <table class="table table-bordered table-hover text-center"
                 :class="{'marginB-20': !tableData.length }">
            <thead>
              <tr>
                <th>序号</th>
                <th>超市名称</th>
                <th>区域</th>
                <th>详细地址</th>
                <th>联系人</th>
                <th>联系电话</th>
                <th>在线POS</th>
                <th>版本</th>
                <th>销售员</th>
                <th is="SortVue"
                    class="sortTh"
                    title="注册时间"
                    attr="create_time"
                    @sortCallBack="sortCallBack">
                </th>
                <th is="SortVue"
                    class="sortTh"
                    title="剩余"
                    attr="empower_end_date"
                    @sortCallBack="sortCallBack">
                </th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="tableData.length">
                <tr v-for="itemParent in tableData">
                  <td>{{itemParent.index}}</td>
                  <td>{{itemParent.shop_name}}</td>
                  <td>{{itemParent.regionName}}</td>
                  <td>{{itemParent.address}}</td>
                  <td>{{itemParent.manager_name}}</td>
                  <td>{{itemParent.manager_phone}}</td>
                  <td>{{itemParent.online_pos_num}}</td>
                  <td :class="{'standard': itemParent.version_type == 1,
                               'increment': itemParent.version_type == 2}">{{itemParent.versionName}}
                  </td>
                  <td>{{itemParent.username}}</td>
                  <td>{{itemParent.createTimeName}}</td>
                  <td>{{itemParent.days}}天</td>
                  <td :class="{'Expired': itemParent.shop_status == 0,
                               'normal': itemParent.shop_status == 1,
                               'disable': itemParent.shop_status == 2}">{{itemParent.statusName}}
                  <td>
                    <button type="button"
                            class="btn btn-link padding-0 detail"
                            :data-shopId="itemParent.shop_id"
                            @click="userDetail('MarketConsumerDialog', $event)">详情
                    </button>
                    <button type="button"
                            class="btn btn-link padding-0 power"
                            :data-shopId="itemParent.shop_id"
                            @click="userDetail('MarkeAuthorizeDialog', $event)">授权
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

    <!-- 用户详情弹窗 -->
    <MarketConsumerDialog v-if="dialogs.MarketConsumerDialog"
                          :shopDetailData="shopDetailData"
                          @close="close">
    </MarketConsumerDialog>

    <!-- 用户授权弹窗 -->
    <MarkeAuthorizeDialog v-if="dialogs.MarkeAuthorizeDialog"
                          :shopDetailData="shopDetailData"
                          @close="close">
    </MarkeAuthorizeDialog>


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
  import MarketConsumerDialog from '@Components/MarketConsumerDialog';
  import MarkeAuthorizeDialog from '@Components/MarkeAuthorizeDialog';
  import { mapState } from 'vuex';
  export default {
    data(){
      return {
        // 公共方法
        comUtil: comUtil,

        // 状态
        status: {
          value: "",
          options: [
            {
              value: 0,
              label: '过期'
            },
            {
              value: 1,
              label: '正常'
            },
            {
              value: 2,
              label: '禁用'
            }
          ]
        },

        // 搜索key
        searchText: '',

        // 区域
        region: {
          value: '',
          options: []
        },

        // 版本
        version: {
          value: '',
          options: [
            {
              value: 0,
              label: '标准版（试用）'
            },
            {
              value: 1,
              label: '标准版'
            },
            {
              value: 2,
              label: '增值版'
            }
          ]
        },

        // 员工
        staff: {
          value: '',
          options: []
        },

        // 排序
        sort_index: '',

        // 表格数据
        tableData: [],

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

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        refresh:false,

        // 超市详情
        shopDetailData: '',

        //相关模态框开关
        dialogs: {
          MarketConsumerDialog: false,
          MarkeAuthorizeDialog: false
        },

      }
    },
    mounted(){

      // 获取员工下拉菜单
      this.$ajaxPost(urls.EMPLOYEE_ALL_EMPLOYEE)
          .then((res) =>{
              if(res.code == 200){
                this.staff.options = comUtil.formatEmployee(res.data);
              }
          })
    },
    computed:{
      ...mapState({
        // 区域option，从vuex中获取
        countLocalState(state){
          this.region.options = state.common.regionOptions;
        }
      }),
      //计算属性，任意数据改变，更改表格数据tableData
      AllData(){
        let param = {
          // 搜索key
          keywords: this.searchText,

          // 状态
          search_status: this.status.value,

          // 区域
          city_id: this.region.value,

          // 版本
          version_type: this.version.value,

          // 排序
          sort_index: this.sort_index,

          // 销售员
          user_id: this.staff.value,

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

      // 格式化服务器数据
      formatTable(list){
        list.forEach((item)=>{
          item.regionName = comUtil.formatRegion(item.province_id, item.city_id, this.region.options);
          item.versionName = item.version_type == 0 ? '标准版（试用）' :
                             item.version_type == 1 ? '标准版' : '增值版';
          item.statusName = item.shop_status == 0 ? '过期' :
                            item.shop_status == 1 ? '正常' : '禁用';
          item.createTimeName = comUtil.formatTime(item.create_time, 'YYYY-MM-DD HH:mm');
        })
        return list;
      },

      //获取查询结果数据
      queryList(param){
        this.$ajaxGet(urls.SHOP_LIST, param)
            .then((res) =>{
                if(res && res.code == 200){
                  this.tableData = this.formatTable(res.data.list);
                  this.pagination.centent.total = res.data.pagination.total_num;
                  // this.pagination.centent.current_page = res.data.pagination.page;
                  this.pagination.centent.last_page = res.data.pagination.total_page;
                }
            })
      },

      // 用户详情弹窗
      userDetail(key, e){
        // 获取客户信息
        let param = {
          shop_id: e.target.dataset.shopid
        };
        let userIdPromsie = this.$ajaxGet(urls.SHOP_DETAIL, param);
        if(userIdPromsie){
          userIdPromsie.then((res) =>{
            if(res && res.code == 200){
              this.shopDetailData = this.formatTable(res.data)[0];
              this.dialogs[key] = true;
            }
          })
        }
      },

      // 排序
      sortCallBack(value){
        this.sort_index = value;
      },

      // 关闭用户弹窗
      close(dialogs,store){
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
      SortVue,
      TimeVue,
      SelevtVue,
      CascadeVue,
      PaginationVue,
      SearchVue,
      MarketConsumerDialog,
      MarkeAuthorizeDialog
    }
  }
</script>
