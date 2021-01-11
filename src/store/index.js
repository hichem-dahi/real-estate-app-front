import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import axiosSocial from "../axios-social";
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
          Authorization: token
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
            token: "token " + res.data.auth_token
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
    socialLogin({ commit, dispatch }, access_token) {
      axiosSocial
        .post("convert-token/", {
          token: access_token,
          backend: "facebook",
          grant_type: "convert_token",
          client_id: "FzgqAO8BN0gosZ8ACC3CIEhj0thrVkHxIjRuh37t",
          client_secret:
            "0PTnZIeDU2dPK11fzfGwyZXa3sYY471TZWaGOmlq6Su5lcO50OjB0hnMX3VYhtvqUyQCCZnJ2Lr65LxS1vfr7CQKwQdaFiKkS2391wqotIMxrU4ePANfwK4tojWznsrw"
        })
        .then(res => {
          console.log(res);
          commit("authUser", {
            token: "Bearer " + access_token
          });
          dispatch("getUidAxios", res.data.auth_token);
          localStorage.setItem("accessToken", res.data.access_token);
          localStorage.setItem("refreshToken", res.data.refresh_token);
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
