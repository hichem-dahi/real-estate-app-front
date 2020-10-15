<template>
  <div>
    <v-card class="d-inline-block mx-auto" style="margin-top: 150px">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card class="mx-auto" max-width="700">
              <v-container fluid>
                <v-row dense>
                  <v-col
                    v-for="(card, index) in cards"
                    :key="index"
                    :cols="card.flex"
                  >
                    <v-card>
                      <v-img
                        :src="card.src"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                      >
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-text>
                <div>
                  <v-icon>mdi-home-modern</v-icon>{{ house.type }} in
                  {{ house.city }}
                </div>

                <p class="display-1 text--primary">
                  {{ house.title }}
                </p>
                <v-divider></v-divider>
                <p>• {{ house.beds }} Beds • {{ house.rooms }} Rooms</p>

                <p><v-icon>mdi-map-marker</v-icon> {{ house.address }}</p>
                <p>
                  <v-icon>mdi-currency-usd</v-icon> {{ house.price }} DA /night
                </p>
                <v-divider></v-divider>
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
                      <v-list-item-title
                        v-text="user.phone"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item dense>
                    <v-list-item-icon>
                      <v-icon>mdi-gmail</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="user.email"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="addHouse">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card width="500">
              <v-card-title>Description</v-card-title>
              <v-card-text v-text="house.description"> </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card outlined width="300">
              <v-text-field
                v-model="dateRangeText"
                label="Date range"
                prepend-icon="mdi-calendar"
                readonly
              ></v-text-field>
              <v-card-title>Pick dates</v-card-title>
              <v-date-picker
                :allowed-dates="allowedDates"
                v-model="dates"
                multiple="multiple"
              ></v-date-picker>
              <v-card-actions>
                <v-btn outlined text color="#4E342E" @click="sendDates">
                  <v-icon>mdi-pencil</v-icon>Submit dates</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-container>
      <v-spacer></v-spacer>
      <GmapMap
        :center="{ lat: 10, lng: 10 }"
        :zoom="7"
        map-type-id="terrain"
        style="width: 600px; height: 300px"
      >
        <GmapMarker
          :key="index2"
          v-for="(m, index2) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GmapMap>
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
        src: "http://127.0.0.1:8000",
        flex: 8
      },
      {
        src: "http://127.0.0.1:8000",
        flex: 4
      },
      {
        src: "http://127.0.0.1:8000",
        flex: 4
      },
      {
        src: "http://127.0.0.1:8000",
        flex: 4
      },
      {
        src: "http://127.0.0.1:8000",
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
    }
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
    Axios.get("/dates-house/" + id).then(res => {
      console.log(res);
      for (let index = 0; index < res.data.length; index++) {
        this.pickedDates = this.pickedDates.concat(res.data[index].dates);
      }
    });
  },
  watch: {
    userId(val) {
      if (val > 0) {
        Axios.get("/users/" + this.userId).then(res => {
          console.log(res);
          this.user = res.data;
        });
      }
    }
  }
};
</script>

<style></style>
