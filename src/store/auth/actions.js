import Axios from "axios";
import axiosSocial from "/home/hichem/project/src/axios-social";

export default {
  getUidAxios({ commit }, token) {
    Axios.get("/users/users/me/", {
      headers: {
        Authorization: token
      }
    }).then(res => {
      console.log("getId", res);
      commit("setUserId", res.data.id);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.id);
    });
  },
  signIn({ commit, dispatch }, authData) {
    Axios.post("/users/token/login/", {
      email: authData.email,
      password: authData.password
    })
      .then(res => {
        console.log("TokenGet", res);
        commit("authUser", "token " + res.data.auth_token);
        dispatch("getUidAxios", "token " + res.data.auth_token);
      })
      .catch(error => console.log(error));
  },
  signUp({ dispatch }, userData) {
    dispatch("signIn", {
      email: userData.email,
      password: userData.password
    });
  },
  socialLogin({ commit, dispatch, state }, access_token) {
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
        commit("authUser", "Bearer " + res.data.access_token);
        dispatch("getUidAxios", state.token);
        localStorage.setItem("reToken", res.data.refresh_token);
      });
  },
  refreshLogin({ commit }) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      commit("authUser", token);
      commit("setUserId", userId);
    }
  },
  logout({ commit }) {
    commit("authUser", null);
    commit("setUserId", null);
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
  }
};
