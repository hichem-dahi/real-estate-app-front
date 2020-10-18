import axios from "axios";
const instance = axios.create({
  baseURL: "https://kerya.herokuapp.com/api"
});

export default instance;
