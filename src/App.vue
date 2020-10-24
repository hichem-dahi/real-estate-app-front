<template>
  <v-app id="inspire">
    <v-navigation-drawer color="#ECEFF0" v-model="drawer" app clipped>
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

    <v-app-bar app clipped-left color="#F5F5F5">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon large>mdi-home</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Kerya</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-row align="center" style="max-width: 650px">
        <v-dialog max-width="350" v-model="dialog1">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="!authenticated"
              color="#BBDEFB"
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
              color="#BBDEFB"
              style="margin-left: 10px"
              v-bind="attrs"
              v-on="on"
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
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </template>

          <v-card max-width="450" class="mx-auto">
            <v-list three-line>
              <template v-for="(item, index) in items">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  v-text="item.header"
                ></v-subheader>

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>

                <v-list-item v-else :key="item.title">
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="item.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-menu>
      </v-row>
    </v-app-bar>

    <v-main style="margin-left: 250px">
      <v-container> <router-view></router-view></v-container>
      <v-container v-if="this.$route.path == '/'" class="mt-6" fluid>
        <v-row>
          <v-col>
            <v-card class="font-weight-light" height="500" max-width="500">
              <v-container>
                <v-row>
                  <v-col align="center">
                    <div class="display-1">House renting</div>
                    <div class="display-3">made easy</div>
                    <div>Search Houses</div>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-card max-width="600">
            <v-container fluid>
              <v-row dense>
                <v-col
                  v-for="(image, index) in images1"
                  :key="index"
                  class="pa-0"
                  :cols="image.flex"
                >
                  <v-img :src="image.src" height="300"> </v-img>
                </v-col>
                <v-col cols="6" class="pa-0 ma-0">
                  <v-container fluid class="pa-0 ma-0">
                    <v-row class="pa-0 ma-0">
                      <v-col
                        v-for="(image, index) in images2"
                        :key="index"
                        :cols="image.flex"
                        class="pa-0 ma-0"
                      >
                        <v-img :src="image.src" height="150"> </v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-row>
      </v-container>
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
export default {
  components: {
    "sign-in": signIn,
    "sign-up": signUp,
    "house-form": houseForm
  },
  props: {
    source: String
  },
  data: () => ({
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
    drawer: null,
    selected: [2],
    savedHouses: [],
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
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
