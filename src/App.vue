<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link @click="goHome">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group prepend-icon="mdi-heart">
          <template v-slot:activator>
            <v-list-item-title>Saved</v-list-item-title>
          </template>
          <v-list two-line>
            <v-list-item-group
              v-model="selected"
              multiple
              active-class="pink--text"
            >
              <v-list-item
                v-for="(savedHouse, index) in savedHouses"
                :key="index"
              >
                <template>
                  <router-link
                    style="text-decoration: none;"
                    :to="{ name: 'House', params: { id: savedHouse.id } }"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="savedHouse.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="savedHouse.address"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="savedHouse.subtitle"
                      ></v-list-item-subtitle> </v-list-item-content
                  ></router-link>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>

      <v-subheader inset class="mt-4">SEARCH</v-subheader>
      <v-divider></v-divider>
      <house-form></house-form>
    </v-navigation-drawer>

    <v-app-bar class="mb-6" height="80" app clipped-left color="#F5F5F5">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-toolbar-title class="mt-5 align-center">
              <span class="display-2">Kri'now</span>
            </v-toolbar-title>
          </v-col>
          <v-col cols="6" class="mt-10">
            <v-btn x-large text>Home</v-btn>
            <v-dialog max-width="350" v-model="dialog1">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-large
                  text
                  v-if="!authenticated"
                  v-bind="attrs"
                  v-on="on"
                >
                  Sign in
                </v-btn>
              </template>
              <sign-in @dialog-false="dialog1 = false"></sign-in>
            </v-dialog>

            <v-dialog max-width="350" v-model="dialog2">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="!authenticated"
                  style="margin-left: 10px"
                  v-bind="attrs"
                  v-on="on"
                  text
                  x-large
                >
                  Sign up
                </v-btn>
              </template>

              <sign-up @dialog-false="dialog2 = false"></sign-up>
            </v-dialog>
            <router-link :to="{ name: 'admin-panel' }">
              <v-btn v-if="authenticated" color="white">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="mt-6" fluid>
        <v-row class="mt-6">
          <v-spacer></v-spacer>
          <v-col cols="6">
            <v-card shaped>
              <div class="mt-5">
                <search-bar @expand="expand = true"></search-bar>
              </div>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import signIn from "./components/signIn";
import signUp from "./components/signup";
import houseForm from "./components/form";
import Axios from "axios";
import searchBar from "./components/searchBar";
export default {
  components: {
    "sign-in": signIn,
    "sign-up": signUp,
    "house-form": houseForm,
    "search-bar": searchBar
  },
  props: {
    source: String
  },
  data: () => ({
    expand: false,
    logo: require("@/assets/logo.jpg"),
    images1: [
      {
        flex: 12,
        src: require("@/assets/villa.jpg")
      },
      {
        flex: 6,
        src: require("@/assets/dar.jpeg")
      }
    ],
    images2: [
      { flex: 12, src: require("@/assets/house3.jpeg") },
      { flex: 12, src: require("@/assets/bed.jpg") }
    ],
    menu: false,
    included: false,
    dialog1: false,
    dialog2: false,
    drawer: false,
    selected: [2],
    savedHouses: []
  }),
  computed: {
    savingIds() {
      return this.$store.state.savedHousesId;
    },

    authenticated() {
      return this.$store.state.idToken;
    }
  },
  methods: {
    goHome() {
      if (this.$route.path != "/") this.$router.push("/");
    }
  },
  watch: {
    savingIds() {
      Axios.get("/house-details/" + this.savingIds).then(res => {
        console.log(res);
        this.savedHouses.push(res.data);
      });
    }
  }
};
</script>
<style>
.slide-fade-enter {
  transform: translateX(15px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1s ease;
}
.slide-fade-leave {
  transform: translateX(-15px);
  opacity: 0;
}
</style>
