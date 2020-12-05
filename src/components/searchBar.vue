<template>
  <v-sheet elevation="2" color="white" class="rounded pa-0 ma-0">
    <v-container>
      <v-row>
        <v-col>
          <v-autocomplete
            dense
            label="Type"
            filled
            rounded
            multiple
            :items="types"
            v-model="type"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            label="City"
            small-chips
            dense
            filled
            rounded
            :loading="loading"
            :disabled="loading"
            :multiple="multiStreet"
            :items="multiStreet ? streets : cities"
            v-model="city"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col class="pa-0 ma-0" cols="8" align="center">
          <v-autocomplete
            label="Commune"
            filled
            dense
            rounded
            multiple
            :items="Communes"
            v-model="Commune"
          ></v-autocomplete>
        </v-col>
        <v-col align="end" class="pa-0 ma-0" cols="2">
          <v-btn fab icon color="blue" @click="searchState">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
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
    },
    onClickOutside() {
      this.expand = false;
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
