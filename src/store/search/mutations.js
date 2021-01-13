export default {
  mutations: {
    setSearch(state, data) {
      state.search = data;
    },
    setFilSearch(state, data) {
      state.filter = data;
    }
  }
};
