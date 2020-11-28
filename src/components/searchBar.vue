<template>
  <div class="search">
    <v-container>
      <v-row>
        <v-col>
          <validation-provider>
            <v-autocomplete
              label="Type"
              filled
              rounded
              large
              :items="types"
              v-model="type"
            ></v-autocomplete>
          </validation-provider>
        </v-col>
        <v-col
          ><validation-provider>
            <v-autocomplete
              label="City"
              small-chips
              filled
              rounded
              large
              multiple
              :items="cities"
              v-model="city"
            ></v-autocomplete> </validation-provider
        ></v-col>
        <v-col cols="2">
          <v-btn
            large
            fab
            :loading="loading"
            :disabled="loading"
            icon
            color="red"
            @click="
              loading = !loading;
              searchState();
            "
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    types: ["Appartement", "Villa", "Studio"],
    cities: ["Sidi bel abbes", "Oran", "Alger"],
    city: ["Alger"],
    type: "Appartement",
    address: "",
    loader: null,
    loading: false
  }),
  computed: {
    /*min_rooms() {
      return this.room.charAt(0);
    },
    max_rooms() {
      return this.room.slice(-1);
    },*/
    search() {
      return (
        "city=" + this.city + "&address=" + this.address + "&type=" + this.type
        /*"&min_rooms=" +
        this.min_rooms +
        "&max_rooms=" +
        this.max_rooms +
        "&min_price=" +
        this.range[0] +
        "&max_price=" +
        this.range[1]*/
      );
    }
  },
  methods: {
    searchState() {
      this.$store.state.search = this.search;
      let url = this.$route.path;
      if (url != "/list") this.$router.push("/list");
      this.loading = false;
    }
  }
};
</script>

<style></style>
