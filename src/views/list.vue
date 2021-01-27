<template>
  <v-container ref="card" :class="$vuetify.breakpoint.xs ? 'pa-0 ma-0' : ''">
    <v-row>
      <v-col cols="12">
        <filters-card></filters-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-title>
      +{{ houses.length - 1 }} annonces trouvées in Sidi bel abbes, Sidi bel
      abbes
    </v-card-title>
    <v-row>
      <v-col v-if="!$vuetify.breakpoint.xs" cols="7" align="start">
        <card
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
          class="mb-6"
        ></card>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.xs">
        <card-phone
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
          style="margin-bottom: 70px"
        ></card-phone>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import filtersCard from "../components/filters";
import axios from "axios";
import Card from "../components/cardSmart";
import cardPhone from "../components/cardPhone";
export default {
  components: {
    card: Card,
    "filters-card": filtersCard,
    "card-phone": cardPhone
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
      this.$vuetify.goTo(this.target, this.options);
      this.$store.commit("loadEnd");
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
