webpackJsonp([13],{184:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(238),r=a(o),u=n(230),i=a(u);t.default=[].concat((0,r.default)(i.default))},185:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(208),r=a(o),u=n(234),i=a(u),s=n(231),l=a(s),c=n(232),d=a(c),f=n(233),p=a(f);t.default=(0,r.default)(i.default,l.default,d.default,p.default)},186:function(e,t,n){"use strict";var a=n(9),o=function(e){return e&&e.__esModule?e:{default:e}}(a);(0,o.default)(document).on("click",function(e){var t=(0,o.default)(e.target),n=t.closest(".selectVue");if(n.length){(t.hasClass("caretBottom")||t.hasClass("caretSpan"))&&n.find("input").first().focus();var a=n.find(".dropdownMenu")[0].id;return(0,o.default)(".dropdownMenu").hide(),(0,o.default)("#"+a).show(),e.stopPropagation(),!1}(0,o.default)(".dropdownMenu").hide(),e.stopPropagation()}),(0,o.default)(document).on("click",function(e){var t=(0,o.default)(e.target),n=t.closest(".cascadeVue");if(n.length){(t.hasClass("caretBottom")||t.hasClass("caretSpan"))&&n.find("input").first().focus();var a=n.find(".ulDiv")[0].id;return(0,o.default)(".ulDiv").hide(),(0,o.default)("#"+a).show(),e.stopPropagation(),!1}(0,o.default)(".ulDiv").hide(),e.stopPropagation()}),(0,o.default)(document).on("click",function(e){if((0,o.default)(e.target).closest(".DropdownVue").length)return(0,o.default)(".dropdownMenuVue").show(),e.stopPropagation(),!1;(0,o.default)(".dropdownMenuVue").hide(),e.stopPropagation()})},187:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e){return 200==e.status?e.data:(window.app.$message.error(e.data.message),e.data)}var r=n(8),u=a(r),i=n(279),s=a(i),l=n(209),c=a(l),d=(n(20),n(206),function(e,t,n){var a=this,r=t||{};return c.default.post(e,r).then(function(e){return 403==e.data.code&&(a.$store.commit("login/setUserInfo",{}),a.$message.warning("登录超时！"),a.$router.push({name:"report"})),o(e)}).catch(function(e){a.$message.error("网络错误，请稍后重试")})}),f=function(e,t,n){var a=this,r=t?s.default.stringify(t):{};return c.default.post(e,r).then(function(e){return 403==e.data.code&&(a.$store.commit("login/setUserInfo",{}),a.$message.warning("登录超时！"),a.$router.push({name:"report"})),o(e)}).catch(function(e){a.$message.error("网络错误，请稍后重试")})},p=function(e,t,n){var a=this,r=t||{};return c.default.get(e,{params:r}).then(function(e){return 403==e.data.code&&(a.$store.commit("login/setUserInfo",{}),a.$message.warning("登录超时！"),a.$router.push({name:"report"})),o(e)}).catch(function(e){a.$message.error("网络错误，请稍后重试")})};c.default.defaults.baseURL="http://bitcoin.xxw360.com/",c.default.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8",c.default.defaults.timeout=25e3,u.default.prototype.$ajaxPost=d,u.default.prototype.$ajaxQsPost=f,u.default.prototype.$ajaxGet=p},188:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var o=n(8),r=a(o),u=n(296),i=a(u);["alert","accordion","affix","buttonGroup","carousel","checkbox","datepicker","dropdown","formGroup","formValidator","modal","navbar","panel","popover","progressbar","radio","slider","spinner","tab","tabGroup","tabs","toggleButton","tooltip","typeahead"].map(function(e){r.default.component(e,i.default[e])}),r.default.component("bsInput",i.default.input),r.default.component("bsOption",i.default.option),r.default.component("bsSelect",i.default.select),r.default.component("bsAside",i.default.Aside)},189:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var o=n(8),r=a(o),u=n(294),i=a(u),s=n(293),l=a(s),c=n(228);u.Validator.addLocale(l.default);var d={errorBagName:"errors",fieldsBagName:"fields",delay:500,locale:"zh_CN",dictionary:c.veeCustomMessage,strict:!0,classes:!0,classNames:{touched:"touched",untouched:"untouched",valid:"valid",invalid:"has-error",pristine:"pristine",dirty:"dirty"},events:"input|blur",inject:!0};r.default.use(i.default,d),c.veeCustomRules.forEach(function(e){u.Validator.extend(e.name,e.validator)})},202:function(e,t,n){var a=n(205)(null,n(295),null,null,null);e.exports=a.exports},206:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="http://bitcoin.xxw360.com/";a="/agent/agent/web/";t.baseUrl=a,t.urls={BASE_URL:a,LOGIN_LOGIN:"login/login",PUBLIC_CAPTCHA_IMG:"public/captcha-img",PUBLIC_CAPTCHA_SMS:"public/captcha-sms",LOGIN_RESET_PASSWD:"login/reset-passwd",SALE_SALE_SHOP_STATISTICS:"sale/sale-shop-statistics",SALE_SALE_RECORD:"sale/sale-record",SALE_EMPLOYEE_SALELIST:"sale/employee-salelist",SHOP_LIST:"shop/list",SHOP_DETAIL:"shop/detail",SHOP_SHOP_EMPOWER_LIST:"shop/shop-empower-list",SHOP_SALE_UPDATE:"shop/sale-update",SHOP_SHOP_EMPOWER:"shop/shop-empower",EMPLOYEE_EMPLOYEE_LIST:"empower/empower-list",EMPLOYEE_EMPLOYEE_COUNT:"empower/empower-count",AGENT_APPLY_CREATE:"agent-apply/create",EMPLOYEE_EMPLOYEE_INFO:"empower/empower-info",EMPLOYEE_EMPLOYEE_ASSIGNED:"empower/empower-assigned",EMPLOYEE_EMPLOYE_ALLOCATE:"empower/empower-allocate",EMPLOYEE_EMPLOYE_RECYCLE:"empower/empower-recycle",EMPLOYEE_LIST_EMPLOYEE:"employee/list-employee",EMPLOYEE_ADD_EMPLOYEE:"employee/add-employee",EMPLOYEE_EDIT_EMPLOYEE_INFO:"employee/edit-employee",EMPLOYEE_DEL_EMPLOYEE:"employee/del-employee",AGENT_APPLY_LIST:"agent-apply/list",COMMON_REGION_LIST:"common/region-list",EMPLOYEE_ALL_EMPLOYEE:"employee/all-employee",EMPLOYEE_UPDATE_PASSWORD:"employee/update-password",LOG_LIST:"log/list",EMPLOYEE_GET_EMPLOYEE_INFO:"employee/get-employee-info",EMPLOYEE_UPDATE_INFO:"employee/update-info",EMPOWER_GET_EMPOWERNUM:"empower/get-empowernum"},t.noTokenReq=["login/login","public/captcha-img","public/captcha-sms","login/reset-passwd"],t.noTokenUrls=["/","/login","/forgetPasswd"]},227:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var o=n(8),r=a(o),u=n(20),i=a(u),s=n(204),l=a(s),c=n(201),d=a(c),f=n(185),p=a(f),m=n(184),h=a(m),E=n(202),_=a(E),v=n(199),g=(a(v),n(0)),P=a(g),M=n(9),O=a(M),w=n(200),S=a(w),L=n(203),b=a(L),y=n(188),I=(a(y),n(189)),A=(a(I),n(187)),C=(a(A),n(186)),Y=(a(C),n(34)),N=a(Y);r.default.use(i.default),r.default.use(d.default),r.default.use(l.default),r.default.use(S.default),r.default.prototype.$message=b.default;var D=new i.default.Store({modules:p.default,plugins:[N.default.vuexReload]}),x=new l.default({linkActiveClass:"red",routes:h.default}),T=new r.default({el:"#app",store:D,router:x,components:{App:_.default},template:"<App/>"});window.$=O.default,window.Moment=P.default,window.app=T,x.beforeEach(function(e,t,n){n()})},228:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.veeCustomRules=t.veeCustomMessage=void 0;var a,o=n(237),r=function(e){return e&&e.__esModule?e:{default:e}}(o);t.veeCustomMessage={zh_CN:{custom:{account:{required:"该项为必填",account:"请输入4到16位的用户名"},user:{required:"该项为必填",phone:"请输入正确手机号码"},password:{required:"该项为必填"},validCodes:(a={required:"该项为必填",lengthFour:"验证码必须为4位",lengthSix:"手机验证码必须为6位"},(0,r.default)(a,"lengthSix","手机验证码必须为6位"),(0,r.default)(a,"digits",function(e,t){return"验证码必须为"+t[0]+"位"}),(0,r.default)(a,"numeric","该项必须为数字"),(0,r.default)(a,"isCorrect",function(e,t){return"验证码错误"}),a),validateCode:{required:"该项为必填",lengthFour:"验证码必须为4位",lengthSix:"手机验证码必须为6位",digits:function(e,t){return"验证码必须为"+t[0]+"位"},numeric:"该项必须为数字"},authorizeYear:{required:"该项为必填",max_value:"授权数量不足"},saleMoney:{required:"该项为必填",money:"请输入正确金额"},userName:{required:"该项为必填"},phone:{required:"该项为必填",phone:"请输入正确手机号码"},applyNumber:{required:"该项为必填",numeric:"请填入正确数量"},authorizeNumber:{required:"该项为必填",max_value:"授权数量不足"},agoPassWord:{required:"该项为必填"},newPassWord:{required:"该项为必填"},comfirmPassWord:{required:"该项为必填",confirmed:function(e,t){return"新旧密码不一致"}}}}},t.veeCustomRules=[{name:"account",description:"账号验证",validator:{messages:{cn:function(e,t){return"请输入4到16位的用户名"}},validate:function(e,t){return e.length>=4&&e.length<=16}}},{name:"phone",description:"手机验证",validator:{messages:{cn:function(e,t){return"请输入正确手机号码"}},validate:function(e,t){return/^(13\d|14[57]|15[^4,\D]|17[03678]|18\d)\d{8}$/.test(e)}}},{name:"lengthFour",description:"验证码必须为4位",validator:{messages:{cn:function(e,t){return"验证码必须为4位"}},validate:function(e,t){return 4==e.length}}},{name:"lengthSix",description:"验证码必须为6位",validator:{messages:{cn:function(e,t){return"验证码必须为6位"}},validate:function(e,t){return 6==e.length}}},{name:"isCorrect",description:"验证码错误",validator:{messages:{cn:function(e,t){return"验证码错误"}},validate:function(e,t){return e==t[0]}}},{name:"confirmed",description:"新旧密码不一致",validator:{messages:{cn:function(e,t){return"新旧密码不一致"}},validate:function(e,t){return e==t[0]}}},{name:"money",description:"验证金钱",validator:{messages:{cn:function(e,t){return"验请输入正确金额"}},validate:function(e,t){return/^([1-9][0-9]{0,11}|0)(\.[0-9]{1,2})?$/.test(e)}}}]},230:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){return n.e(2).then(function(){return e(n(301))}.bind(null,n)).catch(n.oe)},o=function(e){return n.e(11).then(function(){return e(n(300))}.bind(null,n)).catch(n.oe)},r=function(e){return n.e(10).then(function(){return e(n(302))}.bind(null,n)).catch(n.oe)},u=function(e){return n.e(0).then(function(){return e(n(310))}.bind(null,n)).catch(n.oe)},i=function(e){return n.e(3).then(function(){return e(n(303))}.bind(null,n)).catch(n.oe)},s=function(e){return n.e(9).then(function(){return e(n(304))}.bind(null,n)).catch(n.oe)},l=function(e){return n.e(6).then(function(){return e(n(307))}.bind(null,n)).catch(n.oe)},c=function(e){return n.e(5).then(function(){return e(n(308))}.bind(null,n)).catch(n.oe)},d=function(e){return n.e(7).then(function(){return e(n(306))}.bind(null,n)).catch(n.oe)},f=function(e){return n.e(4).then(function(){return e(n(309))}.bind(null,n)).catch(n.oe)},p=function(e){return n.e(8).then(function(){return e(n(305))}.bind(null,n)).catch(n.oe)},m=function(e){return n.e(1).then(function(){return e(n(299))}.bind(null,n)).catch(n.oe)};t.default=[{path:"/",name:"index",component:a,children:[{path:"/",name:"report",component:r},{path:"/login",name:"report",component:r},{path:"/technicals",name:"technicals",component:u},{path:"/personal",name:"personal",component:i,children:[{path:"basic",name:"basic",component:s},{path:"member",name:"member",component:l},{path:"modifyPassword",name:"modifyPassword",component:c},{path:"invitation",name:"invitation",component:d},{path:"number",name:"number",component:f},{path:"follow",name:"follow",component:p}]},{path:"/demo",name:"demo",component:m}]},{path:"/forgetPasswd",name:"forgetPasswd",component:o}]},231:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={refresh:!1},o={},r={setRefresh:function(e,t){e.refresh=t}};t.default={authorizeFrame:{namespaced:!0,state:a,getters:o,mutations:r}}},232:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={refresh:!1},o={},r={setRefresh:function(e,t){e.refresh=t}};t.default={authorizeUserFrame:{namespaced:!0,state:a,getters:o,mutations:r}}},233:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={activeLi:"staffSaleStatist",activeTab:"staffSaleStatist",regionOptions:[],listStatus:1,right:"USD$",keywords:"",listName:"",chartsData1:{},chartsData2:{},chartsData3:{},isNavShow:!1},o={},r={setlistStatus:function(e,t){e.listStatus=t},setRight:function(e,t){e.right=t},setKeywords:function(e,t){e.keywords=t},setListName:function(e,t){e.listName=t},setChartsData1:function(e,t){e.chartsData1=t},setChartsData2:function(e,t){e.chartsData2=t},setChartsData3:function(e,t){e.chartsData3=t},setIsNavShow:function(e,t){e.isNavShow=sessionStorage.getItem("isNavShow")}};t.default={common:{namespaced:!0,state:a,getters:o,mutations:r}}},234:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={userInfo:{},isVip:!1},o={},r={setUserInfo:function(e,t){e.userInfo=t},setIsVip:function(e,t){e.isVip=t}};t.default={login:{namespaced:!0,state:a,getters:o,mutations:r}}},295:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("router-view")},staticRenderFns:[]}},297:function(e,t){},298:function(e,t){},34:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(207),r=a(o),u=n(277),i=a(u);t.default={clone:function(e){return JSON.parse((0,r.default)(e))},formatUnit:function(e){var t=void 0;return e>=1e3&&e<1e6?t=parseFloat((e/1e3).toFixed(3))+"k":e>=1e6&&e<1e9?t=parseFloat((e/1e6).toFixed(3))+"M":e>=1e9&&(t=parseFloat((e/1e9).toFixed(3))+"B"),t},formatTime:function(e,t){var n=t||"YYYY-MM-DD HH:mm:ss";return Moment(1e3*e).format(n)},formatMoney:function(e){return 0==e.toFixed(2)?0:parseFloat(e.toFixed(2))},formatRegion:function(e,t,n){if(n.length){var a="",o="",r="",u="";return a=i.default.find(n,{province_id:parseInt(e)}),a?(o=a.province_name,(r=i.default.find(a.child,{city_id:parseInt(t)}))?(u=r.city_name,o+"-"+u):""):""}},formatEmployee:function(e){var t=[];return e.forEach(function(e){t.push({value:parseInt(e.user_id),label:e.username})}),t},randomValidateCode:function(){for(var e="qwertyuiopasdfghjklzxcvbnm0123456789".split(""),t=[],n=0;n<4;n++)t.push(e[parseInt(36*Math.random())]);return t.join("")},vuexReload:function(e){var t=sessionStorage.getItem("vuexData");if(t&&!function(e){for(var t in e)return!1;return!0}(JSON.parse(t))){var n=JSON.parse(t);for(var a in n)e.state[a]=n[a].state[a]}e.subscribe(function(e,t){var n=sessionStorage.getItem("vuexData"),a={};n&&(a=JSON.parse(n));var o=e.type.split("/"),u=o[0],i=e.payload,s=e.type;a[u]={payload:i,mutationWay:s,state:t},sessionStorage.setItem("vuexData",(0,r.default)(a))})},test_phone:function(e){return/^(13\d|14[57]|15[^4,\D]|17[03678]|18\d)\d{8}$/.test(e)},test_password:function(e){return/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(e.toString())},RndNum:function(e){for(var t="",n=0;n<e;n++)t+=Math.floor(10*Math.random());return t}}}},[227]);