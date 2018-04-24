<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 报表框架
 -->

<template>
  <div>
    <div class="container-fluid extra">
      <div class="row">
        <div class="col-md-4">
          <div class="part ">
            <div class="description">
              <div class="icon">
                <i class="agent-empower_icon_client_number"></i>
              </div>
              <div class="total">
                <p class="title">总客户数</p>
                <p class="number">{{total.shop_num}}</p>
              </div>
            </div>
            <div class="tip">
              <div class="row margin-0">
                <div class="col-md-6 singBorder paddingL-24">
                  <b class="greenCircle"></b>
                  <span>在线：{{total.shop_total_online}}</span>
                </div>
                <div class="col-md-6 paddingL-24">
                  <b class="grayCircle"></b>
                  <span>已过期：{{total.expired_shop_total}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="part marginL-15 marginR-15">
            <div class="description">
              <div class="icon">
                <i class="agent-empower_icon_client_number"></i>
              </div>
              <div class="total">
                <p class="title">标准版</p>
                <p class="number">{{standard.shop_num}}</p>
              </div>
            </div>
            <div class="tip">
              <div class="row margin-0">
                <div class="col-md-6 singBorder paddingL-24">
                  <b class="greenCircle"></b>
                  <span>在线：{{standard.shop_num_online}}</span>
                </div>
                <div class="col-md-6 paddingL-24">
                  <b class="grayCircle"></b>
                  <span>已过期：{{standard.expired_shop_num}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="part">
            <div class="description">
              <div class="icon">
                <i class="agent-empower_icon_client_number"></i>
              </div>
              <div class="total">
                <p class="title">增值版</p>
                <p class="number">{{increment.shop_num}}</p>
              </div>
            </div>
            <div class="tip">
              <div class="row margin-0">
                <div class="col-md-6 singBorder paddingL-24">
                  <b class="greenCircle"></b>
                  <span>在线：{{increment.shop_num_online}}</span>
                </div>
                <div class="col-md-6 paddingL-24">
                  <b class="grayCircle"></b>
                  <span>已过期：{{increment.expired_shop_num}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


    <div class="main">
      <div class="tabsUl">
        <ul>
          <li class="text-center pull-left"
              :class="{active:activeLi.staffSaleStatist}"
              @click="roRouter('staffSaleStatist', $event)">员工销售统计
          </li>
          <li class="text-center pull-left"
              :class="{active:activeLi.saleRecord}"
              @click="roRouter('saleRecord', $event)">销售记录
          </li>
        </ul>
      </div>

      <router-view></router-view>

    </div>
  </div>
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import { mapState } from 'vuex';
  export default {
    data(){
      return {
        // 总客户数
        total: {
          shop_num: 0,
          shop_total_online: 0,
          expired_shop_total: 0
        },
        // 标准版
        standard: {
          shop_num: 0,
          shop_num_online: 0,
          expired_shop_num: 0
        },
        // 增值版
        increment: {
          shop_num: 0,
          shop_num_online: 0,
          expired_shop_num: 0
        },

        // 导航条
        activeLi: {
          "staffSaleStatist": this.$route.name == "staffSaleStatist" ? true : false,
          "saleRecord": this.$route.name == "saleRecord" ? true : false,
        }
      }
    },
    mounted(){
      // 获取销售各版本统计总数
      this.$ajaxGet(urls.SALE_SALE_SHOP_STATISTICS)
          .then( (res)=>{
              if(res && res.code == 200){
                this.total = res.data.total;
                this.standard = res.data.version1;
                this.increment = res.data.version2;
              }
            });

    },
    computed:{},
    methods: {
      // 如果点击已经open的导航栏，不会初始化
      initActiveLi(){
        for(let key in this.activeLi){
          this.activeLi[key] = false;
        }
      },

      // 页面跳转
      roRouter(name, e){
        if($(e.target).hasClass('active')){
          return;
        }
        this.initActiveLi(e);
        switch(name){
          case 'staffSaleStatist':
            this.activeLi.staffSaleStatist = true;
            this.$router.push({name:'staffSaleStatist'})
            break;
          case 'saleRecord':
            this.activeLi.saleRecord = true;
            this.$router.push({name:'saleRecord'})
            break;
        }
      }
    },
    components:{}
  }
</script>
