webpackJsonp([10],{337:function(t,e,s){var a=s(235)(s(385),s(410),null,null,null);t.exports=a.exports},349:function(t,e,s){var a=s(235)(s(350),s(351),null,null,null);t.exports=a.exports},350:function(t,e,s){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=s(47),n=(a(i),s(236)),r=a(n);e.default={props:{value:{type:[String,Number]},options:{type:Array},searchBox:{type:Boolean,default:!1},all:{type:Boolean,default:!0},none:{type:Boolean,default:!1},placeholder:{type:String,default:"请选择"}},data:function(){return{currentVal:"",searchInput:"",optionsConfig:[],searchFunc:!1}},mounted:function(){},computed:{getOptionsConfig:function(){if(!this.searchFunc){if(this.optionsConfig=this.options,this.all){var t={value:"",label:"全部"};this.optionsConfig.unshift(t)}if(this.none){var e={value:"0",label:"无"};this.optionsConfig.unshift(e)}}},getCurrentVal:function(){if(!this.searchFunc)if(""==this.value)this.all&&(this.currentVal="全部");else if(0==this.value)this.none&&(this.currentVal="无");else{var t=r.default.find(this.optionsConfig,{value:parseInt(this.value)});t&&(this.currentVal=t.label)}}},watch:{searchInput:function(){var t=this;if(this.searchFunc=!0,this.searchInput){var e=[];this.options.forEach(function(s){r.default.includes(s.label,t.searchInput)&&e.push(s)}),this.optionsConfig=e}else this.optionsConfig=this.options}},methods:{showMenu:function(t){},choseLi:function(t){"liContent"==t.target.className&&(this.currentVal=t.target.innerText,this.$emit("input",t.target.dataset.value),$(".dropdownMenu").hide(),t.stopPropagation())}},components:{}}},351:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"selectVue"},[s("div",{staticClass:"displayNone"},[t._v(t._s(t.getOptionsConfig))]),t._v(" "),s("div",{staticClass:"displayNone"},[t._v(t._s(t.getCurrentVal))]),t._v(" "),t._m(0),t._v(" "),s("input",{attrs:{type:"text",readonly:"",placeholder:t.placeholder},domProps:{value:t.currentVal},on:{click:function(e){e.stopPropagation(),t.showMenu(e)}}}),t._v(" "),s("ul",{staticClass:"dropdownMenu",attrs:{id:(Math.random()+"").slice(2)},on:{click:t.choseLi}},[t.searchBox?s("li",{staticClass:"searchBox liContent"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.searchInput,expression:"searchInput"}],staticClass:"searchInput",domProps:{value:t.searchInput},on:{input:function(e){e.target.composing||(t.searchInput=e.target.value)}}})]):t._e(),t._v(" "),t._l(t.optionsConfig,function(e){return s("li",{staticClass:"liContent",attrs:{"data-value":e.value}},[t._v("\n      "+t._s(e.label)+"\n    ")])})],2)])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"caretSpan"},[s("i",{staticClass:"caretBottom"})])}]}},352:function(t,e,s){"use strict";e.__esModule=!0;var a=s(237),i=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=i.default||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a])}return t}},369:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(28),i=s(349),n=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default={props:["staffInfo"],data:function(){return{visible:!0,authorizeNumber:"",remainAuthorize:0,authorizeSuccess:!1,btn:{loading:!1},successTable:{surplus:0,used:0,versionName:"标准版"},version:{value:1,options:[{value:1,label:"标准版"},{value:2,label:"增值版"}]},rule:""}},mounted:function(){$(".modal-dialog").on("click",function(t){var e=$(t.target),s=e.closest(".selectVue");if(s.length){(e.hasClass("caretBottom")||e.hasClass("caretSpan"))&&s.find("input").first().focus();var a=s.find(".dropdownMenu")[0].id;return $(".dropdownMenu").hide(),$("#"+a).show(),!1}$(".dropdownMenu").hide(),t.stopPropagation()})},computed:{getRules:function(){var t=this,e={action_type:"allocate"==this.staffInfo.type?1:2,version_type:this.version.value,user_id:this.staffInfo.userId},s=this.$ajaxPost(a.urls.EMPOWER_GET_EMPOWERNUM,e);s&&s.then(function(e){e&&200==e.code&&(t.rule="required|max_value:-1",t.remainAuthorize=e.data.empower_num,0!=e.data.empower_num&&(t.rule="required|max_value:"+e.data.empower_num))})}},methods:{comfirm:function(){var t=this;this.$validator.validateAll().then(function(e){if(e)if(t.btn.loading=!0,"allocate"==t.staffInfo.type){var s={user_id:t.staffInfo.userId,version_type:t.version.value,allocate_num:t.authorizeNumber};t.$ajaxPost(a.urls.EMPLOYEE_EMPLOYE_ALLOCATE,s,t.btn).then(function(e){e&&200==e.code&&(t.successTable.surplus=e.data.surplus,t.used=e.data.used,t.versionName=1==e.data.version_type?"标准版":"增值版",t.authorizeSuccess=!0)})}else{var i={user_id:t.staffInfo.userId,version_type:t.version.value,recycle_num:t.authorizeNumber};t.$ajaxPost(a.urls.EMPLOYEE_EMPLOYE_RECYCLE,i,t.btn).then(function(e){e&&200==e.code&&(t.successTable.surplus=e.data.surplus,t.used=e.data.used,t.versionName=1==e.data.version_type?"标准版":"增值版",t.authorizeSuccess=!0)})}})},cancel:function(t,e){this.$emit("close",t,e)}},components:{SelevtVue:n.default}}},370:function(t,e,s){var a=s(235)(s(369),s(371),null,null,null);t.exports=a.exports},371:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("modal",{staticClass:"AuthorizeOrInitStaffDialog",attrs:{width:"400px",effect:"fade",backdrop:!1},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[s("div",{staticClass:"displayNone"},[t._v(t._s(t.getRules))]),t._v(" "),s("div",{staticClass:"header",slot:"modal-header"},[s("span",[t._v(t._s("allocate"==this.staffInfo.type?"分配授权":"回收授权"))]),t._v(" "),s("span",{staticClass:"pull-right cancelIcon agent-Pop-up_icon_close",on:{click:function(e){t.cancel("AuthorizeOrInitStaffDialog")}}})]),t._v(" "),s("div",{staticClass:"content",slot:"modal-body"},[t.authorizeSuccess?s("div",{staticClass:"part"},[s("div",{staticClass:"successInfo"},[s("i",{staticClass:"agent-common_icon_success"}),t._v(" "),s("span",[t._v(t._s("allocate"==this.staffInfo.type?"授权成功":"回收成功"))])])]):t._e(),t._v(" "),t.authorizeSuccess?s("div",{staticClass:"part"},[s("table",{staticClass:"table table-bordered table-hover text-center"},[s("tbody",[s("tr",[s("td",{staticClass:"width-118 text-right paddingR-12"},[t._v("员工")]),t._v(" "),s("td",{staticClass:"text-left paddingL-12"},[t._v(t._s(t.staffInfo.userName))])]),t._v(" "),s("tr",[s("td",{staticClass:"width-118 text-right paddingR-12"},[t._v(t._s(t.successTable.versionName)+"剩余")]),t._v(" "),s("td",{staticClass:"text-left paddingL-12"},[t._v(t._s(t.successTable.surplus))])]),t._v(" "),s("tr",[s("td",{staticClass:"width-118 text-right paddingR-12"},[t._v("已使用")]),t._v(" "),s("td",{staticClass:"text-left paddingL-12"},[t._v(t._s(t.successTable.used))])])])])]):t._e(),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.authorizeSuccess,expression:"!authorizeSuccess"}],staticClass:"part"},[s("div",{staticClass:"contentBody"},[s("div",[s("span",{staticClass:"labelTitle"},[t._v("员工：")]),t._v(" "),s("span",{staticClass:"staffName"},[t._v(t._s(t.staffInfo.userName))])]),t._v(" "),s("span",{staticClass:"labelTitle marginT-10"},[t._v("版本：")]),t._v(" "),s("SelevtVue",{attrs:{options:t.version.options,all:!1},model:{value:t.version.value,callback:function(e){t.version.value=e},expression:"version.value"}}),t._v(" "),s("form",{staticClass:"marginT-20"},[s("div",{staticClass:"vee-form-grop"},[s("span",{staticClass:"labelTitle"},[t._v(t._s("allocate"==this.staffInfo.type?"分配个数：":"回收个数："))]),t._v(" "),s("bs-input",{directives:[{name:"validate",rawName:"v-validate",value:t.rule,expression:"rule"}],staticClass:"inlineBlock width-150",class:{input:!0,"is-danger":t.errors.has("authorizeNumber")},attrs:{name:"authorizeNumber",placeholder:"请输入...",autocomplete:"off",type:"authorizeNumber"},model:{value:t.authorizeNumber,callback:function(e){t.authorizeNumber="string"==typeof e?e.trim():e},expression:"authorizeNumber"}}),t._v(" "),s("span",{staticClass:"tip"},[t._v(t._s("allocate"==this.staffInfo.type?"剩余":"可收")),s("b",{staticClass:"red"},[t._v(t._s(t.remainAuthorize))]),t._v("个授权数")]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.errors.has("authorizeNumber"),expression:"errors.has('authorizeNumber')"}],staticClass:"is-danger marginL-75 displayBlock"},[t._v(t._s(t.errors.first("authorizeNumber"))+"\n            ")])],1)])],1)])]),t._v(" "),s("div",{staticClass:"footer",slot:"modal-footer"},[t.authorizeSuccess?t._e():s("div",{staticClass:"groupBtn width-236"},[s("button",{staticClass:"btn marginR-14",attrs:{type:"button"},on:{click:function(e){t.cancel("AuthorizeOrInitStaffDialog")}}},[t._v("取消\n      ")]),t._v(" "),s("button",{staticClass:"btn comfirm",class:{loading:t.btn.loading},attrs:{type:"button",disabled:t.btn.loading},on:{click:t.comfirm}},[t._v("确认\n      ")])]),t._v(" "),t.authorizeSuccess?s("div",{staticClass:"groupBtn width-110 marginT-20"},[s("button",{staticClass:"btn comfirm",attrs:{type:"button"},on:{click:function(e){t.cancel("AuthorizeOrInitStaffDialog",!0)}}},[t._v("确认\n      ")])]):t._e()])])},staticRenderFns:[]}},385:function(t,e,s){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=s(352),n=a(i),r=s(28),o=s(47),l=a(o),u=s(370),c=a(u),d=s(48);e.default={data:function(){return{comUtil:l.default,userName:"",phone:"",staffInfo:"",standard:{empower_num_surplus:0,empower_num_used:0,sale_money:0},increment:{empower_num_surplus:0,empower_num_used:0,sale_money:0},refresh:"",activeLi:{authorizeUserStandard:!1,authorizeUserincrement:!1},dialogs:{AuthorizeOrInitStaffDialog:!1}}},mounted:function(){},computed:(0,n.default)({},(0,d.mapState)({countLocalState:function(t){this.refresh=t.authorizeUserFrame.refresh,this.activeLi[t.common.activeTab]=!0}}),{AllData:function(){var t={user_id:this.$route.query.userId};this.refresh;this.queryList(t)}}),methods:{initActiveLi:function(){for(var t in this.activeLi)this.activeLi[t]=!1},queryList:function(t){var e=this,s=this.$ajaxPost(r.urls.EMPLOYEE_EMPLOYEE_INFO,t);s&&s.then(function(t){t&&200==t.code&&(e.standard=t.data.version1,e.increment=t.data.version2,e.userName=t.data.username,e.phone=t.data.mobile)})},roRouter:function(t,e){if(!$(e.target).hasClass("active"))switch(this.initActiveLi(),t){case"authorizeUserStandard":this.$store.commit("common/setActiveTab","authorizeUserStandard"),this.$router.push({name:"authorizeUserStandard",query:{userId:this.$route.query.userId}});break;case"authorizeUserincrement":this.$store.commit("common/setActiveTab","authorizeUserincrement"),this.$router.push({name:"authorizeUserincrement",query:{userId:this.$route.query.userId}})}},close:function(t,e){this.dialogs[t]=!1,e&&this.$store.commit("authorizeUserFrame/setRefresh",!this.refresh)},distribute:function(t){this.staffInfo={userId:this.$route.query.userId,userName:this.userName,type:t},this.dialogs.AuthorizeOrInitStaffDialog=!0},formatTable:function(t){var e=this;return t.forEach(function(t){t.regionName=l.default.formatRegion(t.province_id,t.city_id,e.region.options),t.versionName=1==t.version_type?"标准版":"增值版",t.statusName=0==t.shop_status?"禁用":"正常",t.createTimeName=l.default.formatTime(t.create_time,"YYYY-MM-DD HH:mm")}),t}},components:{AuthorizeOrInitStaffDialog:c.default}}},410:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"authorizeUserFrame"},[s("div",{staticClass:"main"},[s("div",{staticClass:"displayNone"},[t._v(t._s(t.countLocalState))]),t._v(" "),s("div",{staticClass:"displayNone"},[t._v(t._s(t.AllData))]),t._v(" "),s("div",{staticClass:"tabs"},[t._m(0),t._v(" "),s("div",{staticClass:"btnGroup pull-right"},[s("button",{staticClass:"btn marginR-15",on:{click:function(e){t.distribute("allocate")}}},[t._v("分配")]),t._v(" "),s("button",{staticClass:"btn",on:{click:function(e){t.distribute("recycle")}}},[t._v("回收")])])]),t._v(" "),s("div",{staticClass:"extraUser"},[s("div",{staticClass:"info"},[s("span",{staticClass:"name"},[t._v("姓名："+t._s(t.userName))]),t._v(" "),s("span",[t._v("联系方式："+t._s(t.phone))])]),t._v(" "),s("div",{staticClass:"detail"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 paddingR-7"},[s("table",{staticClass:"table table-bordered table-hover text-center"},[t._m(1),t._v(" "),s("tbody",[s("tr",[s("td",{staticClass:"width-140 text-right"},[t._v("标准版剩余：")]),t._v(" "),s("td",{staticClass:"text-left paddingL-12"},[t._v(t._s(t.standard.empower_num_surplus))])]),t._v(" "),s("tr",[s("td",{staticClass:"width-140 text-right"},[t._v("已使用：")]),t._v(" "),s("td",{staticClass:"text-left paddingL-12"},[t._v(t._s(t.standard.empower_num_used))])]),t._v(" "),s("tr",[s("td",{staticClass:"width-140 text-right"},[t._v("销售金额：")]),t._v(" "),s("td",{staticClass:"text-left paddingL-12"},[t._v(t._s(t.standard.sale_money))])])])])]),t._v(" "),s("div",{staticClass:"col-md-6 paddingR-7"},[s("table",{staticClass:"table table-bordered table-hover text-center"},[t._m(2),t._v(" "),s("tbody",[s("tr",[s("td",{staticClass:"width-140 text-right"},[t._v("增值版剩余：")]),t._v(" "),s("td",{staticClass:"text-left paddingL-12"},[t._v(t._s(t.increment.empower_num_surplus))])]),t._v(" "),s("tr",[s("td",{staticClass:"width-140 text-right"},[t._v("已使用：")]),t._v(" "),s("td",{staticClass:"text-left paddingL-12"},[t._v(t._s(t.increment.empower_num_surplus))])]),t._v(" "),s("tr",[s("td",{staticClass:"width-140 text-right"},[t._v("销售金额：")]),t._v(" "),s("td",{staticClass:"text-left paddingL-12"},[t._v(t._s(t.increment.empower_num_surplus))])])])])])])])])]),t._v(" "),s("div",{staticClass:"main marginT-20"},[s("div",{staticClass:"tabsUl"},[s("ul",[s("li",{staticClass:"text-center pull-left",class:{active:t.activeLi.authorizeUserStandard},on:{click:function(e){t.roRouter("authorizeUserStandard",e)}}},[t._v("标准版授权记录\n        ")]),t._v(" "),s("li",{staticClass:"text-center pull-left",class:{active:t.activeLi.authorizeUserincrement},on:{click:function(e){t.roRouter("authorizeUserincrement",e)}}},[t._v("增值版授权记录\n        ")])])]),t._v(" "),s("router-view")],1),t._v(" "),t.dialogs.AuthorizeOrInitStaffDialog?s("AuthorizeOrInitStaffDialog",{attrs:{staffInfo:t.staffInfo},on:{close:t.close}}):t._e()],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("i",{staticClass:"iconTitle"}),t._v(" "),s("li",{staticClass:"pull-left"},[t._v("员工详情")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{attrs:{colspan:"2"}},[t._v("标准版")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{attrs:{colspan:"2"}},[t._v("标准版")])])])}]}}});