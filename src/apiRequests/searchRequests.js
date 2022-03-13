import axios from "axios";
axios.defaults.baseURL = "https://kerya.herokuapp.com/api";
export default {
  getHousesReq(searchStr) {
    return axios.get("/houses-list/?" + searchStr).then(res => {
      console.log(res);
      return res.data;
    });
  },
  getUserHouses(userId) {
    return axios.get("/houses-list/" + userId).then(res => {
      console.log(res.data);
      return res;
    });
  }
};
