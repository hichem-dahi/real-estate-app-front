<template>
  <v-sheet>
    <v-card max-width="450" class="mx-auto">
      <v-list three-line>
        <v-subheader>Enregistré</v-subheader>

        <template v-for="(savedHouse, index) in savedHouses">
          <v-list-item :key="index">
            <v-list-item-avatar>
              <v-img
                src="https://cf.bstatic.com/images/hotel/max1024x768/208/208480857.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ savedHouse.price }}DZD/mois
              </v-list-item-title>
              <v-list-item-subtitle>
                <div class="d-flex">
                  <div class="text--primary">
                    {{ savedHouse.type }}, {{ savedHouse.city }}
                  </div>
                  <div>&mdash; {{ savedHouse.rooms }} chambres</div>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset :key="index"></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  props: {
    savedHouses: Array
  }
};
</script>

<style></style>
