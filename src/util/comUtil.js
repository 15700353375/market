/*
 * @Author:      cyzeng
 * @DateTime:    2017-07-31 15:51:50
 * @Description: 公共方法
 */

import _ from 'lodash';

export default {
  // 克隆
  clone(obj){
    return JSON.parse(JSON.stringify(obj));
  },

  // 格式化时间
  formatUnit(value){
    
    let newVal;
    if(value >= 1000 && value < 1000000){
      newVal = parseFloat((value/1000).toFixed(3)) + 'k'
    }else if(value >= 1000000 && value < 1000000000){
      newVal = parseFloat((value/1000000).toFixed(3)) + 'M'
    }else if(value >= 1000000000){
      newVal = parseFloat((value/1000000000).toFixed(3)) + 'B'
    }
    return newVal;
  },

  // 格式化时间
  formatTime(time, type){
    let typeFin =  type ? type : 'YYYY-MM-DD HH:mm:ss';
    return Moment(time*1000).format(typeFin);
  },

  // 格式化金额
  formatMoney(money){
    let newVal;
    if(money.toFixed(2) == 0.00){
      return newVal = 0;
    }else{
      newVal = parseFloat(money.toFixed(2));
    }
    
    return newVal;
  },

  // 格式化区域，暂时支持二级查询
  formatRegion(provinceId, cityId, list){
    if(list.length){
      let province = '';
      let provinceName = '';
      let city = '';
      let cityName = '';

      // 因为老数据原因，做容错处理
      province = _.find(list, { 'province_id': parseInt(provinceId)});
      if(province){
        provinceName = province.province_name;
        city = _.find(province.child, { 'city_id': parseInt(cityId)});
        if(city){
          cityName = city.city_name;
        }else{
          return '';
        }
        return `${provinceName}-${cityName}`;
      }else{
        return '';
      }
    }
  },

  // 格式化员工json
  formatEmployee(arr){
    let employeeArr = [];
    arr.forEach( (item) =>{
      employeeArr.push({value: parseInt(item.user_id),label: item.username});
    })
    return employeeArr;
  },

  // 登录生成随机验证码
  randomValidateCode(){
    let arr = 'qwertyuiopasdfghjklzxcvbnm0123456789'.split('');
    let validateCode = [];
    for(let i=0;i<4;i++){
      validateCode.push( arr[parseInt(Math.random()*36)]);
    }
    return validateCode.join('');
  },

  // vuex刷新重新读取session storage数据
  vuexReload(store){
    let isEmptyObject = (obj)=>{
    for(let key in obj){
        return false;
      }
      return true;
    }

    let vuexDataHistory = sessionStorage.getItem('vuexData');
    if(  vuexDataHistory && !isEmptyObject(JSON.parse(vuexDataHistory))  ){
      let vuexData = JSON.parse(vuexDataHistory);
      // 遍历vuexData中的数据，触发相应mutation
      for(let key in vuexData){
        store.state[key] = vuexData[key].state[key]
      }
    }
    store.subscribe((mutation, state) => {
      // 每次 mutation 之后,存储信息到session中,使用三元运算符，造成多操作一次sessionStorage
      let vuexDataHistory = sessionStorage.getItem('vuexData');
      let vuexData = {};
      if(vuexDataHistory){
        // 判断有误历史vuexDataHistory
        vuexData = JSON.parse(vuexDataHistory);
      }
      let config = mutation.type.split('/');
      let moduleName = config[0];
      let payload = mutation.payload;
      let mutationWay = mutation.type;
      vuexData[moduleName] = {
        payload: payload,
        mutationWay: mutationWay,
        state: state
      };
        sessionStorage.setItem('vuexData', JSON.stringify(vuexData));
    })
  },

  // 验证手机号
  test_phone(value) {
    return /^(13\d|14[57]|15[^4,\D]|17[03678]|18\d)\d{8}$/.test(value);
  },
  // 验证密码
  test_password(value) {
    
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value.toString());
  },

  // 产生随机数
  //产生随机数函数
  RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
  }
  
}
