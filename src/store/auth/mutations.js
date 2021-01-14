export default {
  authUser(state, token) {
    state.token = token;
  },
  setUserId(state, id) {
    state.userId = id;
  }
};
