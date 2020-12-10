<template>
  <v-sheet class="rounded-pill" elevation="2" color="white" height="53">
    <div class="d-flex flex-row">
      <v-autocomplete
        dense
        label="Type"
        filled
        rounded
        multiple
        :items="types"
        v-model="type"
      ></v-autocomplete>
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
      <v-btn fab icon color="blue" @click="searchState">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!--  <v-row>
        <v-spacer></v-spacer>
        <v-col class="pa-0 ma-0" cols="8" align="center">
            <gmap-autocomplete
            :value="description"
            placeholder="This is a placeholder text"
            @place_changed="setPlace"
            :select-first-on-enter="true"
          >
          </gmap-autocomplete>
        </v-col>
        
      </v-row>-->
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
    multiStreet: false,
    address: ""
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

<style></style>
