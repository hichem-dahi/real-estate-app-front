export default {
  state: {
    savedHouses: []
  },
  mutations: {
    async SET_SAVE_HOUSE(state, savedHouse) {
      await state.savedHouses.push(savedHouse);
    },
    async REM_SAVED_HOUSE(state, savedHouse) {
      state.savedHouses = await state.savedHouses.filter(
        item => item.id != savedHouse.id
      );
    },
    async SET_SAVED_HOUSES(state, savedHouses) {
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
      console.log(JSON.parse(localStorage.getItem("savedHouses")).length);
      if (JSON.parse(localStorage.getItem("savedHouses")).length != 0) {
        var savedHouses = JSON.parse(localStorage.getItem("savedHouses"));
        commit("SET_SAVED_HOUSES", savedHouses);
      }
    },
    async updateSavedHouses({ state, commit }, { saved, ...savedHouse }) {
      console.log(savedHouse);
      if (saved == false) {
        await commit("SET_SAVE_HOUSE", savedHouse);
      } else {
        await commit("REM_SAVED_HOUSE", savedHouse);
      }
      await localStorage.setItem(
        "savedHouses",
        JSON.stringify(state.savedHouses)
      );
    }
  }
};
