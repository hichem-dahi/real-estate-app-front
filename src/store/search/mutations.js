export default {
  setSearch(state, data) {
    state.search = data;
  },
  setFilSearch(state, data) {
    state.filter = data;
  },
  setHouses(state, data) {
    state.houses = data;
  },
  SET_HOUSE(state, data) {
    state.house = data;
  }
};
