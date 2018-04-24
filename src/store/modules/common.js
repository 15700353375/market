const state = {
  // 导航
  activeLi: 'staffSaleStatist',
  // tabsUl导航
  activeTab: 'staffSaleStatist',
  // 区域option
  regionOptions: [],

  listStatus: 1,

  right: 'USD$',

  keywords: ''
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
};


export default {
  common: {
    namespaced: true,
    state,
    getters,
    mutations
  }
}


