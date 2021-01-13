export default {
  mutations: {
    authUser(state, token) {
      state.token = token;
    },
    getUserId(state, id) {
      state.userId = id;
    }
  }
};
