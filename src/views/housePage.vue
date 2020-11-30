<template>
  <div>
    <v-container style="margin: 60px">
      <v-row>
        <v-col>
          <v-card width="700">
            <v-card-text class="display-2">
              {{ house.title }}
            </v-card-text>
            <v-divider></v-divider>
            <v-container fluid>
              <v-row dense>
                <v-col
                  v-for="(card, index) in cards"
                  :key="index"
                  :cols="card.flex"
                >
                  <v-card>
                    <v-img
                      src="https://miro.medium.com/max/700/1*epdC1KmNNV8cSSOLNiCo3A.jpeg"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                    >
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <div class="pa-4">
              <v-chip-group active-class="primary--text" column>
                <v-chip
                  outlined
                  v-for="tag in tags"
                  :key="tag"
                  :color="tag.color"
                >
                  <v-icon left>{{ tag.icon }}</v-icon>
                  {{ tag.name }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card style="margin-top: 50px">
            <div class="ml-4 text--secondary">
              <div class="mb-1">
                <v-icon>mdi-home-modern</v-icon>{{ house.type }} in
                {{ house.city }}
              </div>

              <v-divider></v-divider>
              <p class="mt-3">
                • {{ house.beds }} Beds • {{ house.rooms }} Rooms
              </p>

              <p><v-icon>mdi-map-marker</v-icon> {{ house.address }}</p>
              <p>
                <v-icon>mdi-currency-usd</v-icon> {{ house.price }} DA /night
              </p>
              <p><v-icon>mdi-overscan</v-icon> 120 m²</p>

              <v-divider></v-divider>
              <!-- 
              <v-list-group prepend-icon="mdi-account">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Owner</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-phone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="user.phone"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-gmail</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="user.email"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              -->
            </div>
            <!-- Tags-->

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="addHouse">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-sheet class="d-flex flex-column align-center mt-10" elevation="2">
            <v-avatar size="128">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
            <div class="d-flex">
              <v-icon>mdi-gmail</v-icon>
              <v-text-field
                dense
                class="ml-3"
                style="width: 200px"
                :value="user.email"
                readonly
              >
              </v-text-field>
            </div>
            <div class="d-flex">
              <v-icon>mdi-facebook</v-icon>
              <v-text-field
                dense
                class="ml-3"
                style="width: 200px"
                value="facebook.com/hichem.talos.7"
                readonly
              >
              </v-text-field>
            </div>
            <div class="d-flex">
              <v-icon>mdi-phone</v-icon>
              <v-text-field
                dense
                class="ml-3"
                style="width: 200px"
                :value="user.phone"
                readonly
              >
              </v-text-field>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card width="500">
            <v-card-title>Description</v-card-title>
            <v-card-text v-text="house.description"> </v-card-text>
          </v-card>
        </v-col>
        <v-col> </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data: () => ({
    Finished: true,
    show: true,
    markers: [],
    dates: [],
    pickedDates: [],
    multiple: true,
    cards: [
      {
        src: "https://kerya.herokuapp.com",
        flex: 8
      },
      {
        src: "https://kerya.herokuapp.com",
        flex: 4
      },
      {
        src: "https://kerya.herokuapp.com",
        flex: 4
      },
      {
        src: "https://kerya.herokuapp.com",
        flex: 4
      },
      {
        src: "https://kerya.herokuapp.com",
        flex: 4
      }
    ],
    house: {
      address: null,
      beds: null,
      city: null,
      id: null,
      price: null,
      rooms: null,
      title: null,
      type: null,
      user: null,
      description: null,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null
    },
    userId: 0,
    user: {
      email: null,
      first_name: null,
      id: null,
      last_name: null,
      phone: null,
      username: null
    },
    tags: [
      { name: "meublé", color: "brown lighten-1", icon: "mdi-domain-plus" },
      { name: "wifi", color: "blue lighten-1", icon: "mdi-wifi" },
      { name: "4ém etage", color: "blue-grey", icon: "mdi-home-floor-3" }
    ]
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    client() {
      return this.$store.state.userId;
    }
  },
  methods: {
    addHouse() {
      this.$store.commit("saveHouse", this.id);
    },
    sendDates() {
      const dates = {
        user: this.client,
        house: this.$route.params.id,
        dates: this.dates
      };
      console.log(dates);
      Axios.post("/dates/", dates).then(res => {
        console.log(res);
      });
    },
    allowedDates(val) {
      let date;
      if (this.pickedDates.lastIndexOf(val) >= 0) {
        date = false;
      } else {
        //mknch
        date = true;
      }
      return date;
    }
  },

  created() {
    let id = this.$route.params.id;
    Axios.get("/house-details/" + id).then(res => {
      console.log(res);
      this.house = res.data;
      this.userId = res.data.user;
      this.cards[0].src = this.cards[0].src + res.data.image1;
      this.cards[1].src = this.cards[1].src + res.data.image2;
      this.cards[2].src = this.cards[2].src + res.data.image3;
      this.cards[3].src = this.cards[3].src + res.data.image4;
      this.cards[4].src = this.cards[4].src + res.data.image5;
    });
  },
  watch: {
    userId(val) {
      if (val > 0) {
        Axios.get("/users/users/" + this.userId).then(res => {
          console.log(res);
          this.user = res.data;
        });
      }
    }
  }
};
</script>
