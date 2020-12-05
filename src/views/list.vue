<template>
  <v-card ref="card" color="#E9E8EB">
    <v-container>
      <filters-card></filters-card>
      <v-card-title>Houses Found</v-card-title>
      <v-row class="mb-6">
        <v-col cols="8" align="center">
          <card
            v-for="(house, index) in houses"
            :key="index"
            :house="house"
            class="mb-6"
          ></card>
        </v-col>
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
    houses: [],
    duration: 300,
    offset: 0,
    easing: "easeInOutCubic"
  }),
  computed: {
    searchStr() {
      return this.$store.getters.searchComp;
    },
    target() {
      return this.$refs.card;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      };
    }
  },
  watch: {
    searchStr() {
      axios.get("/houses-list/?" + this.searchStr).then(res => {
        console.log(res);
        this.houses = res.data;
      });
    },
    houses() {
      this.$store.commit("loadEnd");
      this.$vuetify.goTo(this.target, this.options);
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
