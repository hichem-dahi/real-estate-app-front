export default {
  state: {
    savedHouses: []
  },
  mutations: {
    async SET_SAVED_HOUSE(state, savedHouse) {
      await state.savedHouses.push(savedHouse);
    },
    async REM_SAVED_HOUSE(state, savedHouse) {
      state.savedHouses = await state.savedHouses.filter(
        item => item.id != savedHouse.id
      );
    },
    async GET_SAVED_HOUSES(state, savedHouses) {
      state.savedHouses = savedHouses;
    }
  },
  getters: {
    GET_SAVED_HOUSES(state) {
      return state.savedHouses;
    }
  },
  actions: {
    getHousesLocal({ commit }) {
      if (localStorage.getItem("savedHouses") != null) {
        var savedHouses = JSON.parse(localStorage.getItem("savedHouses"));
        commit("GET_SAVED_HOUSES", savedHouses);
      }
    },
    setHousesLocal({ state }) {
      localStorage.setItem("savedHouses", JSON.stringify(state.savedHouses));
    }
  }
};
