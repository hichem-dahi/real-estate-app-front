export default {
  searchComp(state) {
    return state.search + state.filter;
  },
  GET_HOUSES(state) {
    return state.houses;
  },
  GET_HOUSE(state) {
    return state.house;
  }
};
