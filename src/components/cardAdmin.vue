<template>
  <v-card max-width="350">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="300px"
      width="350px"
    >
      <v-card-title>{{ house.title }}</v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-dialog scrollable max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn tile text color="#4E342E" v-on="on">
            <v-icon>mdi-pencil</v-icon>Edit dates</v-btn
          >
        </template>
        <v-card>
          <v-row>
            <v-col cols="12" sm="6">
              <v-date-picker
                :allowed-dates="allowedDates"
                readonly
              ></v-date-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <v-container
                ><v-row v-for="(namesDate, index) in namesDates" :key="index">
                  <v-text-field
                    :value="namesDate.dates"
                    :label="namesDate.user"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field></v-row
              ></v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <v-dialog scrollable max-width="400px">
        <template v-slot:activator="{ on }">
          <v-btn tile text color="#4E342E" v-on="on">
            <v-icon>mdi-pencil</v-icon>Edit</v-btn
          >
        </template>
        <house-form></house-form>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>
<script>
import houseForm from "../components/houseForm";
import Axios from "axios";
export default {
  data: () => ({
    namesDates: [],
    pickedDates: [],
    dates: []
  }),
  props: {
    house: Object
  },
  components: { "house-form": houseForm },
  methods: {
    allowedDates(val) {
      let date;
      if (this.dates.lastIndexOf(val) >= 0) {
        date = false; //mataffichihch psk kayen
      } else {
        //affichih
        date = true;
      }

      return date;
    }
  },

  created() {
    Axios.get("/dates-house/" + this.house.id).then(res => {
      console.log(res);
      for (let index = 0; index < res.data.length; index++) {
        let datesUser = {
          user: res.data[index].user,
          dates: res.data[index].dates
        };
        console.log(datesUser);
        this.pickedDates.push(datesUser);
        this.dates = this.dates.concat(res.data[index].dates);
      }
    });
  },
  watch: {
    pickedDates() {
      for (let i = 0; i < this.pickedDates.length; i++) {
        //inferieur value
        var inf = this.pickedDates[i].dates[0];
        for (let index = 0; index < this.pickedDates[i].dates.length; index++) {
          if (
            inf.split("-")[1] > this.pickedDates[i].dates[index].split("-")[1]
          ) {
            inf = this.pickedDates[i].dates[index];
            //when it surpasses the other's month
          }
          if (
            inf.split("-")[1] == this.pickedDates[i].dates[index].split("-")[1]
          ) {
            if (
              parseInt(inf.split("-")[2]) >
              parseInt(this.pickedDates[i].dates[index].split("-")[2])
            ) {
              inf = this.pickedDates[i].dates[index];
            }
            //when months ==, days >
          }
        }
        console.log(inf);

        //superieure value
        var sup = this.pickedDates[i].dates[0];
        for (let index = 0; index < this.pickedDates[i].dates.length; index++) {
          if (
            sup.split("-")[1] < this.pickedDates[i].dates[index].split("-")[1]
          ) {
            sup = this.pickedDates[i].dates[index];
            //when it surpasses the other's month
          }
          if (
            sup.split("-")[1] == this.pickedDates[i].dates[index].split("-")[1]
          ) {
            if (
              parseInt(sup.split("-")[2]) <
              parseInt(this.pickedDates[i].dates[index].split("-")[2])
            ) {
              sup = this.pickedDates[i].dates[index];
            }
            //when months ==, days >
          }
        }
        console.log(sup);

        let dates = [inf, sup];
        Axios.get("/users/users/" + this.pickedDates[i].user).then(res => {
          console.log(res);
          var user = res.data.first_name + " " + res.data.last_name;
          const namedDates = {
            user: user,
            dates: dates
          };
          this.namesDates.push(namedDates);
        });
      }
    }
  }
};
</script>
<style>
.px-0 {
  padding: 0px;
}
</style>
