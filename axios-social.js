import Axios from "axios";

Axios.defaults.baseURL = "https://kerya.herokuapp.com/auth/";

// eslint-disable-next-line no-unused-vars
const facebookLogin = res => {
  Axios.post("convert-token/", {
    token: res.access_token,
    backend: "facebook",
    grant_type: "convert_token",
    client_id: "FzgqAO8BN0gosZ8ACC3CIEhj0thrVkHxIjRuh37t",
    client_secret:
      "0PTnZIeDU2dPK11fzfGwyZXa3sYY471TZWaGOmlq6Su5lcO50OjB0hnMX3VYhtvqUyQCCZnJ2Lr65LxS1vfr7CQKwQdaFiKkS2391wqotIMxrU4ePANfwK4tojWznsrw"
  }).then(res => {
    console.log(res);
    localStorage.setItem("accessToken", res.data.access_token);
    localStorage.setItem("refreshToken", res.data.refresh_token);
  });
};
