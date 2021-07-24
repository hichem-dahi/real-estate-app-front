export default {
  state: {
    savedHouses: []
  },
  mutations: {
    SET_SAVED_HOUSE(state, savedHouse) {
      state.savedHouses.push(savedHouse);
    },
    REM_SAVED_HOUSE(state, savedHouse) {
      state.savedHouses = state.savedHouses.filter(item => item != savedHouse);
    }
  }
};
