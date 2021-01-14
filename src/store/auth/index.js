import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state: { token: null, userId: null },
  mutations,
  getters,
  actions
};
