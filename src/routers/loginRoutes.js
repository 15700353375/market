/**
 * @Author:      cyzeng
 * @DateTime:    2017-06-16 23:11:25
 * @Description: 登录路由
 */

const index = r => require.ensure( [], () => r(require('@Src/view/login/index')), 'index');
const login = r => require.ensure( [], () => r(require('@Src/view/login/login')), 'login');
const forgetPasswd = r => require.ensure( [], () => r(require('@Src/view/login/forgetPasswd')), 'forgetPasswd');

const report = r => require.ensure( [], () => r(require('@Src/view/login/list')), 'report');
export default [
  {
    path: '/',
    name: 'index',
    component: index,
    children: [
      {
        path: '/',
        component: report,
      }]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/forgetPasswd',
    name: 'forgetPasswd',
    component: forgetPasswd
  },
]
