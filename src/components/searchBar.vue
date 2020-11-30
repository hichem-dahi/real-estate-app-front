<template>
  <v-sheet color="white" width="500" height="56" class="rounded">
    <div class="d-flex flex-row">
      <validation-provider>
        <v-autocomplete
          label="Type"
          filled
          rounded
          large
          multiple
          :items="types"
          v-model="type"
        ></v-autocomplete>
      </validation-provider>
      <validation-provider>
        <v-autocomplete
          label="City, street"
          small-chips
          large
          filled
          rounded
          :loading="loading"
          :disabled="loading"
          :multiple="multiStreet"
          :items="multiStreet ? streets : cities"
          v-model="city"
        ></v-autocomplete>
      </validation-provider>

      <v-btn fab icon color="red" class="ml-12" @click="searchState">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    types: ["House", "Appartement", "Villa", "Studio", "Chambre colocation"],
    cities: ["Sidi bel abbes", "Oran", "Alger"],
    streets: ["Oran", "Sidi bel abbes", "Alger", "Zeralda", "Hydra"],
    city: "",
    type: [],
    multiStreet: false
  }),
  methods: {
    searchState() {
      var searchArr = [];
      for (let i = 0; i < this.type.length; i++) {
        searchArr.push("type=" + this.type[i]);
      }
      this.$store.dispatch("search", searchArr);
      let url = this.$route.path;
      if (url != "/list") this.$router.push("/list");
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  watch: {
    city(val) {
      if (!Array.isArray(val)) {
        this.multiStreet = true;
        this.city = [val];
      }
      if (val.length == 0) {
        this.multiStreet = false;
        this.city = "";
      }
    }
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 28px;
}
</style>
