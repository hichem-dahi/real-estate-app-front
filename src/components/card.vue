<template>
  <v-card width="300" elevation="15">
    <v-carousel height="300" hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item">
        <v-container fill-height fluid pa-0 ma-0 pb-0>
          <v-layout class="white--text" fill-height align-end>
            <v-flex xs12>
              <router-link
                style="text-decoration: none;
                color: white"
                :to="{ name: 'House', params: { id: id } }"
              >
                <v-card-title color="white">{{ title }}</v-card-title>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-carousel-item>
    </v-carousel>

    <v-divider></v-divider>

    <v-card-subtitle>
      <div>
        • {{ type }}, {{ city }}.<br />
        {{ address }}.
      </div>
    </v-card-subtitle>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text color="blue">Check Dates</v-btn>

      <v-spacer></v-spacer>
      <v-btn icon color="#E57373" @click="addHouse">
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
      return (
        this.house.type.charAt(0).toUpperCase() +
        this.house.type.substr(1).toLowerCase()
      );
    },
    city() {
      return (
        this.house.city.charAt(0).toUpperCase() +
        this.house.city.substr(1).toLowerCase()
      );
    },
    address() {
      return (
        this.house.address.charAt(0).toUpperCase() +
        this.house.address.substr(1).toLowerCase()
      );
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
