<template>
  <v-sheet>
    <v-container>
      <v-row>
        <v-col><p class="display-1 text--secondary">Houses created</p></v-col>
        <v-col>
          <v-sheet style="overflow-x: auto;">
            <v-row>
              <v-col class="d-inline-flex">
                <card-admin
                  class="mr-5"
                  v-for="(house, i) in houses"
                  :key="i"
                  :house="house"
                >
                </card-admin>
              </v-col>
            </v-row>
          </v-sheet>
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
import axios from "axios";
import cardAdmin from "../components/cards/cardAdmin";
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
