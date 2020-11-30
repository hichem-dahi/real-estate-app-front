<template>
  <v-card height="140" width="700" shaped>
    <v-container>
      <v-row>
        <!-- filters -->

        <v-col align="center">
          <v-card-title>Filters</v-card-title>
        </v-col>
        <v-divider vertical></v-divider>

        <!-- Rooms -->
        <v-col>
          Rooms
          <v-select
            :disabled="!roomsNum.length"
            small-chips
            v-model="rooms"
            multiple
            :items="roomsNum"
          >
          </v-select>
        </v-col>
        <v-divider vertical></v-divider>

        <!-- Price -->
        <v-col
          >Price max
          <v-slider
            v-model="price"
            class="d-flex flex-column align-center"
            :max="maxPr"
            :min="minPr"
            hide-details
          >
            <template v-slot:append>
              <v-text-field
                v-model="price"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                suffix="Million DA/Mois"
                style="width: 140px"
              ></v-text-field>
              <div class="mt-3"></div>
            </template>
          </v-slider>
        </v-col>
        <!-- searchButton -->

        <v-col align="end">
          <v-btn fab icon color="red" @click="filterState">
            <v-icon>mdi-magnify</v-icon>
          </v-btn></v-col
        >
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    roomsNum: [],
    rooms: [],
    minPr: 0,
    maxPr: 8,
    price: 4,
    disableRooms: false
  }),
  computed: {
    searchStr() {
      return this.$store.getters.searchComp;
    }
  },
  methods: {
    filterState() {
      var filtersArr = [];
      for (let i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i] == "+4") {
          filtersArr.push("rooms=4");
        }
        filtersArr.push("rooms=" + this.rooms[i]);
      }
      filtersArr.push("max_price=" + this.price + "000");
      this.$store.dispatch("filterSearch", filtersArr);
    }
  },
  watch: {
    searchStr() {
      if (this.searchStr.includes("Appartement")) {
        this.roomsNum = ["2", "3", "+4"];
      } else if (this.searchStr.includes("Villa")) {
        this.roomsNum = ["3", "+4"];
      }
    }
  },
  created() {
    if (this.searchStr.includes("Appartement")) {
      this.roomsNum = ["2", "3", "+4"];
    } else if (this.searchStr.includes("Villa")) {
      this.roomsNum = ["3", "+4"];
    }
  }
};
</script>

<style></style>
