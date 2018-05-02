<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 员工管理-员工列表
 -->

<template>
    <div class="clearfix charts_box">
        <div class="chart_tit">{{chartsTit}}</div>
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
        <div class="echarts_box_shadow"></div>
        <div :id="chartsName" class="charts_gauge"></div>
        <div class="statistics">
            <div class="stac_item">
                <div class="item_number color_red">{{chartsData.sell}}</div>
                <div class="item_text">卖出</div>
            </div>
            <div class="stac_item">
                <div class="item_number color_gray">{{chartsData.neutral}}</div>
                <div class="item_text">中立</div>
            </div>
            <div class="stac_item">
                <div class="item_number color_blue">{{chartsData.buy}}</div>
                <div class="item_text">买入</div>
            </div>
        </div>
    </div>
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import { mapState } from 'vuex';
  // 引入外部模块
  import {echarts} from '@Util/charts';
  export default {
    props: ['chartsName','chartsTit','chartsData'],
    data(){
      return {
        

        echartsArr: [],
        // chartsName：this.chartsName,
        chartsNames: this.chartsName

      }
    },
      watch: {  
        chartsData(newValue, oldValue){  
            
            this.chartsData = newValue;
            this.drawChar1();
    　　}  
    },
    mounted(){
        // 默认当前头部为第一个
        // this.$router.push({name:'basic'})
        this.drawChar1();
        console.log(this.chartsData)
        
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
                        radius: "100%", //仪表大小
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
                                width: 5,
                                shadowBlur:{
                                    // shadowColor: 'rgba(0, 0, 0, 0.5)',
                                    shadowColor:'#000',
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 10,
                                    opacity:0.5,
                                    shadowBlur: 20
                                },
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
                            fontWeight: 'bold',
                            fontSize:26
                        },
                        data: [{value: 50,}],
                    }
                       
                    
                ]
            };


    
        myChart.setOption(option)

        let chartVal = 50;

        if(this.chartsData){
            // debugger
            switch(this.chartsData.pointer){
                case '强烈卖出' : chartVal = 10; break;
                case '卖出' : chartVal = 30; break;
                case '中立' : chartVal = 50; break;
                case '买入' : chartVal = 70; break;
                case '强烈买入' : chartVal = 90; break;
            }
        }

        option.series[0].data[0].value = chartVal;
        myChart.setOption(option, true);


      },
 



    },
    components:{
        
    }
  }
</script>

<style scoped lang='less'>
    .charts_box{
        width:500px;
        height: 380px;
        position: relative;
        .chart_tit{
            text-align: center;
            font-size: 20px;
            line-height: 50px;
        }
        .text-box{
            position: absolute;
            width: 100%;
            .text2{
                width:55%;
                margin:0 auto;
                margin-top:25px;
            }
            .text3{
                width:88%;
                margin:0 auto;
                margin-top:80px;
            }
        }
        .echarts_box_shadow{
            position: absolute;
            left: 108px;
            top: 85px;
            width: 288px;
            height: 149px;
            border-top-left-radius: 306px;
            border-top-right-radius: 306px;
            box-shadow: inset 0 30px 60px -10px rgba(59,179,228,.3);
        }
        .statistics{
            position: absolute;
            bottom:0px;
            width:228px;
            height: 44;
            left: 50%;
            margin-left: -114px;
            .stac_item{
                width:76px;
                height: 44px;
                float: left;
                .item_number{
                    font-size: 20px;
                    text-align: center;
                }
                .item_text{
                    color:#9db2bd;
                    font-size: 12px;
                    text-align: center;
                }
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
        margin-top:30px;
        width:500px;
        height: 300px;
    }
</style>

