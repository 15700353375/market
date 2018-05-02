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
        <div class="statistics" v-if="chartsData">
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
            // buy(newValue, oldValue){
            //     console.log(this.chartsData)
            // },
            // sell(newValue, oldValue){

            // },
            // neutral(newValue, oldValue){

            // },
            // pointer(newValue, oldValue){

            // }
    　　}  
    },
    mounted(){
        // 默认当前头部为第一个
        this.drawChar1();
        
    },
    computed:{
      // 状态管理
        // ...mapState({
        //     countLocalState(state){
        //         this.list.type = Number(state.common.listStatus);
        //         this.list.right = state.common.right;
        //         this.list.keyword = state.common.keywords;
                
                 
        //     },
        //     listName: state => state.common.listName,
        //     user: state => state.login.userInfo,
        // }),
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
        width:350px;
        height: 300px;
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
        .echarts_box_shadow{
            position: absolute;
            left: 77px;
            top: 73px;
            width: 198px;
            height: 105px;
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
        // margin-top:30px;
        width:350px;
        height: 250px;
    }
</style>

