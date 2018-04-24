/*--
 * @Author:      cyzeng
 * @DateTime:    2017-07-26 23:06:37
 * @Description: 初始化Vee-validate
 --*/

import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import {
        veeCustomMessage,
        veeCustomRules
       } from '@Src/assets/js/validate/veeCustomMessage.js';


// 将中文语言库引入
Validator.addLocale(zh_CN);


// vee初始化配置
const config = {
  errorBagName: 'errors', // Vue错误实例对象名字
  fieldsBagName: 'fields',
  delay: 500, // 验证延迟
  locale: 'zh_CN',  // 本地化验证语言
  dictionary: veeCustomMessage, // vee验证库
  strict: true,   // 没有规则input，不验证
  classes: true,   //针对不同验证结果，添加不同库
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'has-error', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  // events: 'change',
  inject: true
};

Vue.use(VeeValidate,config);



// 添加自定义规则
veeCustomRules.forEach((item) => {
  Validator.extend(item.name, item.validator);
});

