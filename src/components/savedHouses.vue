<template>
  <v-sheet min-height="560">
    <v-list three-line>
      <v-subheader>Enregistré</v-subheader>
      <v-list-item-group active-class="pink--text" multiple>
        <template v-for="(savedHouse, index) in savedHouses">
          <v-list-item
            :to="{ name: 'House', params: { id: savedHouse.id } }"
            :key="savedHouse.id"
          >
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
                    {{ savedHouse.type }}, {{ savedHouse.city }} &mdash;
                  </div>
                  <div>{{ savedHouse.rooms }} chambres</div>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
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
