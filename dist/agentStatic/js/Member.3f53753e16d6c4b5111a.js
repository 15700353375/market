webpackJsonp([6],{307:function(e,t,a){function s(e){a(585)}var r=a(205)(a(549),a(573),s,"data-v-36b8d9cb",null);e.exports=r.exports},322:function(e,t){function a(e,t){var a=e[1]||"",r=e[3];if(!r)return a;if(t&&"function"==typeof btoa){var i=s(r);return[a].concat(r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"})).concat([i]).join("\n")}return[a].join("\n")}function s(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var s=a(t,e);return t[2]?"@media "+t[2]+"{"+s+"}":s}).join("")},t.i=function(e,a){"string"==typeof e&&(e=[[null,e,""]]);for(var s={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(s[i]=!0)}for(r=0;r<e.length;r++){var o=e[r];"number"==typeof o[0]&&s[o[0]]||(a&&!o[2]?o[2]=a:a&&(o[2]="("+o[2]+") and ("+a+")"),t.push(o))}},t}},324:function(e,t,a){function s(e){for(var t=0;t<e.length;t++){var a=e[t],s=l[a.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](a.parts[r]);for(;r<a.parts.length;r++)s.parts.push(i(a.parts[r]));s.parts.length>a.parts.length&&(s.parts.length=a.parts.length)}else{for(var o=[],r=0;r<a.parts.length;r++)o.push(i(a.parts[r]));l[a.id]={id:a.id,refs:1,parts:o}}}}function r(){var e=document.createElement("style");return e.type="text/css",u.appendChild(e),e}function i(e){var t,a,s=document.querySelector("style["+g+'~="'+e.id+'"]');if(s){if(f)return m;s.parentNode.removeChild(s)}if(b){var i=v++;s=p||(p=r()),t=o.bind(null,s,i,!1),a=o.bind(null,s,i,!0)}else s=r(),t=n.bind(null,s),a=function(){s.parentNode.removeChild(s)};return t(e),function(s){if(s){if(s.css===e.css&&s.media===e.media&&s.sourceMap===e.sourceMap)return;t(e=s)}else a()}}function o(e,t,a,s){var r=a?"":s.css;if(e.styleSheet)e.styleSheet.cssText=x(t,r);else{var i=document.createTextNode(r),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(i,o[t]):e.appendChild(i)}}function n(e,t){var a=t.css,s=t.media,r=t.sourceMap;if(s&&e.setAttribute("media",s),h.ssrId&&e.setAttribute(g,t.id),r&&(a+="\n/*# sourceURL="+r.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}var d="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!d)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=a(326),l={},u=d&&(document.head||document.getElementsByTagName("head")[0]),p=null,v=0,f=!1,m=function(){},h=null,g="data-vue-ssr-id",b="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,a,r){f=a,h=r||{};var i=c(e,t);return s(i),function(t){for(var a=[],r=0;r<i.length;r++){var o=i[r],n=l[o.id];n.refs--,a.push(n)}t?(i=c(e,t),s(i)):i=[];for(var r=0;r<a.length;r++){var n=a[r];if(0===n.refs){for(var d=0;d<n.parts.length;d++)n.parts[d]();delete l[n.id]}}}};var x=function(){var e=[];return function(t,a){return e[t]=a,e.filter(Boolean).join("\n")}}()},326:function(e,t){e.exports=function(e,t){for(var a=[],s={},r=0;r<t.length;r++){var i=t[r],o=i[0],n=i[1],d=i[2],c=i[3],l={id:e+":"+r,css:n,media:d,sourceMap:c};s[o]?s[o].parts.push(l):a.push(s[o]={id:o,parts:[l]})}return a}},327:function(e,t,a){var s=a(205)(a(328),a(333),null,null,null);e.exports=s.exports},328:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(20),i=a(34),o=(s(i),a(332)),n=s(o);t.default={props:["navData"],data:function(){return{dengluyemianShow:!1,account:"",password:"",loginError:!1,btn:{loading:!1},validateCode:"",validateImgUrl:"",validateIndex:"",isCheckCode:!1,errorTip:"",rememberPassword:!1,formShows:!1}},mounted:function(){var e=this;this.$on("gologin",function(t){e.dengluyemian(t)})},computed:(0,r.mapState)({}),methods:{toForgetPasswd:function(){this.$router.push({name:"forgetPasswd"})},validateBeforeSubmit:function(){var e=this;this.$validator.validateAll().then(function(t){if(t){var a={username:e.account,password:e.password};e.$ajaxQsPost("http://bitcoin.xxw360.com/login",a).then(function(t){t&&200==t.code?(e.$message.success(t.msg),e.$store.commit("login/setUserInfo",t.data),e.isVip(t.data.token)):e.$message.error(t.msg)})}})},isVip:function(e){var t=this,a={token:e};this.$ajaxQsPost("http://bitcoin.xxw360.com/isVip",a).then(function(e){e&&200==e.code?(t.$store.commit("login/setIsVip",e.msg),t.close()):t.$message.error(e.msg)})},dengluyemian:function(e){this.formShows=1==e,this.dengluyemianShow=!0},close:function(){this.dengluyemianShow=!1},change:function(e){this.formShows=e}},components:{Register:n.default}}},329:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=(a(20),a(34)),r=function(e){return e&&e.__esModule?e:{default:e}}(s);t.default={props:["navData"],data:function(){return{account:"",codes:"",validCodes:"",user:"",password:"",validateCode:"",inviteCode:"",validateDisabled:!1,reciprocalNum:59,validateText:"获取验证码",errorTip:"",btn:{loading:!1},confirmError:!1}},mounted:function(){this.codes=r.default.RndNum(4)},methods:{changeCode:function(){this.codes=r.default.RndNum(4)},Reciprocal:function(){var e=this;this.$validator.validate("user",this.user).then(function(t){if(t){e.validateDisabled=!0;var a=setInterval(function(){e.reciprocalNum>0?(e.validateText="("+e.reciprocalNum+"s)",e.reciprocalNum--):(e.reciprocalNum=59,clearInterval(a),e.validateDisabled=!1,e.validateText="重新获取")},1e3),s={mobile:e.user};e.$ajaxQsPost("http://bitcoin.xxw360.com/sms",s).then(function(t){t&&200==t.code?e.$message.success(t.msg):(e.$message.error(t.msg),e.reciprocalNum=59,clearInterval(a),e.validateDisabled=!1,e.validateText="重新获取")})}})},validateBeforeSubmit:function(){var e=this;this.$validator.validateAll().then(function(t){if(t){e.btn.loading=!0;var a={username:e.account,mobile:e.user,password:e.password,code:e.validateCode,invite_code:e.inviteCode};e.$ajaxQsPost("http://bitcoin.xxw360.com/register",a).then(function(t){t&&200==t.code?200==t.code?(e.$message.success("注册成功，请登录！"),e.$emit("closeModel",!0)):e.$message.error(t.msg):(e.$message.error(t.msg),e.errorTip=t.message,e.confirmError=!0)})}})}},components:{}}},332:function(e,t,a){var s=a(205)(a(329),a(334),null,null,null);e.exports=s.exports},333:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.dengluyemianShow,expression:"dengluyemianShow"}],staticClass:"login_modal"},[a("img",{staticClass:"close",attrs:{src:"/agentStatic/img/close.png",alt:""},on:{click:e.close}}),e._v(" "),a("div",{staticClass:"loginNav"},[a("span",{class:[1==e.formShows?"active":""],attrs:{"data-hi":1},on:{click:function(t){e.change(!0)}}},[e._v("登录")]),e._v(" "),a("span",{class:[0==e.formShows?"active":""],attrs:{"data-hi":2},on:{click:function(t){e.change(!1)}}},[e._v("注册")])]),e._v(" "),a("div",{staticClass:"formBox"},[e.formShows?a("form",{attrs:{autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.validateBeforeSubmit(t)}}},[a("div",{staticClass:"vee-form-grop"},[a("div",{staticClass:"input-group"},[a("span",{staticClass:"input-group-addon glyphicon glyphicon-user",attrs:{id:"basic-addon1"}}),e._v(" "),a("bs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|account",expression:"'required|account'"}],class:{input:!0,"is-danger":e.errors.has("account")},attrs:{name:"account",autocomplete:"off",placeholder:"请输入账号",type:"text"},model:{value:e.account,callback:function(t){e.account="string"==typeof t?t.trim():t},expression:"account"}})],1),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("account"),expression:"errors.has('account')"}],staticClass:"is-danger"},[e._v(e._s(e.errors.first("account"))+"\n            ")])]),e._v(" "),a("div",{staticClass:"vee-form-grop"},[a("div",{staticClass:"input-group"},[a("span",{staticClass:"input-group-addon glyphicon glyphicon-lock",attrs:{id:"basic-addon1"}}),e._v(" "),a("bs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{input:!0,"is-danger":e.errors.has("password")},attrs:{name:"password",autocomplete:"new-password",placeholder:"请输入密码",type:"password"},model:{value:e.password,callback:function(t){e.password="string"==typeof t?t.trim():t},expression:"password"}})],1),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("password"),expression:"errors.has('password')"}],staticClass:"is-danger"},[e._v(e._s(e.errors.first("password"))+"\n            ")])]),e._v(" "),e.isCheckCode?a("div",{staticClass:"vee-form-grop"},[a("bs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|lengthFour",expression:"'required|lengthFour'"}],staticClass:"validateInput",class:{input:!0,"is-danger":e.errors.has("validateCode")},attrs:{name:"validateCode",autocomplete:"off",placeholder:"请输入验证码",type:"text"},model:{value:e.validateCode,callback:function(t){e.validateCode="string"==typeof t?t.trim():t},expression:"validateCode"}}),a("img",{staticClass:"validateImg",attrs:{src:e.validateImgUrl},on:{click:e.getValidateImg}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("validateCode"),expression:"errors.has('validateCode')"}],staticClass:"is-danger"},[e._v(e._s(e.errors.first("validateCode"))+"\n            ")])],1):e._e(),e._v(" "),a("div",{staticClass:"clearfix remember_box"},[a("div",{staticClass:"remember"},[a("checkbox",{staticClass:"inlineBlock pull-left marginT-0",model:{value:e.rememberPassword,callback:function(t){e.rememberPassword=t},expression:"rememberPassword"}},[a("span",{staticClass:"rememberPassword"},[e._v("记住密码")])])],1)]),e._v(" "),a("div",{staticClass:"vee-form-grop text-right"},[a("button",{staticClass:"btn btn-default submit",class:{loading:e.btn.loading},attrs:{disabled:e.btn.loading,type:"submit"}},[e._v("登录\n            ")])])]):e._e(),e._v(" "),e.formShows?e._e():a("Register",{on:{closeModel:e.close}})],1)])])},staticRenderFns:[]}},334:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"formBox"},[a("form",{attrs:{autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.validateBeforeSubmit(t)}}},[a("div",{staticClass:"vee-form-grop"},[a("div",{staticClass:"input-group"},[a("span",{staticClass:"input-group-addon glyphicon glyphicon-user",attrs:{id:"basic-addon1"}}),e._v(" "),a("bs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|account",expression:"'required|account'"}],class:{input:!0,"is-danger":e.errors.has("account")},attrs:{name:"account",autocomplete:"off",placeholder:"请输入账号",type:"text"},model:{value:e.account,callback:function(t){e.account="string"==typeof t?t.trim():t},expression:"account"}})],1),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("account"),expression:"errors.has('account')"}],staticClass:"is-danger"},[e._v(e._s(e.errors.first("account"))+"\n      ")])]),e._v(" "),a("div",{staticClass:"vee-form-grop"},[a("div",{staticClass:"input-group border_radius_none"},[a("span",{staticClass:"input-group-addon agent-login_icon_identifying_code",attrs:{id:"basic-addon1"}}),e._v(" "),a("bs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric|digits:4|isCorrect:"+e.codes,expression:"'required|numeric|digits:4|isCorrect:' + codes"}],attrs:{name:"validCodes",autocomplete:"off",placeholder:"请输入验证码",type:"text"},model:{value:e.validCodes,callback:function(t){e.validCodes="string"==typeof t?t.trim():t},expression:"validCodes"}}),e._v(" "),a("span",{staticClass:"input-group-addon getCode cur-p",on:{click:e.changeCode}},[e._v("\n              "+e._s(e.codes)+"\n          ")])],1),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("validCodes"),expression:"errors.has('validCodes')"}],staticClass:"is-danger"},[e._v(e._s(e.errors.first("validCodes"))+"\n      ")])]),e._v(" "),a("div",{staticClass:"vee-form-grop"},[a("div",{staticClass:"input-group"},[a("span",{staticClass:"input-group-addon glyphicon glyphicon-phone",attrs:{id:"basic-addon1"}}),e._v(" "),a("bs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|phone",expression:"'required|phone'"}],class:{input:!0,"is-danger":e.errors.has("user")},attrs:{name:"user",autocomplete:"user",placeholder:"请输入手机号",type:"text"},model:{value:e.user,callback:function(t){e.user="string"==typeof t?t.trim():t},expression:"user"}})],1),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("user"),expression:"errors.has('user')"}],staticClass:"is-danger"},[e._v(e._s(e.errors.first("user"))+"\n      ")])]),e._v(" "),a("div",{staticClass:"vee-form-grop"},[a("div",{staticClass:"input-group border_radius_none"},[a("span",{staticClass:"input-group-addon agent-login_icon_identifying_code",attrs:{id:"basic-addon1"}}),e._v(" "),a("bs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric|digits:4",expression:"'required|numeric|digits:4'"}],attrs:{name:"validateCode",autocomplete:"off",placeholder:"请输入手机验证码",type:"text"},model:{value:e.validateCode,callback:function(t){e.validateCode="string"==typeof t?t.trim():t},expression:"validateCode"}}),e._v(" "),a("span",{staticClass:"input-group-addon getCode"},[a("input",{staticClass:"btn btn-default",attrs:{type:"button",disabled:e.validateDisabled,value:e.validateText},on:{click:e.Reciprocal}})])],1),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("validateCode"),expression:"errors.has('validateCode')"}],staticClass:"is-danger"},[e._v(e._s(e.errors.first("validateCode"))+"\n      ")])]),e._v(" "),a("div",{staticClass:"vee-form-grop"},[a("div",{staticClass:"input-group"},[a("span",{staticClass:"input-group-addon glyphicon glyphicon-lock",attrs:{id:"basic-addon1"}}),e._v(" "),a("bs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{input:!0,"is-danger":e.errors.has("password")},attrs:{name:"password",autocomplete:"new-password",placeholder:"请输入密码",type:"password"},model:{value:e.password,callback:function(t){e.password="string"==typeof t?t.trim():t},expression:"password"}})],1),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("password"),expression:"errors.has('password')"}],staticClass:"is-danger"},[e._v(e._s(e.errors.first("password"))+"\n      ")])]),e._v(" "),a("div",{staticClass:"vee-form-grop"},[a("div",{staticClass:"input-group invite"},[a("span",{staticClass:"input-group-addon",attrs:{id:"basic-addon1"}},[e._v("邀请码")]),e._v(" "),a("bs-input",{class:{input:!0,"is-danger":e.errors.has("inviteCode")},attrs:{name:"inviteCode",autocomplete:"new-password",placeholder:"请输入邀请码",type:"text"},model:{value:e.inviteCode,callback:function(t){e.inviteCode="string"==typeof t?t.trim():t},expression:"inviteCode"}})],1)]),e._v(" "),e._m(0)])])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vee-form-grop text-right"},[a("button",{staticClass:"btn btn-default submit",attrs:{type:"submit"}},[e._v("注册\n        ")])])}]}},549:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(20),r=a(327);!function(e){e&&e.__esModule}(r);t.default={props:["navData"],data:function(){return{userInfo:{},list:[]}},mounted:function(){this.getInfo()},computed:(0,s.mapState)({user:function(e){return e.login.userInfo}}),methods:{getInfo:function(){var e=this,t={token:this.user.token};this.$ajaxGet("http://bitcoin.xxw360.com/joinMember",t).then(function(t){t&&200==t.code?(e.list=t.data.goods,e.userInfo=t.data):e.$message.error(t.msg)})}},components:{}}},555:function(e,t,a){t=e.exports=a(322)(!1),t.push([e.i,".ctit[data-v-36b8d9cb]{border-bottom:2px solid #ccc;height:40px;line-height:40px;width:100%}.ctit em[data-v-36b8d9cb]{border-bottom:2px solid #ff6000;color:#ff6000;font-size:16px;font-weight:700;display:inline-block;font-style:normal;line-height:38px}.quota[data-v-36b8d9cb]{padding:15px 0}.quota dl dt[data-v-36b8d9cb]{float:left;color:#999;text-align:justify;text-align-last:justify;font-size:14px;width:58px}.quota dl dd[data-v-36b8d9cb]{float:right;width:890px}.quota dl dd p[data-v-36b8d9cb]{font-size:14px;color:#000}.choose[data-v-36b8d9cb]{height:95px;border:1px solid #7b8a9d;border-radius:4px;float:left;margin:10px}.choose .choose-tit[data-v-36b8d9cb]{height:30px;line-height:30px;margin:0 10px;text-align:center}.choose .choose-tit.border-bottom-orange[data-v-36b8d9cb]{border-bottom:1px dotted #ffab77}.choose .notes[data-v-36b8d9cb]{color:#ffab77;font-size:16px;text-align:center}.code_qs[data-v-36b8d9cb]{padding-top:40px;padding-left:10px;width:100%}.code_qs .codess[data-v-36b8d9cb]{float:left;display:inline-block;width:150px;height:150px;margin-right:20px;border:1px solid #ddd;border-radius:4px;padding:5px}.code_qs .codess img[data-v-36b8d9cb]{width:100%;height:100%}.code_qs .rules[data-v-36b8d9cb]{overflow:hidden;display:inline-block}@media only screen and (min-width:1040px){.choose[data-v-36b8d9cb]{width:415px}}@media only screen and (max-width:1039px){.choose[data-v-36b8d9cb]{width:100%}}",""])},573:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"clearfix"},[e._m(0),e._v(" "),a("div",{staticClass:"quota clear clearfix"},[e._m(1),e._v(" "),a("div",{staticClass:"clearfix"},e._l(e.list,function(t){return a("div",{staticClass:"choose"},[a("p",{staticClass:"choose-tit border-bottom-orange"},[e._v(e._s(t.title))]),e._v(" "),a("p",{staticClass:"choose-tit"},[e._v("￥"+e._s(t.price))]),e._v(" "),a("p",{staticClass:"notes"},[e._v(e._s(t.note))])])})),e._v(" "),a("div",{staticClass:"code_qs clearfix"},[a("div",{staticClass:"codess"},[a("img",{attrs:{src:e.userInfo.qrcode,alt:""}})]),e._v(" "),a("div",{staticClass:"rules"},[e._v("\n                "+e._s(e.userInfo.rule)+"\n            ")])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ctit"},[a("em",[e._v("开通会员")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("dl",[a("dt",[e._v("购买周期")])])}]}},585:function(e,t,a){var s=a(555);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(324)("135cc7e6",s,!0,{})}});