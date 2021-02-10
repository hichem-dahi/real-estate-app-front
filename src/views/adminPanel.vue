<template>
  <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="750">
    <v-container>
      <v-row>
        <v-col
          v-for="(house, index) in houses"
          :key="index"
          style="flex-grow: 0; margin-right: 5px"
        >
          <card-admin :house="house"> </card-admin>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="$vuetify.breakpoint.xs ? 12 : 10">
          <house-form></house-form>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import cardAdmin from "../components/cardAdmin";
//import accInfo from "../components/accInfo";
import axios from "axios";
import houseForm from "../components/houseForm";
export default {
  data() {
    return {
      tab: null,
      houses: []
    };
  },
  components: {
    "card-admin": cardAdmin,
    //"acc-info": accInfo,
    "house-form": houseForm
  },
  computed: {
    userId() {
      return this.$store.getters.getUid;
    }
  },
  created() {
    axios.get("/houses-list/" + this.userId).then(res => {
      console.log(res.data);
      this.houses = res.data;
    });
  }
};
</script>

<style></style>
