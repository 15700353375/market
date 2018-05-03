<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 员工管理-员工列表
 -->

<template>
    <div class="clearfix">
        <div class="clearfix scroll_box">
        <!-- <div class="scroll_main">
            <h2>哈就舒服啊发斯蒂芬白色的发是大家发收到罚单是你发哈就舒服啊发斯蒂芬白色的发是大家,,发收到罚单是你发哈就舒服啊发斯蒂芬白色的发是大家发收到罚单是你发哈就舒服啊发斯蒂芬白色的发是大家发收到罚单是你发</h2>
        </div> -->

        <table class="table scroll_main table-bordered table-hover text-center mg-b0">
            <thead>
              <tr>
                <th class='cur-p text-center' style="width:150px;">名称</th>
                <th class='cur-p text-center' >名称名称名称名称</th>
                <th class='cur-p text-center' >名称名称名称3</th>
                <th class='cur-p text-center' >名称名称名称3</th>
                <th class='cur-p text-center' >名称名称名称3</th>
                <th class='cur-p text-center' >名称名称名称3</th>
                <th class='cur-p text-center' >名称名称名称7</th>
                <th class='cur-p text-center' >名称名称名称8</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                </tr>
                <tr>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                </tr>
                <tr>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                </tr><tr>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                </tr>
                <tr>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                    <td>是加法的</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>

    
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import { mapState } from 'vuex';
  // 引入外部模块
  import {echarts} from '@Util/charts';
  export default {
    data(){
      return {
        

        echartsArr: [],


      }
    },
    mounted(){
 
    },
    computed:{
      
    },
    methods: {

    },
    components:{
        
    }
  }
</script>

<style scoped lang='less'>
    .scroll_box{
        width:100%;
        height: 100%;
        position: relative;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .scroll_main{
            width:1200px;
            -webkit-overflow-scrolling: touch;
        }

        .scroll_main.table{
            width: 1200px;
            max-width:1200px;
        }
    }


</style>

