export default {
  search({ commit }, searchArr) {
    var searchStr = "";
    searchStr = searchArr.join("&");

    commit("setSearch", searchStr);
  },
  filterSearch({ commit }, filterArr) {
    var filterStr = "&";
    filterStr += filterArr.join("&");
    commit("setFilSearch", filterStr);
  }
};
