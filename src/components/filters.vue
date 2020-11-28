<template>
  <v-card class="d-flex" shaped>
    <v-container>
      <v-row>
        <v-col align="center" cols="2">
          <v-card-title>Filters</v-card-title>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="2">
          Rooms
          <div class="d-flex flex-row">
            <v-select class="mr-3" :items="items" label="min" dense></v-select>
            <v-select :items="items" label="max" dense></v-select>
          </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="2"
          >Price
          <div class="d-flex flex-row">
            <v-text-field
              type="number"
              class="mr-3"
              label="min"
              dense
            ></v-text-field>
            <v-text-field type="number" label="max" dense></v-text-field>
          </div>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
