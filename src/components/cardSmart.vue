<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
        :elevation="hover ? 12 : 2"
        shaped
        class="ma-0"
        width="800"
        height="260"
      >
        <v-container class="pa-0">
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-0" cols="5">
              <v-carousel height="260" hide-delimiters>
                <v-carousel-item
                  :to="{ name: 'House', params: { id: id } }"
                  src="https://nipponpaint.co.in/wp-content/uploads/2019/03/10-new-interior-colour-combinations-that-you-should-try-in-2019-for-your-home-walls-1024x640.jpg"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col class="d-flex flex-column">
              <v-chip class="align-self-end" color="green" text-color="white">
                Available
              </v-chip>
              <div @click="goPage" class="display-1 my-1">{{ title }}</div>

              <v-divider></v-divider>

              <div class="d-flex mt-4">
                <p class="text--secondary mr-10">City: {{ city }}</p>
                <p class="text--secondary">Rooms: {{ house.rooms }}</p>
              </div>
              <div class="d-flex">
                <p class="text--secondary mr-10">Type: {{ type }}</p>
                <p class="text--secondary">Price: {{ house.price }}DA / mois</p>
              </div>
              <v-container>
                <v-row>
                  <v-col cols="10">
                    <v-chip class="d-inline-flex" color="primary" outlined>
                      <v-icon left>
                        mdi-wifi
                      </v-icon>
                      Wifi
                    </v-chip>
                  </v-col>
                  <v-col cols="2">
                    <v-btn color="alert" icon @click="addHouse">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn></v-col
                  >
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-hover>
  </div>
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
    },
    goPage() {
      this.$router.push("/house/" + this.id);
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
