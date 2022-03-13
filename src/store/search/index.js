import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  state: {
    search: "",
    filter: "",
    houses: [],
    house: {}
  },
  mutations,
  getters,
  actions
};
