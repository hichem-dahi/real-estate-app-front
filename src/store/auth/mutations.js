export default {
  authUser(state, token) {
    state.token = token;
  },
  setUserId(state, id) {
    state.userId = id;
  },
  setError(state, error) {
    state.error = error;
  },
  setFormErrors(state, formErrors) {
    state.formErrors = formErrors;
  },
  setUserHouses(state, data) {
    state.userHouses = data;
  }
};
