<template>
  <v-card>
    <v-container style="margin-top: 100px">
      <filters-card></filters-card>
      <v-card-title>Houses Found</v-card-title>
      <v-row class="mb-6">
        <card
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
          class="mb-6"
        ></card>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
//import Card from "../components/card";
import filtersCard from "../components/filters";
import axios from "axios";
import Card from "../components/cardSmart";
export default {
  components: {
    //"app-bar": appBar,
    card: Card,
    "filters-card": filtersCard
  },
  data: () => ({
    houses: []
  }),
  computed: {
    searchStr() {
      return this.$store.state.search;
    }
  },
  watch: {
    searchStr() {
      axios.get("/houses-list/?" + this.searchStr).then(res => {
        console.log(res);
        this.houses = res.data;
      });
    }
  },
  created() {
    axios.get("/houses-list/?" + this.searchStr).then(res => {
      console.log(res);
      this.houses = res.data;
    });
  }
};
</script>

<style></style>
