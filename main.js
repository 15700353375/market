/**
 * @Author:      cyzeng
 * @DateTime:    2017-06-16 22:07:55
 * @Description: main.js
 */

// 引入相关依赖
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import storeMain from '@Src/store/storeMain';
import routes from '@Src/routers';
import App from '@Src/App';
import Pace from 'pace';
import moment from 'moment';
import $ from "jquery";
import datePicker from 'vue-bootstrap-datetimepicker';
import Message from 'vue-multiple-message'
import regeisterVueStrap from '@Util/registerStrapCompoents';
import registerVeeCustomValidate from '@Util/registerVeeCustomValidate';
import registerAxios from '@Util/registerAxios';
import clickOutside from '@Util/clickOutside';
import comUtil from '@Util/comUtil';
// import { noTokenUrls } from '@Util/axiosConfig'

Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(VueRouter);
Vue.use(datePicker);

Vue.prototype.$message = Message;

// 引入Vuex配置文件
const store = new Vuex.Store({
  modules: storeMain,
  plugins: [comUtil.vuexReload]
});

// 引入路由
const router = new VueRouter({
  linkActiveClass: 'red',
  routes
});

const app = new Vue({
  el: '#app',
  store,
  router,
  components:{
    App: App
  },
  template: '<App/>',
});

// 设置全局变量
window.$ = $;
window.Moment = moment;
window.app = app;



// 路由跳转之前，检测是否有token
router.beforeEach((to, from, next) => {
  next()
  // if (noTokenUrls.indexOf(to.path) == -1) {
  //   // 跳转需要token的路由,检测session是否有token
  //   // let token = sessionStorage.getItem("agentToken");
  //   if(token){
  //     // next();
  //   }else{
  //     // next({ path: '/' });
  //   }
  // }else{
  //   // next();
  // }
})
