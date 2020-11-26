<template>
  <div>
    <v-container style="margin-top: 100px">
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
  </div>
</template>

<script>
//import Card from "../components/card";
import axios from "axios";
import Card from "../components/cardSmart";
export default {
  components: {
    //"app-bar": appBar,
    card: Card
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
  mounted() {
    const el = document.querySelector(this.$route.hash);
    el && el.scrollIntoView();
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
