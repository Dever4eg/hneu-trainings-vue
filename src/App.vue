<template>
  <v-app>
    <v-app-bar app clipped-left dark color="grey darken-4">
      <v-app-bar-nav-icon
        v-if="isAuthorized"
        @click.stop="openSidebar = !openSidebar"
      ></v-app-bar-nav-icon>

      <v-app-bar-nav-icon>
        <v-icon>mdi-car-sports</v-icon>
      </v-app-bar-nav-icon>

      <v-app-bar-title>Веселка | Запчастини</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn type="button" text @click="logout">Вийти</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-if="isAuthorized" v-model="openSidebar" app clipped>
      <v-list dense nav class="py-0">
        <v-list dense>
          <v-list-item
            v-for="({ path, icon, label }, index) in sidebarItems"
            :key="index"
            :to="path"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-layout fill-height class="px-10 py-5 grey lighten-5">
        <router-view></router-view>
      </v-layout>
    </v-main>

    <v-footer padless app>
      <v-card tile width="100%" class="grey darken-4 text-right text-uppercase">
        <v-card-text class="white--text">
          <strong> &copy; Веселка </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import {getAuthHeader} from "./helpers/auth";

export default {
  name: "App",
  components: {},
  data: () => ({
    openSidebar: true,
    sidebarItems: [
      {
        icon: "mdi-account-multiple-outline",
        label: "Постачальники",
        path: "/suppliers"
      },
      {
        icon: "mdi-car",
        label: "Запчастини",
        path: "/products"
      },
      {
        icon: "mdi-cash-multiple",
        label: "Поставки",
        path: "/invoices"
      }
    ]
  }),
  computed: {
    ...mapGetters(["authToken"]),
    isAuthorized() {
      return !!this.authToken;
    }
  },
  methods: {
    logout() {
      // eslint-disable-next-line no-undef
      axios
        .delete("/log_out", {
          headers: { ...getAuthHeader() }
        })
        .then(() => {
          this.$store.commit("logout");
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
