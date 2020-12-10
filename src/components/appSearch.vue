<template>
  <v-sheet
    v-click-outside="onClickOutside"
    id="search"
    width="51"
    color="white"
    height="49"
    class="rounded-pill"
  >
    <div class="d-flex flex-row">
      <validation-provider>
        <v-autocomplete
          dense
          v-show="expand"
          class="fields"
          label="Type"
          filled
          rounded
          multiple
          :items="types"
          v-model="type"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip small v-if="index === 0">
              <span>{{ item }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text caption">
              (+{{ type.length - 1 }} others)
            </span>
          </template>
        </v-autocomplete>
      </validation-provider>
      <validation-provider>
        <v-autocomplete
          dense
          v-show="expand"
          class="fields"
          label="City, street"
          small-chips
          filled
          rounded
          :loading="loading"
          :disabled="loading"
          :multiple="multiStreet"
          :items="multiStreet ? streets : cities"
          v-model="city"
        ></v-autocomplete>
      </validation-provider>

      <v-btn
        fab
        icon
        color="blue"
        @click="
          expand = !expand;
          searchState();
        "
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import gsap from "gsap";
export default {
  props: {
    appBar: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    types: ["House", "Appartement", "Villa", "Studio", "Chambre colocation"],
    cities: ["Sidi bel abbes", "Oran", "Alger"],
    streets: ["Oran", "Sidi bel abbes", "Alger", "Zeralda", "Hydra"],
    city: "",
    type: [],
    multiStreet: false,
    expand: false
  }),
  methods: {
    searchState() {
      var searchArr = [];
      for (let i = 0; i < this.type.length; i++) {
        searchArr.push("type=" + this.type[i]);
      }
      if (searchArr.length != 0) {
        this.$store.dispatch("search", searchArr);
        let url = this.$route.path;
        if (url != "/list") this.$router.push("/list");
      }
    },
    onClickOutside() {
      this.expand = false;
    }
  },

  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  watch: {
    city(val) {
      if (!Array.isArray(val)) {
        this.multiStreet = true;
        this.city = [val];
      }
      if (val.length == 0) {
        this.multiStreet = false;
        this.city = "";
      }
    },
    expand(val) {
      if (val == true) {
        gsap.to("#search", {
          duration: 0.3,
          ease: "expo",
          width: "100%"
        });
        gsap.fromTo(
          ".fields",
          {
            duration: 0.3,
            ease: "expo",
            width: 0
          },
          {
            duration: 0.3,
            ease: "expo",
            width: "100%"
          }
        );
      } else {
        gsap.to("#search", {
          duration: 0.3,
          ease: "expo",
          width: 49
        });
        gsap.fromTo(
          ".fields",
          {
            duration: 0.3,
            ease: "expo",
            width: "100%"
          },
          {
            duration: 0.3,
            ease: "expo",
            width: 0
          }
        );
      }
    }
  }
};
</script>

<style></style>
