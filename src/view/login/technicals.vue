<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 员工管理-员工列表
 -->

<template>

<div class="result mainBox">
    <div class="displayNone">{{AllData}}</div>
    <div class="little_top mg_t20">
        <div class="top_main">
            <div class="color_gray littles mg_b20">
                <span>加密货币 • 比特币</span>
                <button class="float_right btn btn-default ch_btn_green" @click='follow'>关注BTCUSD</button>
            </div>
            <div class="color_gray littles ">
                <div class="font_strong bitTitle">比特币/美元 <span>{{showName}}</span></div>
                <button v-if='!updata_flag' class="float_right btn btn-default ch_btn_green" @click='updata'>定时刷新</button>
                <button v-else class="float_right btn btn-default ch_btn_green" @click='updata'>取消定时</button>
            </div>
            
        </div>
    </div>

    <div class="main main2 pd_25 technicals clearfix" style="border:1px solid #ddd;">
        <div class="font_size20 font_strong mg_b20">技术分析</div>
        <!-- 操作栏 -->
        <ul class="pager oper_time">
            <li role="presentation"><a class="cur-p" :class="[timer == 5 ? 'border':'']" @click="timerChange" :data-hi ="5">5分钟</a></li>
            <li role="presentation"><a class="cur-p" :class="[timer == 15 ? 'border':'']" @click="timerChange" :data-hi ="15">15分钟</a></li>
            <li role="presentation"><a class="cur-p" :class="[timer == 60 ? 'border':'']" @click="timerChange" :data-hi ="60">1小时</a></li>
            <li role="presentation"><a class="cur-p" :class="[timer == 240 ? 'border':'']" @click="timerChange" :data-hi ="240">4小时</a></li>
            <li role="presentation"><a class="cur-p" :class="[timer == '1DAY' ? 'border':'']" @click="timerChange" :data-hi ="'1DAY'">1天</a></li>
            <li role="presentation"><a class="cur-p" :class="[timer == '1W' ? 'border':'']" @click="timerChange" :data-hi ="'1W'">1周</a></li>
            <li role="presentation"><a class="cur-p" :class="[timer == '1M' ? 'border':'']" @click="timerChange" :data-hi ="'1M'">1月</a></li>
        </ul>
        <div class="clearfix tech_charts">
            <div class="big">
                <div class="max"><BigCharts :chartsName='"mycharts"' :chartsTit='"总结"' :chartsData='chartsData3'></BigCharts></div>
                
                <div class="min little"><LittleCharts :chartsName='"mycharts1"' :chartsTit='"总结"' :chartsData='chartsData3'></LittleCharts></div>
            </div>
            <div class="little1 little">
                <LittleCharts :chartsName='"mycharts2"' :chartsTit='"震荡指标"' :chartsData='chartsData1'></LittleCharts>
            </div>
            <div class="little2 little">
                <LittleCharts :chartsName='"mycharts3"' :chartsTit='"移动平均线"' :chartsData='chartsData2'></LittleCharts>
            </div>
        </div>
        <div class="clearfix mg_t20 tec_box">
            <div class="clearfix table_list">
                <div class="table_item">
                    <div class="font_size20 font_strong mg_b20">震荡指标</div>
                    <table class="table mg-b0"
                        :class="{'marginB-20': !tableData || !tableData.length }">
                        <thead>
                        <tr>
                            <th class='cur-p text-left'>名称</th>
                            <th class='cur-p text-right'>价格</th>
                            <th class='cur-p text-right'>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="tableData1 && tableData1.length">
                            <tr v-for="item in tableData1">
                                <td class="text-left tit" >
                                    {{item.label}}
                                </td>
                                <td class="text-right val">{{item.value ? Number(item.value).toFixed(1) : '—'}}</td>
                                <td class="text-right val color_red" v-if="item.oper == '卖出'">{{item.oper}}</td> 
                                <td class="text-right val" v-if="item.oper == '中立'">{{item.oper}}</td> 
                                <td class="text-right val color_blue" v-if="item.oper == '买入'">{{item.oper}}</td> 
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="13">暂无数据</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="table_item">
                    <div class="font_size20 font_strong mg_b20">移动平均线</div>
                    <table class="table mg-b0"
                        :class="{'marginB-20': !tableData2 || !tableData2.length }">
                        <thead>
                        <tr>
                            <th class='cur-p text-left'>名称</th>
                            <th class='cur-p text-right'>价格</th>
                            <th class='cur-p text-right'>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="tableData2 && tableData2.length">
                            <tr v-for="item in tableData2">
                                <td class="text-left tit" >
                                    {{item.label}}
                                </td>
                                <!-- <td class="text-right val" style="width:15%">{{item.value}}</td> -->
                                <td class="text-right val">{{item.value ? Number(item.value).toFixed(1) : '—'}}</td>
                                <td class="text-right val color_red" v-if="item.oper == '卖出'">{{item.oper}}</td> 
                                <td class="text-right val" v-if="item.oper == '中立'">{{item.oper}}</td> 
                                <td class="text-right val color_blue" v-if="item.oper == '买入'">{{item.oper}}</td>                
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="13">暂无数据</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div class="clearfix table_list mg_t20">
                <div class="font_size20 font_strong mg_b20">枢轴点</div>
                    <table class="table mg-b0"
                        :class="{'marginB-20': !tableData3 || !tableData3.length }">
                        <thead>
                        <tr>
                            <th class='cur-p'>枢轴点</th>
                            <th class='cur-p text-right'>经典</th>
                            <th class='cur-p text-right'>斐波那契</th>
                            <th class='cur-p text-right'>卡玛利亚</th>
                            <th class='cur-p text-right'>伍迪</th>
                            <th class='cur-p text-right'>丹麦</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="tableData3 && tableData3.length">
                            <tr v-for="item in tableData3">
                                <td class="text-left" >
                                    {{item.title}}
                                </td>
                                <td class="text-right">{{item.val1 ? Number(item.val1).toFixed(1) : '—'}}</td>
                                <td class="text-right">{{item.val2 ? Number(item.val2).toFixed(1) : '—'}}</td>
                                <td class="text-right">{{item.val3 ? Number(item.val3).toFixed(1) : '—'}}</td>
                                <td class="text-right">{{item.val4 ? Number(item.val4).toFixed(1) : '—'}}</td>
                                <td class="text-right">{{item.val5 ? Number(item.val5).toFixed(1) : '—'}}</td>              
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="13">暂无数据</td>
                        </tr>
                        </tbody>
                    </table>
            </div>

        </div>

    </div>
</div>

</template>

<script>
import {urls} from '@Util/axiosConfig';
import dealData from '@Util/dealData';
import { mapState } from 'vuex';
import BigCharts from '@Components/BigCharts';
import LittleCharts from '@Components/LittleCharts';

  export default {
    data(){
      return {
        

        // 表格数据
        tableData: [],
        tableData1: [],
        tableData2: [],
        tableData3: [],

        // 完整数据
        allList: {
            list1: [],
            list2: [],
            list3: [],
        },

        // 部分数据
        littleList:[],

        // 是否显示更多
        moreShow: true,

        timer: '1DAY',

        // 筛选信息  -- 默认
        list: {
            type: 1,
            sortBy: 'market_cap_calc',
            sortOrder: 'desc',
            right: 'USD$',
            keyword: '',
            name: '',
        },

        // 定时更新
        updata_flag: false,

        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        refresh: false,
        timer2: null,

        showName: '',

        chartsData1: {
            buy: 0,
            sell: 0,
            neutral: 0,
            pointer: '',
        },
        chartsData2: {
            buy: 0,
            sell: 0,
            neutral: 0,
            pointer: '',
        },
        chartsData3: {
            buy: 0,
            sell: 0,
            neutral: 0,
            pointer: '',
        }
        // 指针参数

      }
    },
    mounted(){

        this.list.name = this.listName;

        this.showName = this.listName.split(':')[1];
    },
    computed:{
        // 状态管理
        ...mapState({
            countLocalState(state){
                this.list.type = Number(state.common.listStatus);
                this.list.right = state.common.right;
                this.list.keyword = state.common.keywords;
                
                 
            },
            listName: state => state.common.listName,
            user: state => state.login.userInfo,
        }),

         //计算属性，任意数据改变，更改表格数据tableData
        AllData(){
            let param = {
                timer: this.timer
            };
            let refresh = this.refresh; 
            this.getList(param);
        }
    },
    methods: {

        //克隆方法
        clone(obj){
            return  JSON.parse(JSON.stringify(obj));
        },

        // 时间切换
        timerChange(e){
            console.log(e.target.dataset.hi)
            this.timer = e.target.dataset.hi
        },

        follow(){

            if(!this.user.token){
                this.$message.warning('登录之后才能关注！')
                return
            }
            let parmas = {
                name: 'HTTP',
                token: this.user.token
            }
            this.$ajaxQsPost('http://bitcoin.xxw360.com/follow', parmas)
                .then((res)=>{                  
                  if( res && res.code == 200){
                    this.$message.success(res.msg);
                  }else{
                    this.$message.error(res.msg);
                  }
                })

        },

        // 定时刷新
        updata(){
            this.updata_flag = !this.updata_flag;
            
            if(this.updata_flag){
                this.timer2 = setInterval(()=>{
                    this.refresh = !this.refresh;
                },300000)
            }else{
                clearInterval(this.timer2)
            }
        },


        // 获取列表数据
        getList(parmas){

            if(parmas.timer == '1DAY'){
                parmas.timer = '';
            }
            this.list.name = this.listName;
            
            // 请求数据
            let datas = this.buildData(this.list.name,parmas.timer);
            
            console.log(datas)
            
            let staffPromsie = this.$ajaxPost('https://scanner.tradingview.com/crypto/scan', datas);

            if(staffPromsie){
                staffPromsie.then((res) =>{
                    
                    this.allList = this.formatData(res.data[0].d);
                    this.tableData1 = this.allList.list1;
                    this.tableData2 = this.allList.list2;
                    this.tableData3 = this.allList.list3;
                    
                    // if(!this.tableData || !this.tableData.length) return;
                    // this.allList = this.clone(this.tableData);
                    // this.tableData = this.tableData.splice(1,15);
                    // this.isReadyType = this.list.type;
                })
            }

        },



        // 格式化列表数据  将列表第一个转化为小写
        formatData(list){
            if(!list || !list.length) return;
            
            let list1 = [];
            let list2 = [];
            let list3 = [];

            let vals1 = [];
            let vals2 = [];
            let vals3 = [];
            let vals4 = [];
            let vals5 = [];

            let obj = {
                    label:'',
                    value: null
                }
            list.forEach((item,index) => {
                // 枢轴点

                if(index >= 49 && index <= 55){
                    console.log(index)
                    vals1.push(item);
                }
                if( index >= 56 && index <= 62){
                    vals2.push(item);
                }
                if( index >= 63 && index <= 69){
                    vals3.push(item);
                }
                if( index >= 70 && index <= 76){
                    vals4.push(item);
                }
                if( index >= 77 && index <= 79){
                    vals5.push(item);
                }
                
                switch(index){
                    // 震荡指标
                    case 3 : 
                    obj = {
                        label:'RSI',
                        value: item,
                        oper: dealData.computeRSISignal(item, list[index + 1])
                    };
                    list1.push(obj);
                    break;
                    case 5 : 
                    obj = {
                        label:'Stoch快线',
                        value: item,
                        oper: dealData.computeStochSignal(item, list[index + 1],list[index + 2],list[index + 3])
                    };
                    list1.push(obj);
                    break;
                    case 9 : 
                    obj = {
                        label:'商品路径',
                        value: item,
                        oper: dealData.computeCCI20Signal(item, list[index + 1])
                    };
                    list1.push(obj);
                    break;
                    case 11 : 
                    obj = {
                        label:'平均趋向',
                        value: item,
                        oper: dealData.computeADXSignal(item, list[index + 1],list[index + 2],list[index + 3],list[index + 4])
                    };
                    list1.push(obj);
                    break;
                    case 16 : 
                    obj = {
                        label:'动量震荡',
                        value: item,
                        oper: dealData.computeAOSignal(item, list[index + 1])
                    };
                    list1.push(obj);
                    break;
                    case 18 : 
                    obj = {
                        label:'动量指标',
                        value: item,
                        oper: dealData.computeMomSignal(item, list[index + 1])
                    };
                    list1.push(obj);
                    break;
                    case 20 : 
                    obj = {
                        label:'MACD',
                        value: item,
                        oper: dealData.computeMACDSignal(item, list[index + 1])
                    };
                    list1.push(obj);
                    break;
                    case 23 : 
                    obj = {
                        label:'stochastic',
                        value: item,
                        oper: dealData.computeSimpleSignal(list[index - 1])
                    };
                    list1.push(obj);
                    break;
                    case 25 : 
                    obj = {
                        label:'威廉指标',
                        value: item,
                        oper: dealData.computeSimpleSignal(list[index - 1])
                    };
                    list1.push(obj);
                    break;
                    case 27 : 
                    obj = {
                        label:'牛熊力量',
                        value: item,
                        oper: dealData.computeSimpleSignal(list[index - 1])
                    };
                    list1.push(obj);
                    break;
                    case 29 : 
                    obj = {
                        label:'终极震荡指标',
                        value: item,
                        oper: dealData.computeSimpleSignal(list[index - 1])
                    };
                    list1.push(obj);
                    break;

                    // 移动平均线
                    case 30 : 
                    obj = {
                        label:'EMA(10)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index + 1])
                    };
                    list2.push(obj);
                    break;
                    case 32 : 
                    obj = {
                        label:'MA(10)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 1])
                    };
                    list2.push(obj);
                    break;
                    case 33 : 
                    obj = {
                        label:'EMA(20)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 2])
                    };
                    list2.push(obj);
                    break;
                    case 34 : 
                    obj = {
                        label:'SMA(20)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 3])
                    };
                    list2.push(obj);
                    break;
                    case 35 : 
                    obj = {
                        label:'EMA(30)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 4])
                    };
                    list2.push(obj);
                    break;
                    case 36 : 
                    obj = {
                        label:'SMA(30)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 5])
                    };
                    list2.push(obj);
                    break;
                    case 37 : 
                    obj = {
                        label:'EMA(50)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 6])
                    };
                    list2.push(obj);
                    break;
                    case 38 : 
                    obj = {
                        label:'SMA(50)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 7])
                    };
                    list2.push(obj);
                    break;
                    case 39 : 
                    obj = {
                        label:'EMA(100)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 8])
                    };
                    list2.push(obj);
                    break;
                    case 40 : 
                    obj = {
                        label:'SMA(100)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 9])
                    };
                    list2.push(obj);
                    break;
                    case 41 : 
                    obj = {
                        label:'EMA(200)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 10])
                    };
                    list2.push(obj);
                    break;
                    case 42 : 
                    obj = {
                        label:'SMA(200)',
                        value: item,
                        oper: dealData.computeMASignal(item, list[index - 11])
                    };
                    list2.push(obj);
                    break;
                    case 44 : 
                    obj = {
                        label:'一目均衡',
                        value: item,
                        oper: dealData.computeSimpleSignal(item, list[index - 1])
                    };
                    list2.push(obj);
                    break;
                    case 46 : 
                    obj = {
                        label:'成交量',
                        value: item,
                        oper: dealData.computeSimpleSignal(list[index - 1])
                    };
                    list2.push(obj);
                    break;
                    case 48 : 
                    obj = {
                        label:'船体移动',
                        value: item,
                        oper: dealData.computeSimpleSignal(list[index - 1])
                    };
                    list2.push(obj);
                    break;


                }
                
                
            })
            
            let tit3 = ['S3','S2','S1','P','R1','R2','R3'];
            if(vals1.length && vals2.length && vals3.length && vals4.length && vals5.length){
                vals1.forEach((item,ind) => {       
                        list3.push({
                            title:tit3[ind],
                            val1: item,
                            val2: vals2[ind],
                            val3: vals3[ind],
                            val4: vals4[ind],
                            val5: vals5[ind],
                        })
                })
            }

            let allList = {
                list1: list1,
                list2: list2,
                list3: list3
            }
            
            
            let list1Data = this.dealList(list1);
            
            this.chartsData1 = {
                sell: list1Data[0],
                buy: list1Data[1],
                neutral: list1Data[2],
                pointer: dealData.computeRecommendSignal(list[0]),
            }

            let list2Data = this.dealList(list2);
            
            this.chartsData2 = {
                sell: list2Data[0],
                buy: list2Data[1],
                neutral: list2Data[2],
                pointer: dealData.computeRecommendSignal(list[2]),
            }

            let list3Data = this.dealList(list2);
            
            this.chartsData3 = {
                sell: Number(list1Data[0]) + Number(list2Data[0]),
                buy: Number(list1Data[1]) + Number(list2Data[1]),
                neutral: Number(list1Data[2]) + Number(list2Data[2]),
                pointer: dealData.computeRecommendSignal(list[1]),
            }

            
            return allList;
        },

        dealList(list){
            if(!list || !list.length) return;

            let sell = 0;
            let buy = 0;
            let neutral = 0;
            list.forEach(item => {
                if(item.oper == '卖出'){
                    sell++;
                }else if(item.oper == '买入'){
                    buy++;
                }else{
                    neutral++;
                }
            })
            return [sell,buy,neutral];
        },

        // 处理传入数据的方法 --时间
        buildData(name, type) {
            
            if(!type){
                var html = '{"symbols":{"tickers":["'+  name + '"],"query":{"types":[]}},"columns":["Recommend.Other'+ type +'","Recommend.All'+ type +'","Recommend.MA'+ type +'","RSI'+ type +'","RSI[1]'+ type +'","Stoch.K'+ type +'","Stoch.D'+ type +'","Stoch.K[1]'+ type +'","Stoch.D[1]'+ type +'","CCI20'+ type +'","CCI20[1]'+ type +'","ADX'+ type +'","ADX+DI'+ type +'","ADX-DI'+ type +'","ADX+DI[1]'+ type +'","ADX-DI[1]'+ type +'","AO'+ type +'","AO[1]'+ type +'","Mom'+ type +'","Mom[1]'+ type +'","MACD.macd'+ type +'","MACD.signal'+ type +'","Rec.Stoch.RSI'+ type +'","Stoch.RSI.K'+ type +'","Rec.WR'+ type +'","W.R'+ type +'","Rec.BBPower'+ type +'","BBPower'+ type +'","Rec.UO'+ type +'","UO'+ type +'","EMA10'+ type +'","close'+ type +'","SMA10'+ type +'","EMA20'+ type +'","SMA20'+ type +'","EMA30'+ type +'","SMA30'+ type +'","EMA50'+ type +'","SMA50'+ type +'","EMA100'+ type +'","SMA100'+ type +'","EMA200'+ type +'","SMA200'+ type +'","Rec.Ichimoku'+ type +'","Ichimoku.BLine'+ type +'","Rec.VWMA'+ type +'","VWMA'+ type +'","Rec.HullMA9'+ type +'","HullMA9'+ type +'","Pivot.M.Classic.S3'+ type +'","Pivot.M.Classic.S2'+ type +'","Pivot.M.Classic.S1'+ type +'","Pivot.M.Classic.Middle'+ type +'","Pivot.M.Classic.R1'+ type +'","Pivot.M.Classic.R2'+ type +'","Pivot.M.Classic.R3'+ type +'","Pivot.M.Fibonacci.S3'+ type +'","Pivot.M.Fibonacci.S2'+ type +'","Pivot.M.Fibonacci.S1'+ type +'","Pivot.M.Fibonacci.Middle'+ type +'","Pivot.M.Fibonacci.R1'+ type +'","Pivot.M.Fibonacci.R2'+ type +'","Pivot.M.Fibonacci.R3'+ type +'","Pivot.M.Camarilla.S3'+ type +'","Pivot.M.Camarilla.S2'+ type +'","Pivot.M.Camarilla.S1'+ type +'","Pivot.M.Camarilla.Middle'+ type +'","Pivot.M.Camarilla.R1'+ type +'","Pivot.M.Camarilla.R2'+ type +'","Pivot.M.Camarilla.R3'+ type +'","Pivot.M.Woodie.S3'+ type +'","Pivot.M.Woodie.S2'+ type +'","Pivot.M.Woodie.S1'+ type +'","Pivot.M.Woodie.Middle'+ type +'","Pivot.M.Woodie.R1'+ type +'","Pivot.M.Woodie.R2'+ type +'","Pivot.M.Woodie.R3'+ type +'","Pivot.M.Demark.S1'+ type +'","Pivot.M.Demark.Middle'+ type +'","Pivot.M.Demark.R1'+ type +'"]}';
            }else{
                var html = '{"symbols":{"tickers":["'+  name + '"],"query":{"types":[]}},"columns":["Recommend.Other|'+ type +'","Recommend.All|'+ type +'","Recommend.MA|'+ type +'","RSI|'+ type +'","RSI[1]|'+ type +'","Stoch.K|'+ type +'","Stoch.D|'+ type +'","Stoch.K[1]|'+ type +'","Stoch.D[1]|'+ type +'","CCI20|'+ type +'","CCI20[1]|'+ type +'","ADX|'+ type +'","ADX+DI|'+ type +'","ADX-DI|'+ type +'","ADX+DI[1]|'+ type +'","ADX-DI[1]|'+ type +'","AO|'+ type +'","AO[1]|'+ type +'","Mom|'+ type +'","Mom[1]|'+ type +'","MACD.macd|'+ type +'","MACD.signal|'+ type +'","Rec.Stoch.RSI|'+ type +'","Stoch.RSI.K|'+ type +'","Rec.WR|'+ type +'","W.R|'+ type +'","Rec.BBPower|'+ type +'","BBPower|'+ type +'","Rec.UO|'+ type +'","UO|'+ type +'","EMA10|'+ type +'","close|'+ type +'","SMA10|'+ type +'","EMA20|'+ type +'","SMA20|'+ type +'","EMA30|'+ type +'","SMA30|'+ type +'","EMA50|'+ type +'","SMA50|'+ type +'","EMA100|'+ type +'","SMA100|'+ type +'","EMA200|'+ type +'","SMA200|'+ type +'","Rec.Ichimoku|'+ type +'","Ichimoku.BLine|'+ type +'","Rec.VWMA|'+ type +'","VWMA|'+ type +'","Rec.HullMA9|'+ type +'","HullMA9|'+ type +'","Pivot.M.Classic.S3|'+ type +'","Pivot.M.Classic.S2|'+ type +'","Pivot.M.Classic.S1|'+ type +'","Pivot.M.Classic.Middle|'+ type +'","Pivot.M.Classic.R1|'+ type +'","Pivot.M.Classic.R2|'+ type +'","Pivot.M.Classic.R3|'+ type +'","Pivot.M.Fibonacci.S3|'+ type +'","Pivot.M.Fibonacci.S2|'+ type +'","Pivot.M.Fibonacci.S1|'+ type +'","Pivot.M.Fibonacci.Middle|'+ type +'","Pivot.M.Fibonacci.R1|'+ type +'","Pivot.M.Fibonacci.R2|'+ type +'","Pivot.M.Fibonacci.R3|'+ type +'","Pivot.M.Camarilla.S3|'+ type +'","Pivot.M.Camarilla.S2|'+ type +'","Pivot.M.Camarilla.S1|'+ type +'","Pivot.M.Camarilla.Middle|'+ type +'","Pivot.M.Camarilla.R1|'+ type +'","Pivot.M.Camarilla.R2|'+ type +'","Pivot.M.Camarilla.R3|'+ type +'","Pivot.M.Woodie.S3|'+ type +'","Pivot.M.Woodie.S2|'+ type +'","Pivot.M.Woodie.S1|'+ type +'","Pivot.M.Woodie.Middle|'+ type +'","Pivot.M.Woodie.R1|'+ type +'","Pivot.M.Woodie.R2|'+ type +'","Pivot.M.Woodie.R3|'+ type +'","Pivot.M.Demark.S1|'+ type +'","Pivot.M.Demark.Middle|'+ type +'","Pivot.M.Demark.R1|'+ type +'"]}';
            }

            return html;
        }
    },
    components:{
        BigCharts,
        LittleCharts
    }
  }
</script>
