<template>
  <div>
    <v-container style="margin-top: 100px">
      <v-card shaped color="#FAFAFA" elevation="10">
        <v-card-title>Houses Found</v-card-title>
        <v-row style="margin-left: 30px">
          <card
            v-for="(house, index) in houses"
            :key="index"
            :house="house"
            style="margin-right:40px; margin-bottom:30px "
          ></card>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Card from "../components/card";
import axios from "axios";
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
  created() {
    axios.get("/houses-list/?" + this.searchStr).then(res => {
      console.log(res);
      this.houses = res.data;
    });
  }
};
</script>

<style></style>
