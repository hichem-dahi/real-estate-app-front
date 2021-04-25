<template>
  <v-container :class="isPhone ? 'px-0' : ''">
    <!-- Photos section row -->
    <v-row no-gutters>
      <div class="display-1 text--secondary mb-1">
        <v-icon large>mdi-home-modern</v-icon>{{ house.type }} in
        {{ house.city }}
      </div>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col v-for="(card, index) in cards" :key="index" :cols="card.flex">
            <v-img
              src="https://miro.medium.com/max/700/1*epdC1KmNNV8cSSOLNiCo3A.jpeg"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="280px"
            >
            </v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- house info row -->
    <v-row class="mx-0">
      <v-col :cols="isPhone ? 12 : 5">
        <v-chip color="green darken-4" outlined>
          <div class="d-flex">
            <div class="title">{{ price }}</div>
            <div class="title">DZD/</div>
            <div class="mt-2">mois</div>
            <v-icon right>mdi-tag</v-icon>
          </div>
        </v-chip>
        <div class="ml-4 text--secondary">
          <p class="mt-3">• {{ house.beds }} Beds • {{ house.rooms }} Rooms</p>

          <p class="font-weight-normal">
            <v-icon>mdi-map-marker</v-icon> {{ house.address }}
          </p>

          <p class="pb-0 mb-0"><v-icon>mdi-overscan</v-icon> 120 m²</p>
          <!-- Tags-->
          <div class="pl-4">
            <v-chip-group active-class="primary--text" column>
              <v-chip
                outlined
                v-for="tag in tags"
                :key="tag.name"
                :color="tag.color"
              >
                <v-icon left>{{ tag.icon }}</v-icon>
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
      </v-col>
      <v-divider :vertical="!isPhone"></v-divider>
      <!-- Description section -->
      <v-col>
        <v-card elevation="1">
          <v-card-title>Description</v-card-title>
          <v-card-text v-text="house.description"> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mx-0">
      <v-col>
        <v-sheet
          class="d-flex flex-column align-center mx-auto mt-5 mb-12"
          width="300"
          elevation="1"
        >
          <v-avatar class="mb-5" size="128">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <div class="d-flex mb-2">
            <v-icon class="mr-2">mdi-phone</v-icon>

            <a :href="'tel:${user.phone}'">{{ user.phone }}</a>
          </div>

          <div class="d-flex mb-2">
            <v-icon class="mr-2">mdi-facebook-messenger</v-icon>
            <a href="https://m.me/hichem.talos.7/">Use messenger</a>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Axios from "axios";
import formatPrice from "../assets/formatPrice";
export default {
  data: () => ({
    Finished: true,
    show: true,
    markers: [],
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
    },
    isPhone() {
      return this.$vuetify.breakpoint.xs;
    },
    price() {
      return formatPrice(this.house.price);
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
