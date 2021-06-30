import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth/index";
import searchModule from "./search/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    savedHousesId: [],
    loading: false
  },
  mutations: {
    saveHouse(state, savedIds) {
      state.savedHousesId = savedIds;
    },
    loadStart(state) {
      state.loading = true;
    },
    loadEnd(state) {
      state.loading = false;
    }
  },
  getters: {
    getLoad(state) {
      return state.loading;
    }
  },
  actions: {
    saveHouse({ state, commit }, idHouse) {
      var oldIds = state.savedHousesId;
      console.log("is array " + Array.isArray(oldIds));
      var savedIds = [];
      if (oldIds.includes(idHouse)) {
        savedIds = oldIds.filter(id => id != idHouse);
        commit("saveHouse", savedIds);
      } else {
        savedIds = savedIds.concat(oldIds);
        savedIds.push(idHouse);
        commit("saveHouse", savedIds);
      }
    }
  },
  modules: {
    auth: authModule,
    search: searchModule
  }
});
