<template>
  <v-app id="inspire">
    <!--66636F-->
    <v-app-bar height="80" app fixed clipped-left>
      <v-container>
        <v-row>
          <!-- Logo -->
          <v-col class="pr-0" cols="1">
            <v-img class="mt-5" width="70" height="50" :src="logo"></v-img>
          </v-col>

          <!-- Title -->
          <v-col class="pl-0" cols="2">
            <v-toolbar-title class="mt-5">
              <span class="display-1 brown--text text--lighten-2">Immo</span>
              <span class="display-1 blue--text text--lighten-2">Bit</span>
            </v-toolbar-title>
          </v-col>

          <!-- searchAppBar -->
          <v-col align="start" class="mt-5" cols="6">
            <transition appear name="slide-fade" mode="out-in">
              <app-search
                class="search-app"
                v-if="!isIntersecting"
              ></app-search>
            </transition>
          </v-col>
          <!-- save,sign in/up section -->
          <v-col cols="3">
            <v-btn class="mt-6" large icon>
              <v-icon>mdi-heart</v-icon>
              <v-badge
                v-if="savedHouses.length"
                dot
                bottom
                color="red"
                :content="savedHouses.length"
              >
              </v-badge
            ></v-btn>

            <v-dialog max-width="350" v-model="dialog1">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mt-5"
                  text
                  v-if="!authenticated"
                  v-bind="attrs"
                  v-on="on"
                  elevation="1"
                >
                  Sign in
                </v-btn>
              </template>
              <sign-in @dialog-false="dialog1 = false"></sign-in>
            </v-dialog>

            <v-dialog max-width="350" v-model="dialog2">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mt-5"
                  v-if="!authenticated"
                  style="margin-left: 10px"
                  v-bind="attrs"
                  v-on="on"
                  text
                  elevation="1"
                >
                  Sign up
                </v-btn>
              </template>

              <sign-up @dialog-false="dialog2 = false"></sign-up>
            </v-dialog>

            <router-link :to="{ name: 'admin-panel' }">
              <v-btn class="mt-6" icon large v-if="authenticated">
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-content>
      <v-container fluid v-if="homePage" class="pa-0">
        <v-row>
          <v-col class="mt-12" align="center">
            <div class="display-1 brown--text text--lighten-3">
              Welcome to
            </div>
            <div>
              <span class="display-3 brown--text text--lighten-3">Immo</span>
              <span class="display-3 blue--text text--lighten-3">Bit</span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col align="center" cols="5">
            <transition name="slide-fade" mode="out-in">
              <search-bar v-intersect="onIntersect"></search-bar>
            </transition>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col style="margin-top:100px" align="end">
            <div class="d-inline-flex flex-column mr-12">
              <div class="display-1 text--secondary">
                Find houses near your
              </div>
              <div class="align-self-center display-1 text--secondary">
                Location.
              </div>
              <v-btn class="align-self-end" color="primary">Find</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import signIn from "./components/signIn";
import signUp from "./components/signup";
import Axios from "axios";
import searchBar from "./components/searchBar";
import appSearch from "./components/appSearch";
//import gsap from "gsap";
export default {
  components: {
    "sign-in": signIn,
    "sign-up": signUp,
    "search-bar": searchBar,
    "app-search": appSearch
  },
  props: {
    source: String
  },
  data: () => ({
    parallax: require("@/assets/parallax2.jpg"),
    showBtn: true,
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
    savedHouses: [],
    duration: 300,
    offset: 0,
    easing: "easeInOutCubic",
    offsetTop: 0,
    isIntersecting: false
  }),
  computed: {
    savingIds() {
      return this.$store.state.savedHousesId;
    },

    authenticated() {
      return this.$store.state.idToken;
    },
    homePage() {
      if (this.$route.path == "/list" || this.$route.path == "/") {
        return true;
      } else return false;
    }
  },
  methods: {
    goHome() {
      if (this.$route.path != "/") this.$router.push("/");
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    // eslint-disable-next-line no-unused-vars
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting;
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
  transition: all 0.2s ease-out;
}
.slide-fade-leave-to {
  transform: translateX(-15px);
  opacity: 0;
}
</style>
