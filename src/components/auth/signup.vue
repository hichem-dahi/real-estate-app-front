<template>
  <div class="signUp">
    <v-card>
      <v-card-text>
        <v-facebook-login
          class="mx-auto"
          app-id="453110369395561"
          @login="getFbData"
        ></v-facebook-login>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <div class="d-flex">
              <validation-provider
                class="mr-5"
                v-slot="{ errors }"
                name="First name"
                rules="required|alpha"
              >
                <v-text-field
                  v-model="fname"
                  class="inputs"
                  label="First name"
                  type="text"
                />
                <span> {{ errors[0] }}</span>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Last name"
                rules="required|alpha"
              >
                <v-text-field
                  v-model="lname"
                  class="inputs"
                  label="Last name"
                  type="text"
                />
                <span> {{ errors[0] }}</span>
              </validation-provider>
            </div>
            <validation-provider
              v-slot="{ errors }"
              name="Username"
              rules="required|alphaNum"
            >
              <v-text-field
                v-model="username"
                class="inputs"
                label="Username"
                type="text"
              />
              <span> {{ errors[0] }}</span>
            </validation-provider>
            <validation-provider rules="email" name="Email" v-slot="{ errors }">
              <v-text-field
                v-model="email"
                class="inputs"
                label="Email"
                type="text"
              />
              <span> {{ errors[0] }}</span>
            </validation-provider>
            <validation-observer>
              <div class="d-flex">
                <validation-provider
                  class="mr-5"
                  rules="alphaNum|confirmed:confirm"
                  name="Password"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="password"
                    class="inputs"
                    label="Password"
                    type="password"
                  />
                  <span> {{ errors[0] }}</span>
                </validation-provider>
                <validation-provider vid="confirm" v-slot="{ errors }">
                  <v-text-field
                    v-model="passwordconf"
                    class="inputs"
                    label="Confirm"
                    type="password"
                  />

                  <span> {{ errors[0] }}</span>
                </validation-provider>
              </div>
            </validation-observer>

            <validation-provider
              rules="numeric"
              name="Phone number"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="phoneNum"
                class="inputs"
                label="Phone N°"
                type="text"
              />
              <span> {{ errors[0] }}</span>
            </validation-provider>

            <v-btn
              class="btn"
              :disabled="invalid"
              raised
              color="#CFD8DC"
              @click="Submit"
              >Submit</v-btn
            >
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data: () => ({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    passwordconf: "",
    phoneNum: "",
    show1: false,
    show2: false
  }),
  methods: {
    Submit() {
      this.$emit("dialog-false");
      const formData = {
        username: this.username,
        first_name: this.fname,
        last_name: this.lname,
        email: this.email,
        password: this.password,
        re_password: this.passwordconf,
        phone: this.phoneNum
      };
      Axios.post("/users/users/", formData)
        .then(res => {
          console.log("CreatedUser", res);
        })
        .catch(error => console.log(error));
      console.log(formData);
    },
    getFbData(res) {
      console.log(res.authResponse);
      this.$store.dispatch("socialLogin", res.authResponse.accessToken);
    }
  }
};
</script>

<style></style>
