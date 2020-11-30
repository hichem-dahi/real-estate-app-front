import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    search: "",
    filter: "",
    savedHousesId: null,
    loading: false
  },
  getters: {
    searchComp(state) {
      return state.search + state.filter;
    }
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
    },
    getUserId(state, id) {
      state.userId = id;
    },
    saveHouse(state, idHouse) {
      state.savedHousesId = idHouse;
    },
    setSearch(state, data) {
      state.search = data;
    },
    setFilSearch(state, data) {
      state.filter = data;
    },
    loadEnd(state) {
      state.loading = false;
    }
  },
  actions: {
    getUidAxios({ commit }, token) {
      Axios.get("/users/users/me/", {
        headers: {
          Authorization: "token " + token
        }
      }).then(res => {
        console.log("getId", res);
        commit("getUserId", res.data.id);
      });
    },
    signIn({ commit, dispatch }, authData) {
      Axios.post("/users/token/login/", {
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          console.log("TokenGet", res);
          commit("authUser", {
            token: res.data.auth_token
          });
          dispatch("getUidAxios", res.data.auth_token);
        })
        .catch(error => console.log(error));
    },
    signUp({ dispatch }, userData) {
      dispatch("signIn", {
        email: userData.email,
        password: userData.password
      });
    },
    search({ commit }, searchArr) {
      var searchStr = "";
      searchStr = searchArr.join("&");

      commit("setSearch", searchStr);
    },
    filterSearch({ commit }, filterArr) {
      var filterStr = "&";
      filterStr += filterArr.join("&");
      commit("setFilSearch", filterStr);
    }
  },
  modules: {}
});
