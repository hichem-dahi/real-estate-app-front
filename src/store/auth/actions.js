import Axios from "axios";
import axiosSocial from "axios";

export default {
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
  signIn({ commit, dispatch, state }, authData) {
    Axios.post("/users/token/login/", {
      email: authData.email,
      password: authData.password
    })
      .then(res => {
        console.log("TokenGet", res);
        commit("authUser", "token " + res.data.auth_token);
        dispatch("getUidAxios", state.token);
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
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("refreshToken", res.data.refresh_token);
      });
  }
};
