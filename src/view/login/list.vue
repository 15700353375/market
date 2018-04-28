<!--
 * @Author:      changh
 * @DateTime:    2018年4月26日13:49:25
 * @Description: 
 -->

<template>
        
      <div>
          <TopbarList></TopbarList>
          <div class="result mainBox">
          
          <div class="displayNone">{{countLocalState}}</div>
          <div class="displayNone">{{AllData}}</div>
          <div class="main">
            <table class="table table-bordered table-hover text-center mg-b0"
                 :class="{'marginB-20': !tableData || !tableData.length }">
            <thead>
              <tr>
                <th class='cur-p' v-for="(head,index) in currentHead" @click="paixu(index)" :style="[{'min-width': index == 0 ? '150px' : 'auto'}]">
                    {{head}}
                    <div class="paixu" v-show="paixuShow == index">
                        <img src="/agentStatic/img/paixu.svg" alt="" class="paixuIcon" v-if="sheng">
                        <img src="/agentStatic/img/sort-up.svg" alt="" class="paixuIcon" v-else>
                    </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="tableData && tableData.length">
                <tr v-for="itemParent in tableData">
                  <td class="text-left color_blue cur-p" >
                      <img :src="'/agentStatic/images/'+itemParent.d[0]+'.svg'" alt="">
                      <span @click='goDetail'>{{itemParent.d[1]}}</span>
                  </td>
                  <td class="text-right">{{itemParent.d[2]}}</td>
                  <td class="text-right">{{itemParent.d[3]}}</td>
                  <td class="text-right">{{itemParent.d[4]}}</td>
                  <td class="text-right">{{itemParent.d[5]}}</td>
                  <td class="text-right">{{itemParent.d[6]}}</td>
                  <td class="text-right">{{itemParent.d[7]}}</td>
                  <td class="text-right" >
                      <span v-if="isReadyType == 1" :class="[ itemParent.d[8] >= 0 ? 'color_green':'color_red']">{{itemParent.d[8]}}</span>
                      <span v-else>{{itemParent.d[8]}}</span>
                      <span v-if="isReadyType == 1">%</span></td>
                  <td v-if="isReadyType == 2 || isReadyType == 3" class="text-right">{{itemParent.d[9]}}</td>
                  <td v-if="isReadyType == 3" class="text-right">{{itemParent.d[10]}}</td>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="13">暂无数据</td>
              </tr>
            </tbody>
          </table>
          <div class="more" @click="more" > 了解更多</div>
          </div>

          <!-- <div v-if="tableData.length"
               class="paginationDiv">
            <span class="paginationTitle">
              共<b class="textColor">{{pagination.centent.total}}</b>条数据
            </span>
    
          </div> -->
      
      </div>
      </div>

</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import { mapState } from 'vuex';

    import TopbarList from '@Components/TopbarList';
  export default {
    data(){
      return {
        // table的列标题
        fenleis:[
                ['名称','总市值','完全稀释市值','收盘价','可用币量','总币量','交易量','涨跌%'],
                ['名称','涨跌%','本周表现','本月表现','3个月表现','6个月表现','年初至今表现','本年表现','波动率'],
                ['名称','振荡指标评级','ADX','AO','ATR','CCI()','MACD水平','MACD信号','MOM','RSI()'],
                ['名称','移动平均评级','收盘价','SMA()','SMA','SMA()','BB UP','BB LOW']
        ],
        // 当前table的列标题
        currentHead:[],

        // 列标题对应的排序名  用于传给后端排序字段
        columns: [
            ["crypto_code","sector","market_cap_calc","market_cap_diluted_calc","close","total_shares_outstanding","total_shares_diluted","total_value_traded","change","pricescale","minmov","fractional","minmove2"],
            ["crypto_code","sector","change","Perf.W","Perf.1M","Perf.3M","Perf.6M","Perf.YTD","Perf.Y","Volatility.D"],
            ["crypto_code","sector","Recommend.Other","ADX","AO","ATR","CCI20","MACD.macd","MACD.signal","Mom","RSI","Stoch.K","Stoch.D","ADX","ADX+DI","ADX-DI","ADX+DI[1]","ADX-DI[1]","AO","AO[1]","CCI20","CCI20[1]","MACD.macd","MACD.signal","Mom","Mom[1]","RSI","RSI[1]","Stoch.K","Stoch.D","Stoch.K[1]","Stoch.D[1]"],
            ["crypto_code","sector","Recommend.MA","close","SMA20","SMA50","SMA200","BB.upper","BB.lower","pricescale","minmov","fractional","minmove2","SMA20","close","SMA50","SMA200","BB.upper","BB.lower"]
        ],
        

        // 表格数据
        tableData: [],

        // 完整数据
        allList: [],

        // 部分数据
        littleList:[],

        // 是否显示更多
        moreShow: true,

        // 筛选信息  -- 默认
        list: {
            type: 1,
            sortBy: 'market_cap_calc',
            sortOrder: 'desc',
            right: 'USD$',
            keyword: ''
        },

        // 排序按钮相关
        sheng: true,
        paixuShow: '1',

        // 是否切换完成
        isReadyType: 1,
        
        //该变量的作用，弹窗做了某些操作，作为计算属性重新触发请求，更新数据
        refresh: false,
        user: {},

      }
    },
    mounted(){
        // 默认当前头部为第一个
        this.currentHead = this.fenleis[0];
    },
    computed:{
        // 状态管理
        ...mapState({
            countLocalState(state){
                this.list.type = Number(state.common.listStatus);
                this.list.right = state.common.right;
                this.list.keyword = state.common.keywords;
                // console.log(this.list.type)

                this.user = state.login.userInfo;
            }
        }),

         //计算属性，任意数据改变，更改表格数据tableData
        AllData(){
            let param = {
                type: this.list.type,
                sortBy: this.list.sortBy,
                sortOrder: this.list.sortOrder,
                right: this.list.right,
                keyword: this.list.keyword
            };

            this.getList(param);
        }
    },
    methods: {

        //克隆方法
        clone(obj){
            return  JSON.parse(JSON.stringify(obj));
        },

        //排序按钮
        paixu(index){
            this.paixuShow = index
            this.sheng = !this.sheng
            if(this.sheng == true){
                this.list.sortOrder = 'desc'
            }else if(this.sheng == false){
                this.list.sortOrder = 'asc'
            }

            this.list.sortBy = this.columns[this.list.type-1][index+1];
        },

        // 获取列表数据
        getList(list){
            if(!list) return;

            // this.isReady = false;
            
            // 请求数据
            let datas = this.buildData(list.type,list.sortBy,list.sortOrder,list.right,list.keyword);
            
            let staffPromsie = this.$ajaxPost('https://scanner.tradingview.com/crypto/scan', datas);

            if(staffPromsie){
                staffPromsie.then((res) =>{
                    
                    this.tableData = this.formatData(res.data);
                    if(!this.tableData || !this.tableData.length) return;
                    this.allList = this.clone(this.tableData);
                    this.tableData = this.tableData.splice(1,15);
                    this.currentHead = this.fenleis[list.type - 1];
                    this.isReadyType = this.list.type;
                })
            }

        },


        // 查看更多
        more(){
            this.moreShow = !this.moreShow
            let littleList = this.clone(this.tableData);

            if(this.moreShow){
                this.tableData = littleList.splice(1,15);
            }else{
                this.tableData = this.allList;
            }
        },

        // 格式化列表数据  将列表第一个转化为小写
        formatData(list){
            if(!list || !list.length) return;

            list.forEach(item => {
                item.d[0] = item.d[0].toLowerCase();
            })

            return list;
        },


        // 页面跳转
        goDetail(){
            this.$router.push({name:'technicals'});
        },

        // 处理传入数据的方法
        // 1.概览 2.表现 3.震荡指标 4.跟随趋势
        buildData(type,sortBy,sortOrder,right,keyword){
            //字段
            var columns = '';
            if(type == 1){
                columns = '"crypto_code","sector","market_cap_calc","market_cap_diluted_calc","close","total_shares_outstanding","total_shares_diluted","total_value_traded","change","pricescale","minmov","fractional","minmove2"';
            }else if(type == 2){
                columns = '"crypto_code","sector","change","Perf.W","Perf.1M","Perf.3M","Perf.6M","Perf.YTD","Perf.Y","Volatility.D"';
            }else if(type == 3){
                columns = '"crypto_code","sector","Recommend.Other","ADX","AO","ATR","CCI20","MACD.macd","MACD.signal","Mom","RSI","Stoch.K","Stoch.D","ADX","ADX+DI","ADX-DI","ADX+DI[1]","ADX-DI[1]","AO","AO[1]","CCI20","CCI20[1]","MACD.macd","MACD.signal","Mom","Mom[1]","RSI","RSI[1]","Stoch.K","Stoch.D","Stoch.K[1]","Stoch.D[1]"';
            //	columns = '"crypto_code","sector","Recommend.Other","ADX","AO","ATR","CCI20","MACD.macd","MACD.signal","Mom","RSI","Stoch.K","Stoch.D","ADX","ADX-DI","ADX-DI[1]","AO","AO[1]","CCI20","CCI20[1]","MACD.macd","MACD.signal","Mom","Mom[1]","RSI","RSI[1]","Stoch.K","Stoch.D","Stoch.K[1]","Stoch.D[1]"';
            }else if(type == 4){
                columns = '"crypto_code","sector","Recommend.MA","close","SMA20","SMA50","SMA200","BB.upper","BB.lower","pricescale","minmov","fractional","minmove2","SMA20","close","SMA50","SMA200","BB.upper","BB.lower"';
            }

            //搜索
            if(keyword){
                keyword = '{"left":"sector","operation":"match","right":"'+ keyword +'"},';
            }

            //条件
            var filter = '';
            // 名称排序 名称，总值，类型
            if(sortBy == 'sector'){
                filter = '{"left":"sector","operation":"nempty"},{"left":"market_cap_calc","operation":"nempty"},'+ keyword +'{"left":"name","operation":"match","right":"'+ right +'"}';

                //市场总值排序 市场总值，名称，类型
            }else if(sortBy == 'market_cap_calc'){
                filter = '{"left":"market_cap_calc","operation":"nempty"},{"left":"sector","operation":"nempty"},'+ keyword +'{"left":"name","operation":"match","right":"'+ right +'"}';

                //其他字段排序 排序字段，名称，总值，类型
            }else{
                filter = '{"left":"'+ sortBy +'","operation":"nempty"},{"left":"sector","operation":"nempty"},{"left":"market_cap_calc","operation":"nempty"},'+ keyword +'{"left":"name","operation":"match","right":"'+ right +'"}';
            }


            var data = '{"filter":['+ filter +'],"symbols":{"query":{"types":[]}},"columns":['+ columns +'],"sort":{"sortBy":"'+ sortBy +'","sortOrder":"'+ sortOrder +'"},"options":{"lang":"zh"},"range":[0,150]}';

            // getData(data);
            return data;
        }
    },
    components:{
        TopbarList
    }
  }
</script>
