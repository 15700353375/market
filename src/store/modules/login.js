const state = {
  userInfo: {},
  isVip: false,
};

const getters = {};


const mutations = {
  setUserInfo (state,userInfo) {    
    // 变更状态
    state.userInfo = userInfo;
  },
  setIsVip (state,isVip) {    
    // 变更状态
    state.isVip = isVip;
  },

  
};


export default {
  login: {
    namespaced: true,
    state,
    getters,
    mutations
  }
}


