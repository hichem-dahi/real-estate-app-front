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
            <v-col>
              <v-container>
                <v-row>
                  <v-col
                    ><div class="display-1">{{ title }}</div>
                  </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-row class="ma-0">
                  <v-col class="ma-0" cols="6">
                    <p class="text--secondary">City: {{ city }}</p>
                  </v-col>
                  <v-col class="ma-0" cols="6">
                    <p class="text--secondary">Rooms: {{ house.rooms }}</p>
                  </v-col>
                </v-row>
                <v-row class="ma-0">
                  <v-col
                    ><p class="text--secondary">Type: {{ type }}</p></v-col
                  >
                  <v-col class="ma-0"
                    ><p class="text--secondary">
                      Price: {{ house.price }}DA / mois
                    </p></v-col
                  >
                </v-row>
                <v-row
                  ><v-spacer></v-spacer> <v-spacer></v-spacer>
                  <v-btn color="alert" icon
                    ><v-icon>mdi-heart</v-icon></v-btn
                  ></v-row
                >
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
