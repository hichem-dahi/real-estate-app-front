<template>
  <div>
    <v-card>
      <v-card-text>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider rules="email" name="Email" v-slot="{ errors }">
              <v-text-field
                v-model="email"
                class="inputs"
                label="Email"
                type="text"
              />
              <span> {{ errors[0] }}</span>
            </validation-provider>
            <validation-provider
              rules="alphaNum"
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
export default {
  data: () => ({
    email: "",
    password: "",
    show1: false
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
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signIn", {
        email: formData.email,
        password: formData.password
      });
      console.log(formData);
    }
  }
};
</script>

<style></style>
