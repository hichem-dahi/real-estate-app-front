export default {
  getters: {
    searchComp(state) {
      return state.search + state.filter;
    }
  }
};
