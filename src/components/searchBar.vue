<template>
  <div class="search">
    <v-container>
      <v-row>
        <v-col>
          <validation-provider>
            <v-select x-large :items="types" v-model="type"></v-select>
          </validation-provider>
        </v-col>
        <v-col
          ><validation-provider>
            <v-select
              large
              :items="cities"
              v-model="city"
            ></v-select> </validation-provider
        ></v-col>
        <v-col cols="2">
          <router-link
            style="text-decoration: none;
                color: white"
            :to="{ name: 'List', params: { id: id } }"
          >
            <v-btn
              large
              fab
              class="mt-3"
              :loading="loading"
              :disabled="loading"
              icon
              color="primary"
              @click="sendEvent"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    types: ["Appartement", "Villa", "Studio"],
    cities: ["Sidi bel-abbes", "Oran", "Alger"],
    city: "Alger",
    type: "Appartement",
    loader: null,
    loading: false
  }),
  computed: {
    min_rooms() {
      return this.room.charAt(0);
    },
    max_rooms() {
      return this.room.slice(-1);
    },
    search() {
      return (
        "city=" +
        this.city +
        "&address=" +
        this.address +
        "&type=" +
        this.type +
        "&min_rooms=" +
        this.min_rooms +
        "&max_rooms=" +
        this.max_rooms +
        "&min_price=" +
        this.range[0] +
        "&max_price=" +
        this.range[1]
      );
    }
  },
  methods: {
    searchState() {
      this.$store.state.search = this.search;
      let url = this.$route.path;
      if (url != "/list") this.$router.push("/list");
    },
    sendEvent() {
      this.$emit("expand");
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>

<style></style>
