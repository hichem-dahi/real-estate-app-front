import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth/index";
import searchModule from "./search/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    savedHousesId: null,
    loading: false
  },
  mutations: {
    saveHouse(state, idHouse) {
      state.savedHousesId = idHouse;
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
  modules: {
    auth: authModule,
    search: searchModule
  }
});
