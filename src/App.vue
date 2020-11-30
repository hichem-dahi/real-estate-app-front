<template>
  <v-app id="inspire">
    <!--66636F-->
    <v-app-bar height="80" app fixed clipped-left color="#66636F">
      <v-container fluid>
        <v-row>
          <!-- Logo -->
          <v-col cols="1">
            <v-img class="mt-5" width="70" height="50" :src="logo"></v-img>
          </v-col>

          <!-- Title -->
          <v-col cols="3">
            <v-toolbar-title class="mt-5">
              <span class="display-2 brown--text text--lighten-3">Immo</span>
              <span class="display-2 red--text text--lighten-2">Keria</span>
            </v-toolbar-title>
          </v-col>

          <!-- searchButton -->
          <v-col align="center" class="mt-5" cols="5">
            <transition name="slide-fade" mode="in-out">
              <v-btn
                v-if="isIntersecting"
                elevation="0"
                @click="expand = !expand"
                large
                color="#7A7686"
                rounded
                class="white--text"
                >Search<v-icon>mdi-magnify</v-icon>
              </v-btn>
            </transition>
            <transition name="slide-fade" mode="in-out">
              <search-bar v-if="expand"></search-bar>
            </transition>
          </v-col>
          <!-- save,sign in/up section -->
          <v-col cols="2">
            <v-btn class="mt-6" color="white" large icon>
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
            <!-- 
            <v-dialog max-width="350" v-model="dialog1">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-large
                  text
                  v-if="!authenticated"
                  v-bind="attrs"
                  v-on="on"
                  color="white"
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
                  color="white"
                >
                  Sign up
                </v-btn>
              </template>

              <sign-up @dialog-false="dialog2 = false"></sign-up>
            </v-dialog>
            -->
            <router-link class="ml-5" :to="{ name: 'admin-panel' }">
              <v-btn
                color="white"
                small
                icon
                fab
                elevation="2"
                absolute
                v-if="authenticated"
              >
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container v-if="homePage" fluid class="pa-0" style="margin-top:60px">
        <v-parallax height="700" :src="parallax">
          <v-row style="height: 50px;">
            <v-col class="mt-12" align="center">
              <div class="display-1 brown--text text--lighten-3">
                Welcome to
              </div>
              <div>
                <span class="display-3 brown--text text--lighten-4">Immo</span>
                <span class="display-3 red--text text--lighten-3">Keria</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-col align="center" cols="6">
              <search-bar></search-bar>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-col>
              <div class="d-inline-flex flex-column">
                <div class="display-2">
                  Find houses near your
                </div>
                <div class="align-self-center display-2 font-weight-bold">
                  Location.
                </div>
                <v-btn class="align-self-end" large color="primary">Find</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-parallax>
      </v-container>
      <transition name="slide-fade" mode="out-in">
        <router-view v-intersect="onIntersect"></router-view>
      </transition>
    </v-main>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
//import signIn from "./components/signIn";
//import signUp from "./components/signup";
import Axios from "axios";
import searchBar from "./components/searchBar";
import gsap from "gsap";
export default {
  components: {
    //"sign-in": signIn,
    //"sign-up": signUp,
    "search-bar": searchBar
  },
  props: {
    source: String
  },
  data: () => ({
    parallax: require("@/assets/parallax2.jpg"),
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
    savedHouses: [],
    duration: 300,
    offset: 0,
    easing: "easeInOutCubic",
    offsetTop: 0,
    isIntersecting: false,
    barHeight: 80
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
    },
    expand(val) {
      if (val == true) {
        gsap.to(".v-app-bar", {
          duration: 0.5,
          ease: "power1",
          height: 110
        });
      } else {
        gsap.to(".v-app-bar", {
          duration: 0.5,
          ease: "power1",
          height: 80
        });
      }
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
  transition: all 0.5s ease;
}
.slide-fade-leave {
  transform: translateX(-15px);
  opacity: 0;
}
</style>
