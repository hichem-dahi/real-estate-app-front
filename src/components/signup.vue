<template>
  <div class="signUp">
    <v-card>
      <v-card-text>
        <validation-provider
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
          <validation-provider
            rules="alphaNum|confirmed:confirm"
            name="Password"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              class="inputs"
              label="Password"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            />
            <span> {{ errors[0] }}</span>
          </validation-provider>
          <validation-provider vid="confirm" v-slot="{ errors }">
            <v-text-field
              v-model="passwordconf"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              class="inputs"
              label="Confirm password"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
            />

            <span> {{ errors[0] }}</span>
          </validation-provider>
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
        <v-btn class="btn" raised color="#CFD8DC" @click="Submit">Submit</v-btn>
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
  computed: {
    tempState() {
      return this.$store.state.userId;
    }
  },
  watch: {
    tempState() {
      this.$router.push("/admin");
    }
  },
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
      Axios.post("/users/", formData)
        .then(res => {
          console.log("CreatedUser", res);
        })
        .catch(error => console.log(error));
      console.log(formData);
    }
  }
};
</script>

<style></style>
