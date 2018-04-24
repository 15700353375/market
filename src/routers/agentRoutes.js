// /**
//  * @Author:      cyzeng
//  * @DateTime:    2017年7月10日 17:40:01
//  * @Description: 主业务路由
//  */

// // 页面主框架
// const agent = r => require.ensure( [], () => r(require('@Src/view/agent/agent')), 'agent');

// // 销售报表
// const reportFrame = r => require.ensure( [], () => r(require('@Src/view/agent/report/reportFrame')), 'reportFrame');
// const saleRecord = r => require.ensure( [], () => r(require('@Src/view/agent/report/saleRecord')), 'saleRecord');
// const staffSaleStatist = r => require.ensure( [], () => r(require('@Src/view/agent/report/staffSaleStatist')), 'staffSaleStatist');

// // 超市管理
// const customerList = r => require.ensure( [], () => r(require('@Src/view/agent/marketManager/customerList')), 'customerList');

// // 授权管理
// const authorizeFrame = r => require.ensure( [], () => r(require('@Src/view/agent/authorizeManager/authorizeFrame')), 'authorizeFrame');
// const distributePower = r => require.ensure( [], () => r(require('@Src/view/agent/authorizeManager/distributePower')), 'distributePower');
// const applyPower = r => require.ensure( [], () => r(require('@Src/view/agent/authorizeManager/applyPower')), 'applyPower');

// const authorizeUserFrame = r => require.ensure( [], () => r(require('@Src/view/agent/authorizeManager/authorizeUser/authorizeUserFrame')), 'authorizeUserFrame');
// const authorizeUserincrement = r => require.ensure( [], () => r(require('@Src/view/agent/authorizeManager/authorizeUser/authorizeUserincrement')), 'authorizeUserincrement');
// const authorizeUserStandard = r => require.ensure( [], () => r(require('@Src/view/agent/authorizeManager/authorizeUser/authorizeUserStandard')), 'authorizeUserStandard');

// // 员工管理
// const staffList = r => require.ensure( [], () => r(require('@Src/view/agent/staffManager/staffList')), 'staffList');

// // 系统日志
// const systemList = r => require.ensure( [], () => r(require('@Src/view/agent/systemLog/systemList')), 'systemList');




// export default [
//   {
//     path: '/agent',
//     component: agent,
//     children: [
//       {
//         path: 'report',
//         component: reportFrame,
//         children: [
//           {
//             path: 'saleRecord',
//             name:'saleRecord',
//             component: saleRecord
//           },
//           {
//             path: 'staffSaleStatist',
//             name:'staffSaleStatist',
//             component: staffSaleStatist
//           }

//         ]
//       },
//       {
//         path: 'market',
//         name: 'customerList',
//         component: customerList
//       },
//       {
//         path: 'authorize',
//         component: authorizeFrame,
//         children: [
//           {
//             path: 'distributePower',
//             name:'distributePower',
//             component: distributePower
//           },
//           {
//             path: 'applyPower',
//             name:'applyPower',
//             component: applyPower
//           }
//         ]
//       },
//       {
//         path: 'authorizeUser',
//         component: authorizeUserFrame,
//         children: [
//           {
//             path: 'authorizeUserincrement',
//             name:'authorizeUserincrement',
//             component: authorizeUserincrement
//           },
//           {
//             path: 'authorizeUserStandard',
//             name:'authorizeUserStandard',
//             component: authorizeUserStandard
//           }
//         ]
//       },
//       {
//         path: 'staff',
//         name: 'staffList',
//         component: staffList
//       },
//       {
//         path: 'system',
//         name: 'systemList',
//         component: systemList
//       }
//     ]
//   }
// ]
