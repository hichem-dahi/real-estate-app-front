<template>
  <v-card elevation="1" class="px-0 mx-0">
    <v-card-text>
      <v-container class="px-0 mx-0">
        <v-row no-gutters class="mx-0 px-0">
          <v-col class="mx-0 px-0" :cols="$vuetify.breakpoint.xs ? 12 : 6">
            <v-container class="pa-0 ma-0">
              <v-row no-gutters class="mx-0 px-0">
                <v-col class="my-0 py-0" cols="12">
                  <validation-provider class="ma-0 pa-0">
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

              <v-row no-gutters class="mx-0 px-0">
                <v-col class="my-0 py-0">
                  <validation-provider class="ma-0 pa-0">
                    <v-select
                      :items="roomsItems"
                      v-model="rooms"
                      label="Chambres"
                      prepend-icon="mdi-bed"
                    >
                    </v-select>
                  </validation-provider>
                </v-col>
                <v-col class="my-0 py-0">
                  <validation-provider class="ma-0 pa-0">
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
                <v-col class="my-0 py-0">
                  <validation-provider class="ma-0 pa-0">
                    <v-select
                      dense
                      :items="wilayaItems"
                      v-model="wilaya"
                      label="Wilaya"
                      prepend-icon="mdi-map-marker"
                    ></v-select>
                  </validation-provider>
                </v-col>
                <v-col class="my-0 py-0">
                  <validation-provider name="daira">
                    <v-select
                      dense
                      :items="dairaItems"
                      v-model="daira"
                      label="Daira"
                      prepend-icon="mdi-map-marker"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="my-0 py-0">
                  <validation-provider v-slot="{ errors }" name="address">
                    <v-text-field
                      v-model="address"
                      class="inputs"
                      label="address"
                      type="text"
                      prepend-icon="mdi-map-marker-plus"
                    />
                    <span> {{ errors[0] }}</span>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="6" class="my-0 py-0 pr-0">
                  <validation-provider
                    v-slot="{ errors }"
                    name="price"
                    rules="required|numeric"
                  >
                    <v-text-field
                      v-model="price"
                      class="inputs"
                      label="price"
                      type="text"
                      prepend-icon="mdi-currency-usd"
                      @input="formatPrice"
                    />
                    <span> {{ errors[0] }}</span>
                  </validation-provider>
                </v-col>
                <v-col cols="5" class="my-0 py-0 pl-0"
                  ><v-select :items="paytypeItems" v-model="paytype"></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col>
            <validation-provider
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
              @change="onFile"
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
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn class="btn" @click="submit" raised color="#CFD8DC">Submit</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    multiple: true,
    title: "",
    types: ["Appartement", "Villa"],
    type: "",
    wilayaItems: ["Sidi bel abbes", "Oran", "Alger", "Setif", "Annaba"],
    wilaya: "",
    roomsItems: ["1", "2", "3", "4", "5", "6", "7", "8"],
    rooms: null,
    pieceItems: ["Cuisine", "Douche"],
    piece: null,
    dairaItems: ["hajot", "campo"],
    daira: "",
    address: null,
    price: null,
    paytype: null,
    paytypeItems: ["DZD/jour", "DZD/mois"],
    description: null,
    files: []
  }),
  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },
  methods: {
    formatPrice() {
      this.price = this.price.replace(/\s+/g, "");
      this.price = new Number(this.price).toLocaleString("fr-Fr");
    },
    submit() {
      const houseForm = new FormData();
      houseForm.append("title", this.title);
      houseForm.append("type", this.type);
      houseForm.append("city", this.city);
      houseForm.append("rooms", this.rooms);
      houseForm.append("beds", this.beds);
      houseForm.append("address", this.address);
      houseForm.append("user", this.userId);
      houseForm.append("price", this.price);
      houseForm.append("description", this.description);
      houseForm.append("image1", this.files[0], this.files[0].name);
      houseForm.append("image2", this.files[1], this.files[1].name);
      houseForm.append("image3", this.files[2], this.files[2].name);
      houseForm.append("image4", this.files[3], this.files[3].name);
      houseForm.append("image5", this.files[4], this.files[4].name);
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
  }
};
</script>
