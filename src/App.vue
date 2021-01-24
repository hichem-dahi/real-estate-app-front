<template>
  <v-app id="inspire">
    <!--66636F-->
    <v-app-bar color="#ECEFF1" height="80" app fixed>
      <v-container>
        <v-row>
          <!-- Logo -->
          <v-col v-if="!$vuetify.breakpoint.xs" class="pr-0" cols="1">
            <v-img class="mt-5" width="70" height="50" :src="logo"></v-img>
          </v-col>

          <!-- Title -->
          <v-col @click="goHome" class="pl-0 mt-5" cols="2">
            <span class="display-1 brown--text text--lighten-2">Immo</span>
            <span class="display-1 blue--text text--lighten-2 mx-auto"
              >Bit</span
            >
          </v-col>
          <!-- save,sign in/up section -->
          <v-col align="end" cols="9">
            <!-- 
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
            -->
            <v-menu v-if="!authenticated" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mt-6" icon large v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-dialog max-width="350" v-model="dialog1">
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-title v-bind="attrs" v-on="on">
                        Sign up
                      </v-list-item-title>
                    </template>
                    <sign-up @dialog-false="dialog1 = false"></sign-up>
                  </v-dialog>
                </v-list-item>

                <v-list-item>
                  <v-dialog max-width="350" v-model="dialog2">
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-title v-bind="attrs" v-on="on">
                        Sign in
                      </v-list-item-title>
                    </template>
                    <v-card>
                      <sign-in></sign-in>
                    </v-card>
                  </v-dialog>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu v-if="authenticated" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mt-6" icon large v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <router-link
                    style="text-decoration: none; color: inherit;"
                    :to="{ name: 'admin-panel' }"
                  >
                    <v-list-item-title>
                      <v-btn small outlined color="primary">Admin</v-btn>
                    </v-list-item-title>
                  </router-link>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-dialog max-width="450" v-model="dialog3">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          small
                          v-bind="attrs"
                          v-on="on"
                          dark
                          outlined
                          color="brown"
                          >Add house
                        </v-btn>
                      </template>
                      <house-form></house-form>
                    </v-dialog>
                  </v-list-item-title>
                </v-list-item>
                <v-divider class="mx-3"></v-divider>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn small text @click="logout">logout</v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-content>
      <v-container fluid v-if="homePage" class="pa-0">
        <v-row class="mt-12">
          <v-col class="mx-auto" :cols="$vuetify.breakpoint.xs ? 11 : 6">
            <transition name="slide-fade" mode="out-in">
              <search-bar v-intersect="onIntersect"></search-bar>
            </transition>
          </v-col>
        </v-row>
      </v-container>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-bottom-navigation fixed v-model="value" color="indigo">
      <v-btn>
        <span>Recherche</span>

        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn>
        <span>Enregistré</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import signIn from "./components/signIn";
import signUp from "./components/signup";
import Axios from "axios";
import searchBar from "./components/searchBar";
//import appSearch from "./components/appSearch";
import houseForm from "./components/houseForm";
export default {
  components: {
    "sign-in": signIn,
    "sign-up": signUp,
    "search-bar": searchBar,
    //"app-search": appSearch,
    "house-form": houseForm
  },
  props: {
    source: String
  },
  data: () => ({
    logo: require("@/assets/logo.jpg"),
    items: [{ title: "Sign in" }, { title: "Sign up" }],
    menu: false,
    included: false,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    drawer: false,
    selected: [2],
    savedHouses: [],
    isIntersecting: false
  }),
  computed: {
    savingIds() {
      return this.$store.state.savedHousesId;
    },

    authenticated() {
      return this.$store.getters.getToken;
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
    // eslint-disable-next-line no-unused-vars
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting;
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  watch: {
    savingIds() {
      Axios.get("/house-details/" + this.savingIds).then(res => {
        console.log(res);
        this.savedHouses.push(res.data);
      });
    }
  },
  created() {
    this.$store.dispatch("refreshLogin");
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
.v-btn {
  text-transform: none;
}
</style>
