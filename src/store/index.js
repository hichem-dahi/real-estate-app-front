import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth/index";
import searchModule from "./search/index";
import savedHouses from "./savedHouses/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    address: ""
  },
  mutations: {
    loadStart(state) {
      state.loading = true;
    },
    loadEnd(state) {
      state.loading = false;
    },
    SET_ADDRESS(state, address) {
      state.address = address;
    }
  },
  getters: {
    getLoad(state) {
      return state.loading;
    }
  },
  modules: {
    auth: authModule,
    search: searchModule,
    savedHouses: savedHouses
  }
});
