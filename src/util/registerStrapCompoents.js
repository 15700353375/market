import Vue from 'vue';
import vueStrap from 'vue-strap';

const strapNames = [
  'alert',
  'accordion',
  'affix',
  // 'Aside',
  'buttonGroup',
  'carousel',
  'checkbox',
  'datepicker',
  'dropdown',
  'formGroup',
  'formValidator',
  // 'input',
  'modal',
  'navbar',
  // option,
  'panel',
  'popover',
  'progressbar',
  'radio',
  // 'select',
  'slider',
  'spinner',
  'tab',
  'tabGroup',
  'tabs',
  'toggleButton',
  'tooltip',
  'typeahead'
];

strapNames.map(name => {
  Vue.component(name, vueStrap[name]);
});

// 下面的4个组件与原生的vue组件名称冲突,故重命名后单独注入
Vue.component('bsInput', vueStrap['input']);
Vue.component('bsOption', vueStrap['option']);
Vue.component('bsSelect', vueStrap['select']);
Vue.component('bsAside', vueStrap['Aside']);

