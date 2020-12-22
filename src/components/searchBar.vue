<template>
  <v-sheet style="border-radius: 25px;" elevation="2" color="white">
    <div class="d-flex mb-1">
      <v-autocomplete
        full-width
        height="50"
        label="Type"
        hide-details
        filled
        dense
        rounded
        small-chips
        multiple
        :items="types"
        v-model="type"
      >
        <template v-slot:selection="{ item, index }">
          <v-chip x-small v-if="index === 0">
            <span>{{ item }}</span>
          </v-chip>
          <span v-if="index === 1" class="grey--text caption">
            (+{{ type.length - 1 }} others)
          </span>
        </template></v-autocomplete
      >
      <v-autocomplete
        full-width
        height="50"
        label="Wilaya"
        hide-details
        filled
        dense
        rounded
        :items="wilNames"
        v-model="wilaya"
      >
      </v-autocomplete>
    </div>
    <div class="d-flex mt-1">
      <v-divider></v-divider>

      <v-spacer></v-spacer>
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
      <v-spacer></v-spacer>

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
    },
    fontSize() {
      if (this.$vuetify.breakpoint.xs) {
        return "12px";
      } else {
        return "14px";
      }
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
