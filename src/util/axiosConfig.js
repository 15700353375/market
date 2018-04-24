/*
 * @Author:      cyzeng
 * @DateTime:    2017-07-31 15:51:50
 * @Description: 请求路径
 */

let base_url = '/agent/agent/web/';

if (process.env.NODE_ENV == 'production') {
  // 测试部使用的生产环境，上线时改为发布环境
  base_url = '/agent/agent/web/';

}else{
  // 开发环境
  base_url = '/api/';
}


export const baseUrl = base_url;

// 所有请求具体url链接
export const urls = {
  BASE_URL: base_url,
  // 登录
  LOGIN_LOGIN: 'login/login',
  PUBLIC_CAPTCHA_IMG: 'public/captcha-img',

  // 找回密码
  PUBLIC_CAPTCHA_SMS: 'public/captcha-sms',
  LOGIN_RESET_PASSWD: 'login/reset-passwd',

  // 销售报表
  SALE_SALE_SHOP_STATISTICS: 'sale/sale-shop-statistics',
  SALE_SALE_RECORD: 'sale/sale-record',
  SALE_EMPLOYEE_SALELIST: 'sale/employee-salelist',

  // 超市管理
  SHOP_LIST: 'shop/list',
  SHOP_DETAIL: 'shop/detail',
  SHOP_SHOP_EMPOWER_LIST: 'shop/shop-empower-list',
  SHOP_SALE_UPDATE: 'shop/sale-update',
  SHOP_SHOP_EMPOWER: 'shop/shop-empower',

  // 授权管理
  EMPLOYEE_EMPLOYEE_LIST: 'empower/empower-list',
  EMPLOYEE_EMPLOYEE_COUNT: 'empower/empower-count',
  AGENT_APPLY_CREATE: 'agent-apply/create',
  EMPLOYEE_EMPLOYEE_INFO: 'empower/empower-info',
  EMPLOYEE_EMPLOYEE_ASSIGNED: 'empower/empower-assigned',
  EMPLOYEE_EMPLOYE_ALLOCATE: 'empower/empower-allocate',
  EMPLOYEE_EMPLOYE_RECYCLE: 'empower/empower-recycle',

  // 员工管理
  EMPLOYEE_LIST_EMPLOYEE: 'employee/list-employee',
  EMPLOYEE_ADD_EMPLOYEE: 'employee/add-employee',
  EMPLOYEE_EDIT_EMPLOYEE_INFO: 'employee/edit-employee',
  EMPLOYEE_DEL_EMPLOYEE: 'employee/del-employee',
  AGENT_APPLY_LIST: 'agent-apply/list',

  /*公共部分*/
  // 区域
  COMMON_REGION_LIST: 'common/region-list',
  // 所有员工
  EMPLOYEE_ALL_EMPLOYEE: 'employee/all-employee',
  // 修改密码
  EMPLOYEE_UPDATE_PASSWORD: 'employee/update-password',
  // 日志类型
  LOG_LIST: 'log/list',
  // 个人信息
  EMPLOYEE_GET_EMPLOYEE_INFO: 'employee/get-employee-info',
  // 修改个人信息
  EMPLOYEE_UPDATE_INFO: 'employee/update-info',
  // 剩余权限
  EMPOWER_GET_EMPOWERNUM: 'empower/get-empowernum',

};

// 不需要token的请求
export const noTokenReq = [
  'login/login',
  'public/captcha-img',
  'public/captcha-sms',
  'login/reset-passwd'
];

// 不需要token的路由
export const noTokenUrls = [
  '/',
  '/login',
  '/forgetPasswd'
];

