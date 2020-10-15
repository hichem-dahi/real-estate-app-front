<template>
  <div class="HouseForm" style="margin-left: 20px">
    <validation-provider>
      <v-autocomplete
        solo
        :items="cities"
        color="white"
        item-text="city"
        item-value="id"
        label="City"
        v-model="city"
      ></v-autocomplete>
    </validation-provider>
    <validation-provider>
      <v-text-field
        solo
        label="Address"
        v-model="address"
        name="address"
      ></v-text-field>
    </validation-provider>
    <validation-provider>
      <v-select solo :items="types" v-model="type" label="Type"></v-select>
    </validation-provider>
    <validation-provider>
      <v-select solo :items="rooms" v-model="room" label="Rooms"></v-select>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Price" rules="numeric">
      <v-range-slider
        solo
        v-model="range"
        :max="max"
        :min="min"
        hide-details
        class="align-center"
        label="Price"
        thumb-size="24"
        thumb-label="always"
      >
      </v-range-slider>
      <span> {{ errors[0] }} </span>
    </validation-provider>
    <v-btn class="btn" @click="searchState" raised color="#CFD8DC">
      Search
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    cities: ["Sidi bel abbes", "Oran", "Alger"],
    city: "",
    address: "",
    types: ["Appartement", "Villa"],
    type: "",
    rooms: ["0-3", "3-7"],
    room: "",
    min: 1000,
    max: 10000,
    slider: 40,
    range: [1000, 10000]
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
    }
  }
};
</script>
<style scoped>
.btn {
  left: 40%;
  margin-bottom: 10px;
}

.v-text-field {
  width: 210px;
}
</style>
