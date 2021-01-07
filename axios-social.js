import Axios from "axios";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://kerya.herokuapp.com/auth/"
});

export default instance;
