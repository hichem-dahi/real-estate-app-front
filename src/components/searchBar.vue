<template>
  <v-sheet class="rounded-pill" elevation="2" color="white" height="52">
    <div class="d-flex flex-row">
      <v-autocomplete
        height="50"
        label="Type"
        hide-details
        small-chips
        filled
        dense
        rounded
        multiple
        :items="types"
        v-model="type"
      ></v-autocomplete>
      <v-autocomplete
        height="50"
        label="Wilaya"
        deletable-chips
        small-chips
        hide-details
        dense
        filled
        rounded
        :items="wilNames"
        v-model="wilaya"
      ></v-autocomplete>
      <v-autocomplete
        height="50"
        label="Daira"
        small-chips
        hide-details
        dense
        filled
        rounded
        :disabled="!dairas.length"
        multiple
        :items="dairas"
        v-model="daira"
      ></v-autocomplete>
      <v-btn fab icon color="blue" @click="searchState">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import algeriaCities from "../assets/algeria-cities.json";
export default {
  data: () => ({
    types: ["House", "Appartement", "Villa", "Studio", "Chambre colocation"],
    type: [],
    wilObj: algeriaCities.wilayas,
    wilNames: [],
    wilaya: "",
    dairas: [],
    daira: [],
    multiComm: false
  }),
  created() {
    for (let i = 0; i < this.wilObj.length; i++) {
      this.wilNames.push(i + 1 + " - " + this.wilObj[i].name);
    }
  },
  methods: {
    searchState() {
      var searchArr = [];
      for (let i = 0; i < this.type.length; i++) {
        searchArr.push("type=" + this.type[i]);
      }
      this.$store.dispatch("search", searchArr);
      let url = this.$route.path;
      if (url != "/list") this.$router.push("/list");
    },
    onClickOutside() {
      this.expand = false;
    }
  },

  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  watch: {
    wilaya(val) {
      //  dirha ki ykhayar mdina
      if (val == null) {
        this.dairas = [];
        this.daira = "";
      } else {
        // eslint-disable-next-line no-unused-vars
        const indexFun = element => element == this.wilaya;
        var indexWil = this.wilNames.findIndex(indexFun);
        console.log(indexWil);
        var dairas = this.wilObj[indexWil].dairas;
        this.dairas = [];
        for (let index = 0; index < dairas.length; index++) {
          this.dairas.push("-" + dairas[index].name);
        }
      }
    }
  }
};
</script>

<style></style>
