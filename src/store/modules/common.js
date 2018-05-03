const state = {
  // 导航
  activeLi: 'staffSaleStatist',
  // tabsUl导航
  activeTab: 'staffSaleStatist',
  // 区域option
  regionOptions: [],

  listStatus: 1,

  right: 'USD$',

  keywords: '',

  listName: '',

  chartsData1: {},
  chartsData2: {},
  chartsData3: {},

  isNavShow: false,
};

const getters = {};


const mutations = {

  setlistStatus(state,listStatus) {
    // 变更状态
    state.listStatus = listStatus;
  },
  setRight(state,right) {
    // 变更状态
    state.right = right;
  },
  setKeywords(state,keywords) {
    
    // 变更状态
    state.keywords = keywords;
  },

  setListName(state,listName) {
    
    // 变更状态
    state.listName = listName;
  },

  setChartsData1(state,chartsData1) {    
    // 变更状态
    state.chartsData1 = chartsData1;
  },
  setChartsData2(state,chartsData2) {    
    // 变更状态
    state.chartsData2 = chartsData2;
  },
  setChartsData3(state,chartsData3) {    
    // 变更状态
    state.chartsData3 = chartsData3;
  },
  // 设置nav是否显示
  setIsNavShow(state,isNavShow) {    
    
    // 变更状态
    state.isNavShow = sessionStorage.getItem("isNavShow");
  },
};


export default {
  common: {
    namespaced: true,
    state,
    getters,
    mutations
  }
}


