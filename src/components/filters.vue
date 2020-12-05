<template>
  <v-sheet elevation="2" color="white" class="rounded ma-0 pa-0">
    <v-container>
      <v-row>
        <!-- Title -->
        <v-col cols="2">
          <v-card-title>Filters</v-card-title>
        </v-col>
        <v-divider vertical></v-divider>

        <!-- Rooms -->
        <v-col class="py-0" cols="3" align="start">
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
        <v-col class="py-0" cols="3" align="start"
          >Price
          <v-range-slider
            class="mt-5"
            v-model="price"
            :min="minPr"
            :max="maxPr"
            thumb-label="always"
            :thumb-size="22"
          ></v-range-slider>
        </v-col>
        <v-divider vertical></v-divider>

        <!-- Prepayment -->
        <v-col class="py-0" cols="3">
          Prepayment (months)
          <v-slider
            v-model="prep"
            max="6"
            thumb-label="always"
            :thumb-size="22"
          ></v-slider>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <!-- Tags -->
        <v-col cols="10" align="center">
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
        <!-- Search Button -->
        <v-col class="py-0 mt-12" align="end">
          <v-btn fab color="blue" @click="filterState">
            <v-icon color="white">mdi-magnify</v-icon>
          </v-btn></v-col
        >
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
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
    selected: [],
    prep: 0,
    maxPrep: 6
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
<style scoped>
.rounded {
  border-radius: 28px;
}
</style>
