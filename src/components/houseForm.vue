<template>
  <v-card max-width="500">
    <v-card-text>
      <validation-provider
        v-slot="{ errors }"
        name="Title"
        rules="required|alpha_spaces"
      >
        <v-text-field
          v-model="title"
          class="inputs"
          label="Title"
          type="text"
        />
        <span> {{ errors[0] }}</span>
      </validation-provider>
      <validation-provider>
        <v-select :items="types" v-model="type" label="Type"></v-select>
      </validation-provider>
      <validation-provider>
        <v-select :items="cities" v-model="city" label="Cities"></v-select>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="Address"
        :rules="{ required: true, regex: /^(?![\s.]+$)[a-zA-Z0-9,°\s.]*$/ }"
      >
        <v-text-field
          v-model="address"
          class="inputs"
          label="Address"
          type="text"
        />
        <span> {{ errors[0] }}</span>
      </validation-provider>
      <validation-provider>
        <v-select :items="roomsItems" v-model="rooms" label="Rooms"></v-select>
      </validation-provider>
      <validation-provider>
        <v-select :items="bedsItems" v-model="beds" label="Beds"></v-select>
      </validation-provider>
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
        />
        <span> {{ errors[0] }}</span>
      </validation-provider>
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
        />
        <span> {{ errors[0] }}</span>
      </validation-provider>
      <v-file-input
        v-model="files"
        color="deep-purple accent-4"
        counter
        label="File input"
        multiple
        placeholder="Select your files"
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
    cities: ["Sidi bel abbes", "Oran", "Alger", "Setif", "Annaba"],
    city: "",
    roomsItems: ["1", "2", "3", "4", "5", "6", "7", "8"],
    rooms: null,
    bedsItems: ["1", "2", "3", "4", "5"],
    beds: null,
    address: "",
    price: null,
    description: null,
    files: []
  }),
  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },
  methods: {
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
