<template>
  <validation-observer v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <v-card elevation="1">
        <v-card-text class="pa-0 ma-0">
          <v-container class="px-0">
            <v-row no-gutters>
              <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <validation-provider>
                        <v-select
                          :items="types"
                          v-model="type"
                          label="Type"
                          prepend-icon="mdi-home-city"
                        >
                        </v-select>
                      </validation-provider>
                    </v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col>
                      <validation-provider>
                        <v-select
                          :items="roomsItems"
                          v-model="rooms"
                          label="Chambres"
                          prepend-icon="mdi-bed"
                        >
                        </v-select>
                      </validation-provider>
                    </v-col>
                    <v-col class="ml-2">
                      <validation-provider>
                        <v-select
                          :items="pieceItems"
                          v-model="piece"
                          multiple
                          small-chips
                          label="Autres piéces"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
                      <validation-provider>
                        <v-select
                          :items="wilNames"
                          v-model="wilaya"
                          label="Wilaya"
                          prepend-icon="mdi-map-marker"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <v-col>
                      <validation-provider name="daira">
                        <v-select
                          :items="dairaItems"
                          v-model="daira"
                          :disabled="!dairaItems.length"
                          label="Daira"
                          prepend-icon="mdi-map-marker-plus"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <validation-provider v-slot="{ errors }" name="address">
                        <v-text-field
                          v-model="address"
                          class="inputs"
                          label="address"
                          type="text"
                          hint="Par exemple: Cité 400 logments, Sidi Djillali"
                          prepend-icon="mdi-map-marker-multiple"
                        />
                        <span> {{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="$vuetify.breakpoint.xs ? 4 : 3">
                      <validation-provider
                        v-slot="{ errors }"
                        name="price"
                        :rules="{
                          required: true,
                          regex: /[0-9]+/
                        }"
                      >
                        <v-text-field
                          v-model="price"
                          class="inputs"
                          label="prix"
                          prepend-icon="mdi-currency-usd"
                          @input="formatPr"
                        />
                        <span> {{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                    <v-col :cols="$vuetify.breakpoint.xs ? 4 : 3">
                      <v-select
                        :items="paytypeItems"
                        v-model="paytype"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col class="pa-2 ml-5">
                <validation-provider
                  class="ml-5"
                  v-slot="{ errors }"
                  name="Description"
                  :rules="{
                    required: true,
                    regex: /^(?![\s.]+$)[a-zA-Z0-9àÀéèâ',/°\s.]*$/
                  }"
                >
                  <v-textarea
                    outlined
                    v-model="description"
                    class="inputs"
                    label="Description"
                    type="text"
                    height="50"
                  />
                  <span> {{ errors[0] }}</span>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="files"
                  :rules="{
                    required: true,
                    min: 5
                  }"
                >
                  <v-file-input
                    v-model="files"
                    accept="image/png, image/jpeg, image/bmp"
                    color="deep-purple accent-4"
                    counter
                    label="Images"
                    multiple
                    placeholder="Select your images"
                    prepend-icon="mdi-camera"
                    outlined
                    :show-size="1000"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip
                        v-if="index < 2"
                        color="deep-purple accent-4"
                        dark
                        label
                        small
                      >
                        {{ text }}
                      </v-chip>

                      <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                      >
                        +{{ files.length - 2 }} File(s)
                      </span>
                    </template>
                  </v-file-input>
                  <span> {{ errors[0] }}</span>
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-row
          ><v-spacer></v-spacer>
          <v-col cols="2">
            <v-card-actions>
              <v-btn
                class="btn"
                @click="submit"
                :disabled="invalid"
                raised
                color="#CFD8DC"
                >Submit</v-btn
              >
            </v-card-actions></v-col
          ></v-row
        >
      </v-card>
    </form>
  </validation-observer>
</template>

<script>
import axios from "axios";
import formatPrice from "../assets/formatPrice";
import algeriaCities from "../assets/algeria-cities.json";

export default {
  data: () => ({
    multiple: true,
    title: "",
    types: ["Appartement", "Villa"],
    type: "",
    roomsItems: ["1", "2", "3", "4", "5", "6", "7", "8"],
    rooms: null,
    pieceItems: ["Cuisine", "Salle de bain"],
    piece: [],
    wilObj: algeriaCities.wilayas,
    wilNames: [],
    wilaya: "",
    dairaItems: [],
    daira: "",
    address: null,
    price: "",
    paytype: "DZD/mois",
    paytypeItems: ["DZD/jour", "DZD/mois"],
    description: null,
    files: []
  }),
  created() {
    for (let i = 0; i < this.wilObj.length; i++) {
      this.wilNames.push(i + 1 + " - " + this.wilObj[i].name);
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getUid;
    }
  },
  methods: {
    formatPr() {
      this.price = formatPrice(this.price);
    },
    submit() {
      const houseForm = new FormData();
      houseForm.append("type", this.type);
      houseForm.append("city", this.wilaya.slice(4));
      houseForm.append("daira", this.daira);
      houseForm.append("rooms", this.rooms);
      houseForm.append("kitchen", this.piece.includes("Cuisine"));
      houseForm.append("bathroom", this.piece.includes("Salle de bain"));
      houseForm.append("beds", this.beds);
      houseForm.append("address", this.address);
      houseForm.append("user", this.userId);
      houseForm.append("price", this.price.replace(/\s+/g, ""));
      houseForm.append("description", this.description);
      houseForm.append("image1", this.files[0]);
      houseForm.append("image2", this.files[1]);
      houseForm.append("image3", this.files[2]);
      houseForm.append("image4", this.files[3]);
      houseForm.append("image5", this.files[4]);

      for (var pair of houseForm.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      axios
        .post("/house-create/", houseForm)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },
    onFile(event) {
      console.log(event);
    }
  },
  watch: {
    wilaya(val) {
      //  dirha ki ykhayar mdina
      if (val == null) {
        this.dairaItems = [];
        this.daira = "";
      } else {
        // eslint-disable-next-line no-unused-vars
        const indexFun = element => element == this.wilaya;
        var indexWil = this.wilNames.findIndex(indexFun);
        console.log(indexWil);
        var dairaItems = this.wilObj[indexWil].dairas;
        this.dairaItems = [];
        for (let index = 0; index < dairaItems.length; index++) {
          this.dairaItems.push(dairaItems[index].name);
        }
      }
    }
  }
};
</script>
