<template>
  <v-container>
    <v-row>
      <!-- Rooms -->
      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 4">
        <v-menu
          v-if="roomsItems.length != 0"
          nudge-width="50"
          :close-on-content-click="false"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#455A64"
              small
              rounded
              outlined
              v-on="on"
              v-bind="attrs"
              >Rooms
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list class="ma-0 pa-0">
            <v-list-item
              class="my-0 py-0"
              v-for="(roomsItem, i) in roomsItems"
              :key="i"
            >
              <v-list-item-content class="ma-0 pa-0">
                <v-list-item-action class="ma-0 pa-0">
                  <v-checkbox
                    v-model="selectedRooms"
                    :label="roomsItem"
                    :value="roomsItem"
                  ></v-checkbox>
                </v-list-item-action>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- Price -->
        <v-menu nudge-width="50" :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-2"
              color="#455A64"
              small
              rounded
              outlined
              v-bind="attrs"
              v-on="on"
              >Price
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list class="ma-0 pa-0">
            <v-list-item
              class="my-0 py-0"
              v-for="(priceRange, i) in priceRanges"
              :key="i"
            >
              <v-list-item-content class="ma-0 pa-0">
                <v-list-item-action class="ma-0 pa-0">
                  <v-radio-group v-model="selectedRange">
                    <v-radio
                      :label="priceRange.min + ' - ' + priceRange.max + ' DA'"
                      :value="priceRange"
                    >
                    </v-radio>
                  </v-radio-group>
                </v-list-item-action>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Prepayment -->
        <v-menu :nudge-width="30" :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-2"
              color="#455A64"
              small
              rounded
              outlined
              v-bind="attrs"
              v-on="on"
              >Prepayment
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list subheader>
            <v-subheader style="height: 30px" class="py-0 my-0"
              >Months</v-subheader
            >
            <v-list-item class="py-0 my-0">
              <v-list-item-content class="pt-1 pb-0"
                ><v-list-item-action class="mb-0">
                  <v-slider
                    v-model="prep"
                    max="6"
                    thumb-label="always"
                    :thumb-size="14"
                  ></v-slider></v-list-item-action
              ></v-list-item-content> </v-list-item
          ></v-list>
        </v-menu>
      </v-col>
      <!-- Search Button -->
      <v-col class="py-0">
        <v-btn
          class="white--text"
          height="40"
          width="55"
          elevation="1"
          rounded
          x-large
          color="primary"
          @click="filterState"
        >
          Filter
          <v-icon color="white">mdi-sync</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tags: [],
    roomsItems: [],
    selectedRooms: [],
    minPr: 0,
    maxPr: 8,
    selectedRange: null,
    priceRanges: [
      { min: "0", max: "1000" },
      { min: "1000", max: "2000" },
      { min: "2000", max: "3000" }
    ],
    disableRooms: false,
    enableCross: false,
    loading: false,
    search: "",
    prep: 0,
    maxPrep: 6
  }),
  computed: {
    searchStr() {
      return this.$store.getters.SEARCH_COMP;
    }
  },
  methods: {
    filterState() {
      var filtersArr = [];

      // Setting rooms filter
      for (let i = 0; i < this.selectedRooms.length; i++) {
        filtersArr.push("rooms=" + this.selectedRooms[i]);
      }

      // Setting price filter
      if (this.selectedRange != null) {
        filtersArr.push("price_gte=" + this.selectedRange.min);
        filtersArr.push("price_lte=" + this.selectedRange.max);
      }
      this.$store.dispatch("filterSearch", filtersArr);
    }
  },
  watch: {
    searchStr() {
      if (this.searchStr.includes("Appartement")) {
        this.roomsItems = ["2", "3", "4"];
      }
    }
  },
  created() {
    if (this.searchStr.includes("Appartement")) {
      this.roomsItems = ["2", "3", "4"];
    }
  }
};
</script>
<style scoped>
.v-btn {
  text-transform: none;
}
</style>
