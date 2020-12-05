<template>
  <v-card shaped>
    <v-container>
      <v-row>
        <!-- filters -->

        <v-col>
          <v-card-title class="display-1">Filters</v-card-title>
        </v-col>
        <v-divider vertical></v-divider>

        <!-- Rooms -->
        <v-col align="start" class="py-0">
          Rooms
          <v-select
            class="py-0"
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
        <v-col align="start" class="py-0"
          >Price
          <vue-range-slider
            class="mt-6"
            ref="slider"
            :enable-cross="enableCross"
            v-model="price"
            :min="minPr"
            :max="maxPr"
          ></vue-range-slider>
        </v-col>
        <!-- searchButton -->
        <v-divider vertical></v-divider>

        <v-col align="end" class="py-0">
          <v-btn fab icon color="red" @click="filterState">
            <v-icon>mdi-magnify</v-icon>
          </v-btn></v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <!-- Tags -->
        <v-col align="start">
          <h1 class="title mb-2 ml-2">Tags</h1>
          <v-chip-group v-model="amenities" column multiple>
            <v-chip filter outlined>
              Elevator
            </v-chip>
            <v-chip filter outlined>
              Washer / Dryer
            </v-chip>
            <v-chip filter outlined>
              Fireplace
            </v-chip>
            <v-chip filter outlined>
              Wheelchair access
            </v-chip>
            <v-chip filter outlined>
              Dogs ok
            </v-chip>
            <v-chip filter outlined>
              Cats ok
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import "vue-range-component/dist/vue-range-slider.css";
import VueRangeSlider from "vue-range-component";
export default {
  components: {
    VueRangeSlider
  },
  data: () => ({
    roomsNum: [],
    rooms: [],
    minPr: 0,
    maxPr: 8,
    price: [0, 10],
    disableRooms: false,
    enableCross: false,
    loading: false,
    search: "",
    selected: []
  }),
  computed: {
    searchStr() {
      return this.$store.getters.searchComp;
    },
    allSelected() {
      return this.selected.length === this.items.length;
    },
    categories() {
      const search = this.search.toLowerCase();

      if (!search) return this.items;

      return this.items.filter(item => {
        const text = item.text.toLowerCase();

        return text.indexOf(search) > -1;
      });
    },
    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(selection);
      }

      return selections;
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
