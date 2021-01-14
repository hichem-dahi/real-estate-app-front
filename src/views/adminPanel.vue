<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title> admin panel </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title v-model="tab">
          <v-tab>Account</v-tab>
          <v-tab>Properties</v-tab>
          <v-tab>Add Property</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="750"
    >
      <v-container style="height: 1000px;">
        <v-tabs-items v-model="tab" style="margin-top:220px;">
          <v-tab-item> <acc-info></acc-info> </v-tab-item>
          <v-tab-item>
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
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-spacer></v-spacer>
                <v-col> <house-form></house-form> </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </v-tab-item> </v-tabs-items
      ></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import cardAdmin from "../components/cardAdmin";
import accInfo from "../components/accInfo";
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
    "acc-info": accInfo,
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
