import axiosSocial from "../axios-social";

export default {
  socialSignIn(access_token) {
    axiosSocial
      .post("convert-token/", {
        token: access_token,
        backend: "facebook",
        grant_type: "convert_token",
        client_id: "FzgqAO8BN0gosZ8ACC3CIEhj0thrVkHxIjRuh37t",
        client_secret:
          "0PTnZIeDU2dPK11fzfGwyZXa3sYY471TZWaGOmlq6Su5lcO50OjB0hnMX3VYhtvqUyQCCZnJ2Lr65LxS1vfr7CQKwQdaFiKkS2391wqotIMxrU4ePANfwK4tojWznsrw"
      })
      .then(res => {
        console.log(res);
        return res;
      });
  }
};
