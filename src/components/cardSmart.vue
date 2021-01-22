<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card height="250" shaped :elevation="hover ? 12 : 2">
        <v-container fluid class="pa-0">
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-0" cols="5">
              <v-carousel height="250" hide-delimiters>
                <v-carousel-item
                  :to="{ name: 'House', params: { id: id } }"
                  src="https://nipponpaint.co.in/wp-content/uploads/2019/03/10-new-interior-colour-combinations-that-you-should-try-in-2019-for-your-home-walls-1024x640.jpg"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col class="pb-0">
              <v-container>
                <v-row>
                  <v-col class="py-0 my-0">
                    <div @click="goPage" class="title font-weight-medium my-1">
                      <v-icon class="mb-1 mr-1">mdi-home-modern</v-icon
                      >{{ type }} in {{ city }}
                    </div>

                    <v-divider></v-divider>

                    <p class="text--secondary mt-3 ml-3">
                      • {{ house.rooms }} Rooms
                    </p>

                    <p class="font-weight-normal">
                      <v-icon small class="mb-1 mr-1">mdi-map-marker</v-icon
                      >{{ address }}
                    </p></v-col
                  >
                </v-row>
                <!-- heart icon, price -->
                <v-row>
                  <v-col> <v-spacer></v-spacer> </v-col>
                </v-row>

                <v-row>
                  <v-col align="start">
                    <v-chip large>
                      <div class="font-weight-bold">{{ house.price }}</div>
                      <div class="caption mb-2">DA/mois</div>
                      <v-icon small right> mdi-tag</v-icon>
                    </v-chip>
                  </v-col>
                  <v-col align="end">
                    <v-btn color="alert" icon @click="addHouse">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-col>
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
