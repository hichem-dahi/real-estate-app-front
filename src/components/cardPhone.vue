<template>
  <v-card elevation="1">
    <v-carousel height="300" hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :to="{ name: 'House', params: { id: id } }"
        src="https://nipponpaint.co.in/wp-content/uploads/2019/03/10-new-interior-colour-combinations-that-you-should-try-in-2019-for-your-home-walls-1024x640.jpg"
      >
      </v-carousel-item>
    </v-carousel>
    <v-card-title class="py-1 ml-1">
      <div class="caption text--secondary">
        <v-icon small>{{ homeMdi }}</v-icon>
        • {{ type }} a {{ city }}
      </div></v-card-title
    >
    <v-divider class="mx-7 mb-0 pb-0"></v-divider>
    <v-card-text class="text--primary pt-1">
      <div class="text--primary mt-1">
        <v-icon small>mdi-map-marker</v-icon> {{ address }}
      </div>
      <div class="caption text--secondary ml-3">
        • {{ house.rooms }} chambres
      </div>
      <div class="mt-3">
        <v-chip>
          <div class="font-weight-bold">{{ house.price }}</div>
          <div class="caption mb-2">DA/mois</div>
          <v-icon right small>mdi-tag</v-icon>
        </v-chip>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn text color="green">see map</v-btn>

      <v-spacer></v-spacer>
      <v-btn icon @click="addHouse">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ this.house.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    house: Object
  },
  data: () => ({
    show: false,
    items: []
  }),
  computed: {
    id() {
      return this.house.id;
    },
    title() {
      return (
        this.house.title.charAt(0).toUpperCase() +
        this.house.title.substr(1).toLowerCase()
      );
    },
    type() {
      return this.house.type.toLowerCase();
    },
    city() {
      return this.house.city.toLowerCase();
    },
    address() {
      return (
        this.house.address.charAt(0).toUpperCase() +
        this.house.address.substr(1).toLowerCase()
      );
    },
    homeMdi() {
      if (this.house.type == "Appartement") return "mdi-home-modern";
      else if (this.house.type == "Villa") return "mdi-home";
      else return "";
    }
  },
  methods: {
    addHouse() {
      this.$store.commit("saveHouse", this.id);
    }
  },
  created() {
    this.items.push(this.house.image1);
    this.items.push(this.house.image2);
    this.items.push(this.house.image3);
    this.items.push(this.house.image4);
    this.items.push(this.house.image5);
  }
};
</script>

<style></style>
