<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 10:55:32
 * @Description: 进入代理平台主页面
 -->

<template>
  <div id="vueRouter" class="clearfix">
  <!--   <alert type="success" >
      <p>You successfully read this important alert message.</p>
    </alert>
    <bs-input :value.sync="keywords" label="Username" help="Only allows lowercase letters and numbers." error="Insert username" placeholder="Username can't start with a number." pattern="^[a-z][a-z0-9]+$" :mask="mask" :minlength="minLen" required icon></bs-input> -->

    <!-- 左侧导航 -->
    <!-- <NavMenuVue></NavMenuVue> -->

    <!-- 顶部导航 -->
    <TopbarVue></TopbarVue>
    <router-view></router-view>
  </div>
</template>

<script>
//   import NavMenuVue from '@Components/NavMenuVue';
  import TopbarVue from '@Components/TopbarVue';
  export default {
    data(){
      return {
        keywords: '',
        minLen: 5,
        navData: [
           {
            index:'1',
            name: '销售报表',
            class: 'zm-icomoon-icon_report-form',
            hasPermission: true,
            list: [
              {
                index:'1-1',
                name: '汇总报表',
                hasPermission: true,
                url: '/shop/report/collectReport'
              },
              {
                index:'1-2',
                name: '销售报表',
                hasPermission: true,
                url: '/shop/report/collectReport'
              }
            ]
          },
          {
            index:'2',
            name: '超市管理',
            class: 'zm-icomoon-icon_report-form',
            hasPermission: true,
            list: [
              {
                index:'2-1',
                name: '超市管理1',
                hasPermission: true,
                url: '/shop/report/collectReport'
              },
              {
                index:'2-2',
                name: '超市管理2',
                hasPermission: true,
                url: '/shop/report/collectReport'
              }
            ]
          }
        ]
      }
    },
    mounted(){

    },
    methods: {
      mask: function (value) {
        // change to lowercase, remove up to the first letter, and then remove all other unsuported characters
        return value.toLowerCase().replace(/^[^a-z]+/,'').replace(/[^a-z0-9]/g,'');
      }
    },
    components:{
    //   NavMenuVue,
      TopbarVue
    }
  }
</script>
