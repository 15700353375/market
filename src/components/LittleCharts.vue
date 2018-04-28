<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 员工管理-员工列表
 -->

<template>
    <div class="clearfix charts_box">
        <div class="text-box">
            <div class="text-center">中立</div>
            <div class="clearfix text2">
                <span class="float_left">卖出</span>
                <span class="float_right">买入</span>
            </div>
            <div class="clearfix text3">
                <span class="float_left">强烈卖出</span>
                <span class="float_right">强烈买入</span>
            </div>
        </div>
        <div :id="chartsName" class="charts_gauge"></div>
    </div>
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import { mapState } from 'vuex';
  // 引入外部模块
  import {echarts} from '@Util/charts';
  export default {
    props: ['chartsName'],
    data(){
      return {
        

        echartsArr: [],
        // chartsName：this.chartsName,
        chartsNames: this.chartsName

      }
    },
    mounted(){
        // 默认当前头部为第一个
        // this.$router.push({name:'basic'})
        this.drawChar1();
    },
    computed:{
      
    },
    methods: {

         //绘制饼图-销售额分布
     drawChar1() {
        if (!document.querySelector('#'+this.chartsNames)) {
          return
        }
        let myChart = echarts.init(document.querySelector('#'+this.chartsNames))
        this.echartsArr.push(myChart)

        let option = {
  
                series: [
                    {   
                        type: "gauge",
                        center: ["50%", "50%"], // 仪表位置
                        radius: "85%", //仪表大小
                        startAngle: 180, //开始角度
                        endAngle: 0, //结束角度
                        splitNumber: 5,
                        pointer: {
                            width:4
                        },
                        itemStyle:{ 
                            color:'#000',
                        },
                         axisLine: {
                            show: false,
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [ 0.2,  new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 1,
                                        color: "#ff4a68" // 50% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#ff4a68" // 40% 处的颜色
                                    }], false) ], // 100% 处的颜色
                                    [ 0.4,  new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 1,
                                        color: "#ff92a4 " // 70% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#ff92a4 " // 66% 处的颜色
                                    }], false) ],
                                    [ 0.6,  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 1,
                                        color: "#f2f3f5" // 90% 处的颜色
                                    }], false) ],
                                    [0.8,  new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
                                        offset: 0.2,
                                        color: "#89d1ef" // 92% 处的颜色
                                    }, {
                                        offset: 0,
                                        color: "#89d1ef" // 90% 处的颜色
                                    }], false) ],
                                    [1,  new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
                                        offset: 0.2,
                                        color: "#3bb3e4" // 92% 处的颜色
                                    }, {
                                        offset: 0,
                                        color: "#3bb3e4" // 90% 处的颜色
                                    }], false) ]
                                ],
                                width: 5
                            }
                        },
                        splitLine: { 
                            show: true,  //大刻度
                            length:5,                            
                        },
                        axisTick: {
                            show: false  //小刻度
                        },
                        axisLabel: {
                            show: false  //刻度数字
                        },
                        
                        detail: {
                            formatter:function (value) {
                                if(value <=20){
                                    return '强烈卖出';
                                }else if(value > 20 && value <= 40){
                                    return '卖出';
                                }else if(value > 40 && value <= 60){
                                    return '中立';
                                }else if(value > 60 && value <= 80){
                                    return '买入';
                                }else{
                                    return '强烈买入';
                                }
                            },
                            color:'auto',
                            fontWeight: 'bold'
                        },
                        data: [{value: 50,}],
                    }
                       
                    
                ]
            };


    
        myChart.setOption(option)

        setInterval(function () {
            option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            myChart.setOption(option, true);
        },2000);


      },
 



    },
    components:{
        
    }
  }
</script>

<style scoped lang='less'>
    .charts_box{
        width:350px;
        height: 250px;
        position: relative;
        .text-box{
            position: absolute;
            width: 100%;
            .text2{
                width:68%;
                margin:0 auto;
                margin-top:15px;
            }
            .text3{
                width:100%;
                margin:0 auto;
                margin-top:45px;
            }
        }
    }
    .charts_mask{
        // background:#ddd;
        // opacity: 0.5;
        position: absolute;
        top: 35px;
        left: 106px;
        width: 287px;
        height: 146px;
        border-top-left-radius: 306px;
        border-top-right-radius: 306px;
        transition: box-shadow 1.5s ease;
        box-shadow: inset 0 30px 60px -10px rgba(255,74,104,.3);
    }
    .charts_gauge{
        // margin-top:30px;
        width:350px;
        height: 250px;
    }
</style>

