<template>
  <v-container>
    <v-row>
      <!-- Rooms -->
      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 5">
        <v-btn color="#455A64" rounded outlined>Rooms</v-btn>

        <!-- Price -->
        <v-menu
          v-model="menu1"
          nudge-width="50"
          :close-on-content-click="false"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-3"
              color="#455A64"
              rounded
              outlined
              v-bind="attrs"
              v-on="on"
              >Price</v-btn
            >
          </template>
          <v-list subheader>
            <v-subheader style="height: 30px" class="py-0 my-0"
              >mil /mois</v-subheader
            >
            <v-list-item>
              <v-list-item-content class="pt-1 pb-0"
                ><v-list-item-action class="mb-0">
                  <v-range-slider
                    v-model="price"
                    :min="minPr"
                    :max="maxPr"
                    thumb-label="always"
                    :thumb-size="14"
                  ></v-range-slider></v-list-item-action
              ></v-list-item-content> </v-list-item
          ></v-list>
        </v-menu>

        <!-- Prepayment -->
        <v-menu
          v-model="menu2"
          :nudge-width="30"
          :close-on-content-click="false"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-3"
              color="#455A64"
              rounded
              outlined
              v-bind="attrs"
              v-on="on"
              >Prepayment</v-btn
            >
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
      <v-divider></v-divider>
      <!-- Tags -->
      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
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
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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
.v-btn {
  text-transform: none;
}
</style>
